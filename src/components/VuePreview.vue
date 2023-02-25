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
    code: '<template>Hello, vite-plugin-vue-preview !</template>'
})

const store = new ReplStore({ code: props.code });
provide('store', store)

watch(() => props.code, (val) => {
    store.state.activeFile.code = val
})
</script>