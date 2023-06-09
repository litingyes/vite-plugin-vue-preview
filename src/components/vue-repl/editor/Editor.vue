<script setup lang="ts">
import { inject } from 'vue'
import { useDebounceFn } from '@vueuse/core'
import CodeMirror from '../codemirror/CodeMirror.vue'
import Message from '../Message.vue'
import type { Store } from '../store'

const store = inject('store') as Store

const onChange = useDebounceFn((code: string) => {
  store.state.activeFile.code = code
}, 250)
</script>

<template>
  <div class="editor-container">
    <CodeMirror :value="store.state.activeFile.code" @change="onChange" />
    <Message :err="store.state.errors[0]" />
  </div>
</template>

<style lang="scss" scoped>
.editor-container {
  overflow: hidden;
  position: relative;
  background: #EADDFF;
}
</style>
