<script lang="ts" setup>
import { computed, provide, watch } from 'vue'
import { Repl, ReplStore } from './vue-repl'

export interface Props {
  code?: string
  decode?: boolean
  outputBgColor?: string
  justify?: 'start' | 'center' | 'end'
  align?: 'start' | 'center' | 'end'
}

const props = withDefaults(defineProps<Props>(), {
  code: `
    <template>
      <div>Hi, vite-plugin-vue-preview !</div>  
    </template>
  `,
  decode: false,
  outputBgColor: 'transparent',
})
provide('outputBgColor', props.outputBgColor)

const code = computed(() => {
  if (props.decode)
    return decodeURIComponent(props.code)
  return props.code
})

const appStyle = computed(() => {
  if (!props.justify && !props.align)
    return {}

  return ({
    'display': 'flex',
    'justify-content': props.justify ?? 'flex-start',
    'align-items': props.align ?? 'flex-start',
  })
})
provide('appStyle', appStyle)

const store = new ReplStore({ code: code.value })
provide('store', store)

watch(code, (val) => {
  store.state.activeFile.code = val
})
</script>

<template>
  <Repl :store="store" v-bind="$attrs" />
</template>
