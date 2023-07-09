<script setup lang="ts">
import '@liting-yes/vue-repl/style.css'
import type { PreviewUpdateFlag, Store } from '@liting-yes/vue-repl'
import { ExtendEditorContainer, Preview, ReplStore, defaultMainFile, importMapFile } from '@liting-yes/vue-repl'
import { computed, onMounted, provide, ref } from 'vue'
import { useClipboard, useElementHover, useMutationObserver } from '@vueuse/core'
import Copy from './icons/Copy.vue'
import Copied from './icons/Copied.vue'
import UnfoldLess from './icons/UnfoldLess.vue'
import UnfoldMore from './icons/UnfoldMore.vue'
import Loading from './icons/Loading.vue'

export interface Props {
  store?: Store
  autoResize?: boolean
  clearConsole?: boolean
  ssr?: boolean
  code?: string
  encode?: boolean
  collapse?: boolean
  previewBodyStyle?: Partial<CSSStyleDeclaration> | string
  previewAppStyle?: Partial<CSSStyleDeclaration> | string
  previewOptions?: {
    headHTML?: string
    bodyHTML?: string
    customCode?: {
      importCode?: string
      useCode?: string
    }
  }
  importMap?: Record<string, string> | string
  theme?: 'dark' | 'light'
  hideMessageToggle?: boolean
  hideMessage?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  store: () => new ReplStore(),
  autoResize: true,
  clearConsole: true,
  ssr: false,
  encode: false,
  collapse: false,
  previewOptions: () => ({
    headHTML: '',
    bodyHTML: '',
    customCode: {
      importCode: '',
      useCode: '',
    },
  }),
  hideMessageToggle: true,
  hideMessage: false,
})

const { store } = props

const welcomeCode = `
<script setup>
import { ref } from 'vue'

const msg = ref('vite-plugin-vue-preview')
<\/script>

<template>
  <h1>{{ msg }}</h1>
  <input v-model="msg">
</template>
`.trim()

const files: Record<string, string> = {}

if (!props.code)
  files[defaultMainFile] = welcomeCode
else if (props.encode)
  files[defaultMainFile] = decodeURIComponent(props.code)
else
  files[defaultMainFile] = props.code

if (props.importMap) {
  const importMap = typeof props.importMap === 'string' ? JSON.parse(decodeURIComponent(props.importMap)) : props.importMap
  files[importMapFile] = JSON.stringify({ imports: importMap }, null, 2)
}

store.setFiles(files)

const theme = ref<'dark' | 'light'>()
const themeComputed = computed(() => props.theme ?? theme.value)
onMounted(() => {
  if (props.clearConsole)
    // eslint-disable-next-line no-console
    console.clear()

  const rootEl = document?.querySelector('html')
  if (rootEl) {
    useMutationObserver(rootEl, (mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'class')
          theme.value = rootEl.classList?.contains('dark') ? 'dark' : 'light'
      })
    }, {
      attributes: true,
    })
  }
})

const previewUpdateFlag = ref<PreviewUpdateFlag>('UPDATING')
function onPreivewUpdatePreview(flag: PreviewUpdateFlag) {
  previewUpdateFlag.value = flag
}

store.init()

provide('store', store)
provide('autoresize', props.autoResize)
provide('clear-console', props.clearConsole)
provide('preview-options', props.previewOptions)
provide('theme', themeComputed)

const { copy, copied } = useClipboard({ source: store.state.activeFile.code, legacy: true })

const isCollapse = ref(props.collapse)
const minHeightForCode = computed(() => isCollapse.value ? '0' : 'var(--vue-preview-editor-min-height)')
const maxHeightForCode = computed(() => isCollapse.value ? '0' : 'var(--vue-preview-editor-max-height)')

const previewBodyStyle = computed<Partial<CSSStyleDeclaration>>(() => typeof props.previewBodyStyle === 'string' ? JSON.parse(decodeURIComponent(props.previewBodyStyle)) : props.previewBodyStyle)
const previewAppStyle = computed<Partial<CSSStyleDeclaration>>(() => typeof props.previewAppStyle === 'string' ? JSON.parse(decodeURIComponent(props.previewAppStyle)) : props.previewAppStyle)

