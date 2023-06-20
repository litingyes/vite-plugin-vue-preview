<script lang="ts" setup>
// import '../../../dist/style.css'
import { VuePreview } from '../../../src'

const welcomeCode = `
<script setup>
import { ref } from 'vue'

const msg = ref('Hello World!')
<\/script>

<template>
  <h1>{{ msg }}</h1>
  <input v-model="msg">
</template>
`.trim()

const encodeCode = encodeURIComponent(welcomeCode)
const previewBodyStyle = encodeURIComponent(JSON.stringify({
  display: 'flex', justifyContent: 'center', alignItems: 'center',
}))
const previewAppStyle = encodeURIComponent(JSON.stringify({
  display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center',
}))
</script>

<template>
  <div class="demo-sfc">
    <VuePreview />
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

<style>
:root {
  --vue-preview-radius: 4px;
  --vue-preview-color-border: hsla(220, 13%, 18%, 0.2);
  --vue-preview-box-shadow: 1px 2px 4px 2px hsla(0, 0%, 0%, 0.2);
  --vue-preview-color-icon: hsl(220, 26%, 36%);
  --vue-preview-color-icon-bg-hover: hsl(220, 100%, 100%);
  --vue-preview-color-model-bg: hsla(0, 0%, 80%, 0.2);
}
</style>
