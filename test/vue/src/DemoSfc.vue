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
    <VuePreview :code="encodeCode" encode :preview-body-style="previewBodyStyle" :preview-app-style="previewAppStyle" />
  </div>
</template>

<style lang="scss" scoped>
.demo-sfc {
  margin: 0 auto;
  padding-top: 100px;
  width: 1000px;
  display: flex;
  justify-content: center;
}
</style>
