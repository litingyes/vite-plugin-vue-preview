<template>
  <Repl :store="store"></Repl>
</template>

<script lang="ts" setup>
import { ReplStore, Repl } from './vue-repl'
import { provide, watch } from 'vue'

export interface Props {
  code?: string
}

const props = withDefaults(defineProps<Props>(), {
  code: `
    <template>
      <div>Hi, vite-plugin-vue-preview !</div>  
    </template>
  `
})

const store = new ReplStore({ code: props.code });
provide('store', store)

watch(() => props.code, (val) => {
  store.state.activeFile.code = val
}, {
  immediate: true
})
</script>