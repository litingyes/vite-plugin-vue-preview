<script setup lang="ts">
import Message from '../Message.vue'
import {
  ref,
  onMounted,
  onUnmounted,
  watchEffect,
  watch,
  WatchStopHandle,
  inject,
  Ref,
  nextTick,
  computed
} from 'vue'
import srcdoc from './srcdoc.html?raw'
import { PreviewProxy } from './PreviewProxy'
import { compileModulesForPreview } from './moduleCompiler'
import type { Store } from '../store'
import consola from 'consola'
import type { ComputedRef } from 'vue'

const props = defineProps<{ show: boolean; ssr: boolean }>()

const store = inject('store') as Store
const clearConsole = inject('clear-console') as Ref<boolean>
const bgColor = inject('outputBgColor') as string
const appStyle = inject<ComputedRef<object>>('appStyle')
const container = ref()
const runtimeError = ref()
const runtimeWarning = ref()

let sandbox: HTMLIFrameElement
let proxy: PreviewProxy
let stopUpdateWatcher: WatchStopHandle | undefined

const appStyleStr = computed(() => {
  if (!appStyle) return ''
  let str = ''
  for (const [key, val] of Object.entries(appStyle.value)) {
    str += `${key}:${val};`
  }
  return str
})

// create sandbox on mount
onMounted(createSandbox)

// reset sandbox when import map changes
watch(
  () => store.state.files['import-map.json']?.code,
  (raw) => {
    try {
      const map = JSON.parse(raw ?? '')
      if (!map.imports) {
        store.state.errors = [`import-map.json is missing "imports" field.`]
        return
      }
      createSandbox()
    } catch (e: any) {
      store.state.errors = [e as Error]
      return
    }
  }
)

// reset sandbox when version changes
watch(() => store.state.resetFlip, createSandbox)

onUnmounted(() => {
  proxy.destroy()
  stopUpdateWatcher && stopUpdateWatcher()
})

function createSandbox() {
  if (sandbox) {
    // clear prev sandbox
    proxy.destroy()
    stopUpdateWatcher && stopUpdateWatcher()
    container.value.removeChild(sandbox)
  }

  sandbox = document.createElement('iframe')
  sandbox.setAttribute('height', '0')
  sandbox.setAttribute(
    'sandbox',
    [
      'allow-forms',
      'allow-modals',
      'allow-pointer-lock',
      'allow-popups',
      'allow-same-origin',
      'allow-scripts',
      'allow-top-navigation-by-user-activation'
    ].join(' ')
  )

  const importMap = store.getImportMap()
  if (!importMap.imports) {
    importMap.imports = {}
  }
  if (!importMap.imports.vue) {
    importMap.imports.vue = store.state.vueRuntimeURL
  }
  const sandboxSrc = srcdoc.replace(
    /<!--IMPORT_MAP-->/,
    JSON.stringify(importMap)
  )
  sandbox.srcdoc = sandboxSrc
  container.value.appendChild(sandbox)

  proxy = new PreviewProxy(sandbox, {
    // on_fetch_progress: (progress: any) => {
    //   // pending_imports = progress;
    // },
    on_error: (event: any) => {
      const msg =
        event.value instanceof Error ? event.value.message : event.value
      if (
        msg.includes('Failed to resolve module specifier') ||
        msg.includes('Error resolving module specifier')
      ) {
        runtimeError.value =
          msg.replace(/\. Relative references must.*$/, '') +
          `.\nTip: edit the "Import Map" tab to specify import paths for dependencies.`
      } else {
        consola.error(event)
      }
    },
    on_unhandled_rejection: (event: any) => {
      let error = event.value
      if (typeof error === 'string') {
        error = { message: error }
      }
      runtimeError.value = 'Uncaught (in promise): ' + error.message
    },
    on_console: (log: any) => {
      if (log.duplicate) {
        return
      }
      if (log.level === 'error') {
        if (log.args[0] instanceof Error) {
          runtimeError.value = log.args[0].message
        } else {
          runtimeError.value = log.args[0]
        }
      } else if (log.level === 'warn') {
        if (log.args[0].toString().includes('[Vue warn]')) {
          runtimeWarning.value = log.args
            .join('')
            .replace(/\[Vue warn\]:/, '')
            .trim()
        }
      }
    },
    // on_console_group: (action: any) => {
    //   // group_logs(action.label, false);
    // },
    // on_console_group_end: () => {
    //   // ungroup_logs();
    // },
    // on_console_group_collapsed: (action: any) => {
    //   // group_logs(action.label, true);
    // }
  })

  sandbox.addEventListener('load', () => {
    proxy.handle_links()
    stopUpdateWatcher = watchEffect(updatePreview)
  })
}

