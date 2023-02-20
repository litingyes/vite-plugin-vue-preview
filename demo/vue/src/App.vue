<script setup lang="ts">
import { provide } from 'vue'

import 'vite-plugin-vue-preview/dist/style.css'
import { Repl, ReplStore } from 'vite-plugin-vue-preview'

const store = new ReplStore({
  showOutput: true
});

provide('store', store)
provide('clear-console', true)
</script>

<template>
  <div class="test-vue">
    <Repl :store="store" ssr></Repl>
  </div>
</template>

<style scoped lang="scss">
.test-vue {}
</style>
