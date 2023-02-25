<template>
  <Repl :store="store"></Repl>
</template>

<script lang="ts" setup>
import { ReplStore, Repl } from './vue-repl'
import { provide, watch, computed } from 'vue'

export interface Props {
  code?: string,
  decode?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  code: `
    <template>
      <div>Hi, vite-plugin-vue-preview !</div>  
    </template>
  `,
  decode: false
})

const code = computed(() => {
  if (props.decode) return decodeURIComponent(props.code)
  return props.code
})

const store = new ReplStore({ code: code.value });
provide('store', store)

watch(code, (val) => {
  store.state.activeFile.code = val
})
</script>