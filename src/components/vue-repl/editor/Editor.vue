<script setup lang="ts">
import CodeMirror from '../codemirror/CodeMirror.vue'
import Message from '../Message.vue'
import { inject } from 'vue'
import type { Store } from '../store'
import { useClipboard } from '@vueuse/core'
import { Icon } from '@iconify/vue'
import { useDebounceFn } from '@vueuse/core'

const store = inject('store') as Store

const onChange = useDebounceFn((code: string) => {
  store.state.activeFile.code = code
}, 250)

const { copy, copied, isSupported } = useClipboard()
</script>

<template>
  <div class="editor-container">
    <CodeMirror @change="onChange" :value="store.state.activeFile.code" />
    <Message :err="store.state.errors[0]" />
    <template v-if="isSupported">
      <Icon v-if="copied" icon="material-symbols:content-copy" />
      <Icon v-else icon="material-symbols:content-copy-outline" @click="copy(store.state.activeFile.code)" />
    </template>
  </div>
</template>

<style lang="scss" scoped>
.editor-container {
  height: calc(100% - 38px);
  overflow: hidden;
  position: relative;

  .iconify {
    position: absolute;
    top: 4px;
    right: 4px;
    width: 24px;
    height: 24px;
    cursor: pointer;
  }
}
</style>
