<script setup lang="ts">
import CodeMirror from '../codemirror/CodeMirror.vue'
import Message from '../Message.vue'
import { inject } from 'vue'
import type { Store } from '../store'
import { useDebounceFn } from '@vueuse/core'

const store = inject('store') as Store

const onChange = useDebounceFn((code: string) => {
  store.state.activeFile.code = code
}, 250)
</script>

<template>
  <div class="editor-container">
    <CodeMirror @change="onChange" :value="store.state.activeFile.code" />
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
