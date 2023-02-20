<script setup lang="ts">
import CodeMirror from '../codemirror/CodeMirror.vue'
import Message from '../Message.vue'
import { debounce } from '../utils'
import { inject } from 'vue'
import type { Store } from '../store'

const store = inject('store') as Store

const onChange = debounce((code: string) => {
  store.state.activeFile.code = code
}, 250)
</script>

<template>
  <div class="editor-container">
    <CodeMirror @change="onChange" :value="store.state.activeFile.code" />
    <Message :err="store.state.errors[0]" />
  </div>
</template>

<style scoped>
.editor-container {
  height: calc(100% - var(--header-height));
  overflow: hidden;
  position: relative;
}
</style>
