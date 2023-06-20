<script setup lang="ts">
import { VuePreview } from '../../dist/index'

const code = encodeURIComponent(`
<script setup>
import { ref } from 'vue'

const msg = ref('test props')
<\/script>

<template>
  <h1>{{ msg }}</h1>
  <input v-model="msg">
</template>
`.trim(),
)
</script>

<template>
  <VuePreview :code="code" encode collapse :preview-body-style="{ background: 'red' }" :preview-app-style="{ background: 'yellow' }" />
</template>
