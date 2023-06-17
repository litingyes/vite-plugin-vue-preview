<script setup lang="ts">
import '@liting-yes/vue-repl/style.css'
import type { Store } from '@liting-yes/vue-repl'
import { CodeMirror, Preview, ReplStore, defaultMainFile } from '@liting-yes/vue-repl'
import { computed, provide, ref } from 'vue'
import { debounce } from 'lodash-es'
import { useClipboard } from '@vueuse/core'
import Copy from './icons/Copy.vue'
import Copied from './icons/Copied.vue'
import UnfoldLess from './icons/UnfoldLess.vue'
import UnfoldMore from './icons/UnfoldMore.vue'

export interface Props {
  store?: Store
  autoResize?: boolean
  clearConsole?: boolean
  ssr?: boolean
  code?: string
  encode?: boolean
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
}

const props = withDefaults(defineProps<Props>(), {
  store: () => new ReplStore(),
  autoResize: true,
  showCompileOutput: true,
  showImportMap: true,
  clearConsole: true,
  ssr: false,
  encode: false,
  previewOptions: () => ({
    headHTML: '',
    bodyHTML: '',
    customCode: {
      importCode: '',
      useCode: '',
    },
  }),
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

if (!props.code) {
  store.setFiles({
    [defaultMainFile]: welcomeCode,
  })
}
else if (props.encode) {
  store.setFiles({
    [defaultMainFile]: decodeURIComponent(props.code),
  })
}
else {
  store.setFiles({
    [defaultMainFile]: props.code,
  })
}

store.init()

const onChange = debounce((code: string) => {
  store.state.activeFile.code = code
}, 250)

provide('store', store)
provide('autoresize', props.autoResize)
provide('clear-console', props.clearConsole)
provide('preview-options', props.previewOptions)

const { copy, copied } = useClipboard({ source: store.state.activeFile.code, legacy: true })

const isFold = ref(false)
const maxHeightForCode = computed(() => isFold.value ? '0' : '1000px')
const borderRadiusForBtnsContaniner = computed(() => isFold.value ? '0 0 var(--vue-preview-radius) var(--vue-preview-radius)' : 'none')

const previewBodyStyle = computed<Partial<CSSStyleDeclaration>>(() => typeof props.previewBodyStyle === 'string' ? JSON.parse(decodeURIComponent(props.previewBodyStyle)) : props.previewBodyStyle)
const previewAppStyle = computed<Partial<CSSStyleDeclaration>>(() => typeof props.previewAppStyle === 'string' ? JSON.parse(decodeURIComponent(props.previewAppStyle)) : props.previewAppStyle)
</script>

<template>
  <div class="vue-preview">
    <Preview show :ssr="props.ssr" :body-style="previewBodyStyle" :app-style="previewAppStyle" />
    <div class="vue-preview__btns">
      <button v-show="!copied" title="copy code" @click="copy(store.state.activeFile.code)">
        <Copy />
      </button>
      <button v-show="copied">
        <Copied />
      </button>
      <button v-show="!isFold" @click="isFold = true">
        <UnfoldLess />
      </button>
      <button v-show="isFold" @click="isFold = false">
        <UnfoldMore />
      </button>
    </div>
    <CodeMirror :value="store.state.activeFile.code" @change="onChange" />
  </div>
</template>

<style>
:root {
  --vue-preview-radius: 8px;
  --vue-preview-color-border: hsla(220, 13%, 18%, 0.1);
  --vue-preview-color-icon: hsl(220, 13%, 18%);
  --vue-preview-color-icon-bg-hover: hsl(220, 95%, 95%);
}
</style>

<style scoped>
.vue-preview {
  width: 100%;
  border-radius: var(--vue-preview-radius);
  overflow: hidden;
  box-shadow: 2px 4px 8px 4px hsla(0, 0%, 0%, 0.1);

}

:deep(.iframe-container) {
  box-sizing: border-box;
  overflow: hidden;
  height: auto;
  border: 1px solid var(--vue-preview-color-border);
  border-bottom: none;
  border-radius: var(--vue-preview-radius) var(--vue-preview-radius) 0 0;
}

.vue-preview__btns {
  box-sizing: border-box;
  border: 1px solid var(--vue-preview-color-border);
  border-top: none;
  /* border-bottom: none; */
  display: flex;
  justify-content: flex-end;
  gap: 4px;
  padding: 4px;
  color: var(--vue-preview-color-icon);
  border-radius: v-bind(borderRadiusForBtnsContaniner);
  overflow: hidden;
}

.vue-preview__btns button {
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
}

.vue-preview__btns button:hover {
  background-color: var(--vue-preview-color-icon-bg-hover);
}

:deep(.editor) {
  box-sizing: border-box;
  overflow: hidden;
  height: auto;
  border-radius: 0 0 var(--vue-preview-radius) var(--vue-preview-radius);
  max-height: v-bind('maxHeightForCode');
  transition: max-height 0.3s;
}
</style>
