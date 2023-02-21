<template>
    <VuePreview :store="store"></VuePreview>
</template>

<script lang="ts" setup>
import { ReplStore, VuePreview } from './vue-repl'
import { provide } from 'vue'

export interface Props {
    code: string
}
const props = defineProps<Props>()

const store = new ReplStore({ code: props.code });
provide('store', store)

</script>