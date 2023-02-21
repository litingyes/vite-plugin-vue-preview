<script lang="ts" setup>
import { provide } from 'vue'

import 'vite-plugin-vue-preview/dist/style.css'
import { VuePreview, ReplStore } from 'vite-plugin-vue-preview'

const store = new ReplStore({ code: '<template><div>TEST</div></template>' });

provide('store', store)
provide('clear-console', true)
</script>

<template>
    <VuePreview :store="store" ssr></VuePreview>
</template>