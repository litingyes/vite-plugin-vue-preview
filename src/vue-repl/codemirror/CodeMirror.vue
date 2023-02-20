<template>
  <div class="editor" ref="el"></div>
</template>

<script setup lang="ts">
import { ref, onMounted, watchEffect, inject } from 'vue'
import CodeMirror from './codemirror'
import { useDebounceFn } from '@vueuse/core'


export interface Props {
  value?: string
  readonly?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  value: '',
  readonly: false
})

const emit = defineEmits<(e: 'change', value: string) => void>()

const el = ref()
const needAutoResize = inject('autoresize')

onMounted(() => {
  const addonOptions = {
    autoCloseBrackets: true,
    autoCloseTags: true,
    foldGutter: true,
    gutters: ['CodeMirror-linenumbers', 'CodeMirror-foldgutter']
  }

  const editor = CodeMirror(el.value!, {
    value: '',
    mode: 'htmlmixed',
    readOnly: props.readonly,
    tabSize: 2,
    lineWrapping: true,
    lineNumbers: true,
    ...addonOptions
  })

  editor.on('change', () => {
    emit('change', editor.getValue())
  })

  watchEffect(() => {
    const cur = editor.getValue()
    if (props.value !== cur) {
      editor.setValue(props.value)
    }
  })

  setTimeout(() => {
    editor.refresh()
  }, 50)

  if (needAutoResize) {
    window.addEventListener(
      'resize',
      useDebounceFn(() => {
        editor.refresh()
      })
    )
  }
})
</script>

<style lang="scss">
.editor {
  position: relative;
  height: 100%;
  width: 100%;
  overflow: hidden;
}

.CodeMirror {
  font-family: Menlo, Monaco, Consolas, 'Courier New', monospace;
  line-height: 1.5;
  height: 100%;
}
</style>