async function updatePreview() {
  if (import.meta.env.PROD && clearConsole.value) {
    console.clear()
  }
  runtimeError.value = null
  runtimeWarning.value = null

  let isSSR = props.ssr
  if (store.vueVersion) {
    const [_, minor, patch] = store.vueVersion.split('.')
    if (parseInt(minor!, 10) < 2 || parseInt(patch!, 10) < 27) {
      alert(
        `The selected version of Vue (${store.vueVersion}) does not support in-browser SSR.` +
        ` Rendering in client mode instead.`
      )
      isSSR = false
    }
  }

  try {
    const mainFile = store.state.mainFile

    // if SSR, generate the SSR bundle and eval it to render the HTML
    if (isSSR && mainFile.endsWith('.vue')) {
      const ssrModules = compileModulesForPreview(store, true)
      console.log(
        `successfully compiled ${ssrModules.length} modules for SSR.`
      )
      await proxy.eval([
        `const __modules__ = {};`,
        ...ssrModules,
        `import { renderToString as _renderToString } from 'vue/server-renderer'
         import { createSSRApp as _createApp } from 'vue'
         const AppComponent = __modules__["${mainFile}"].default
         AppComponent.name = 'Repl'
         const app = _createApp(AppComponent)
         app.config.unwrapInjectedRef = true
         app.config.warnHandler = () => {}
         window.__ssr_promise__ = _renderToString(app).then(html => {
           document.body.innerHTML = '<div id="app">' + html + '</div>'
         }).catch(err => {
           console.error("SSR Error", err)
         })
        `
      ])
    }

    // compile code to simulated module system
    const modules = compileModulesForPreview(store)
    console.log(
      `successfully compiled ${modules.length} module${modules.length > 1 ? `s` : ``
      }.`
    )

    const codeToEval = [
      `window.__modules__ = {}\nwindow.__css__ = ''\n` +
      `if (window.__app__) window.__app__.unmount()\n` +
      (isSSR ? `` : `document.body.innerHTML = '<div id="app"></div>'`),
      ...modules,
      `document.getElementById('__reset-styles').innerHTML =' body {background: ${bgColor}} #app { ${appStyleStr.value} }'`,
      `document.getElementById('__sfc-styles').innerHTML = window.__css__`
    ]

    // if main file is a vue file, mount it.
    if (mainFile.endsWith('.vue')) {
      codeToEval.push(
        `import { ${isSSR ? `createSSRApp` : `createApp`
        } as _createApp } from "vue"
        const _mount = () => {
          const AppComponent = __modules__["${mainFile}"].default
          AppComponent.name = 'Repl'
          const app = window.__app__ = _createApp(AppComponent)
          app.config.unwrapInjectedRef = true
          app.config.errorHandler = e => console.error(e)
          app.mount('#app')
        }
        if (window.__ssr_promise__) {
          window.__ssr_promise__.then(_mount)
        } else {
          _mount()
        }`
      )
    }

    // eval code in sandbox
    await proxy.eval(codeToEval)
  } catch (e: any) {
    runtimeError.value = (e as Error).message
  }

  const iframe = container.value.querySelector('iframe')
  const height = iframe.contentDocument.querySelector('html').offsetHeight
  iframe.height = height + 'px'
  nextTick(() => {
    container.value.style.maxHeight = height + 'px'
  })
}
</script>

<template>
  <div class="iframe-container" v-show="show" ref="container"></div>
  <Message :err="runtimeError" />
  <Message v-if="!runtimeError" :warn="runtimeWarning" />
</template>

<style lang="scss" scoped>
.iframe-container {
  box-sizing: content-box;
  padding: 8px;
  overflow: hidden;
  max-height: 0;
  transition: max-height 0.3s;

  :deep(iframe) {
    width: 100%;
    border: none;
  }
}
</style>
