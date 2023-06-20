<script lang="ts" setup>
// import '../../../dist/style.css'
import { VuePreview } from '../../../src'

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
  <div class="demo-sfc">
    <VuePreview :code="code" encode :preview-body-style="{ background: 'red' }" :preview-app-style="{ background: 'yellow' }" />
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
