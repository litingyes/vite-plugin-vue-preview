<script setup lang="ts">
import { VuePreview } from '../../dist/index'

const code = encodeURIComponent(`
<script setup>
import { isString } from '@vue/shared'

const flag = isString('@vue/shared')
<\/script>

<template>
  <h1>Test</h1>
  <span>{{flag}}</span>
</template>
`.trim(),
)

const importMap = {
  '@vue/shared': 'https://unpkg.com/@vue/shared@latest/dist/shared.esm-bundler.js',
}
</script>

<template>
  <VuePreview :code="code" encode collapse :preview-body-style="{ background: 'red' }" :preview-app-style="{ background: 'yellow' }" :import-map="importMap" />
</template>