const vuePreviewContainerRef = ref()
const isHover = useElementHover(vuePreviewContainerRef)
</script>

<template>
  <div class="vue-preview">
    <div ref="vuePreviewContainerRef" class="vue-preview__container">
      <Preview show :ssr="props.ssr" :body-style="previewBodyStyle" :app-style="previewAppStyle" @update-preview="onPreivewUpdatePreview" />
      <Transition v-show="previewUpdateFlag !== 'UPDATING' && isHover" name="vue-preview-slide-down">
        <div class="vue-preview__btns">
          <button v-show="!copied" title="copy code" @click="copy(store.state.activeFile.code)">
            <Copy />
          </button>
          <button v-show="copied">
            <Copied />
          </button>
          <button v-show="!isCollapse" @click="isCollapse = true">
            <UnfoldLess />
          </button>
          <button v-show="isCollapse" @click="isCollapse = false">
            <UnfoldMore />
          </button>
        </div>
      </Transition>
      <Transition v-if="previewUpdateFlag === 'UPDATING'" name="fade">
        <div class="vue-preview__loading-model">
          <Loading />
        </div>
      </Transition>
    </div>
    <ExtendEditorContainer :hide-message-toggle="props.hideMessageToggle" :hide-message="props.hideMessage" />
  </div>
</template>

<style>
:root {
  --vue-preview-radius: 8px;
  --vue-preview-color-border: hsla(220, 13%, 18%, 0.1);
  --vue-preview-box-shadow: 2px 4px 8px 4px hsla(0, 0%, 0%, 0.1);
  --vue-preview-color-icon: hsl(220, 13%, 18%);
  --vue-preview-color-icon-bg-hover: hsl(220, 95%, 95%);
  --vue-preview-color-model-bg: hsla(0, 0%, 80%, 0.1);
  --vue-preview-editor-max-height: 50vh;
  --vue-preview-editor-min-height: 200px;
}
</style>

<style lang="scss" scoped>
.vue-preview {
  --bg: #fff;
  --border: #ddd;
  --text-light: #888;
  --font-code: Menlo, Monaco, Consolas, 'Courier New', monospace;
  --color-branding: #42b883;

  width: 100%;
  border-radius: var(--vue-preview-radius);
  overflow: hidden;
  box-shadow: var(--vue-preview-box-shadow);

  &__container {
    position: relative;
    min-height: 128px;
  }

  :deep(.iframe-container) {
    box-sizing: border-box;
    overflow: hidden;
    height: auto;
    border: 1px solid var(--vue-preview-color-border);
    border-radius: var(--vue-preview-radius) var(--vue-preview-radius) 0 0;
  }

  &__btns {
    position: absolute;
    right: 0;
    bottom: 0;
    box-sizing: border-box;
    display: flex;
    justify-content: flex-end;
    gap: 4px;
    padding: 4px;
    color: var(--vue-preview-color-icon);

    button {
      cursor: pointer;
      border: none;
      padding: 2px;
      width: 20px;
      height: 20px;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 4px;
      background-color: transparent;

      &:hover {
        background-color: var(--vue-preview-color-icon-bg-hover);
      }
    }
  }

  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.6s ease;
  }

  .fade-enter-from,
  .fade-leave-to {
    opacity: 0;
  }

  &__loading-model {
    position: absolute;
    inset: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: var(--vue-preview-color-model-bg);
  }

  .editor-container {
    height: auto;
  }

  :deep(.editor) {
    box-sizing: border-box;
    overflow-y: scroll;
    border-radius: 0 0 var(--vue-preview-radius) var(--vue-preview-radius);
    min-height: v-bind('minHeightForCode');
    max-height: v-bind('maxHeightForCode');
    transition: max-height 0.3s;
  }
}

.dark .vue-preview {
  --bg: #1a1a1a;
  --border: #383838;
  --text-light: #aaa;
  --color-branding: #42d392;
  --color-branding-dark: #89ddff;
}

.vue-preview-slide-down-enter-active,
.vue-preview-slide-down-leave-active {
  transition: all 0.3s ease;
}

.vue-preview-slide-down-enter-from,
.vue-preview-slide-down-leave-to {
  transform: translateY(48px);
  opacity: 0;
}
</style>
