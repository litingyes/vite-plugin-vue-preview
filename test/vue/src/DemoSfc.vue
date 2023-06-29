<script lang="ts" setup>
// import '../../../dist/style.css'
import { VuePreview } from '../../../src'

const code = encodeURIComponent(`
<script setup>
import { isString } from '@vue/shared'

const res = isString('@vue/shared')
<\/script>

<template>
  <h1>Test ImportMap</h1>
  <div>Result: {{res}}</div>
</template>
`.trim(),
)
</script>

<template>
  <div class="demo-sfc">
    <VuePreview :code="code" :clear-console="false" encode :import-map="{ '@vue/shared': 'https://unpkg.com/@vue/shared@latest/dist/shared.esm-bundler.js' }" />
  </div>
</template>

<style scoped>
.demo-sfc {
  margin: 0 auto;
  padding-top: 100px;
  width: 1000px;
  display: flex;
  justify-content: center;
}
</style>
