<template>
  <Repl :store="store" v-bind="$attrs"></Repl>
</template>

<script lang="ts" setup>
import { ReplStore, Repl } from './vue-repl'
import { provide, watch, computed } from 'vue'

export interface Props {
  code?: string,
  decode?: boolean
  outputBgColor?: string
}

const props = withDefaults(defineProps<Props>(), {
  code: `
    <template>
      <div>Hi, vite-plugin-vue-preview !</div>  
    </template>
  `,
  decode: false,
  outputBgColor: 'transparent'
})
provide('outputBgColor', props.outputBgColor)

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