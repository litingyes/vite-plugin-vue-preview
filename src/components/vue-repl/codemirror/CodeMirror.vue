<script setup lang="ts">
import { onMounted, ref, watchEffect } from 'vue'

// import { useDebounceFn } from '@vueuse/core'
import { Compartment, EditorState } from '@codemirror/state'
import { EditorView, drawSelection, highlightActiveLine, highlightActiveLineGutter, keymap, lineNumbers } from '@codemirror/view'
import type { ViewUpdate } from '@codemirror/view'
import { vue } from '@codemirror/lang-vue'
import { defaultKeymap, history } from '@codemirror/commands'
import { closeBrackets } from '@codemirror/autocomplete'
import { bracketMatching, codeFolding, foldGutter } from '@codemirror/language'
import { oneDark } from '@codemirror/theme-one-dark'

export interface Props {
  value?: string
  readonly?: boolean
}
const props = withDefaults(defineProps<Props>(), {
  value: '',
})

const emit = defineEmits<(e: 'change', value: string) => void>()

const el = ref()

const language = new Compartment()

const state = EditorState.create({
  doc: props.value,
  extensions: [
    language.of(vue()),
    EditorState.tabSize.of(2),
    EditorView.updateListener.of((update: ViewUpdate) => {
      emit('change', update.state.doc.toString())
    }),
    keymap.of(defaultKeymap),
    drawSelection(),
    highlightActiveLine(),
    lineNumbers(),
    highlightActiveLineGutter(),
    EditorView.lineWrapping,
    history(),
    closeBrackets(),
    codeFolding(),
    bracketMatching({
      afterCursor: true,
    }),
    foldGutter(),
    oneDark,
  ],
})

onMounted(() => {
  const editor = new EditorView({
    state,
    parent: el.value,
  })

  watchEffect(() => {
    const cur = editor.state.doc.toString()
    if (props.value !== cur)
      editor.dispatch({ changes: { from: 0, to: editor.state.doc.length, insert: props.value } })
  })
})
</script>

<template>
  <div ref="el" class="editor" />
</template>

<style lang="scss" scoped>
.editor {
  position: relative;
  overflow: hidden;
}
</style>
