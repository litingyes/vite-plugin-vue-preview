<script setup lang="ts">
import Preview from './Preview.vue'

const props = defineProps<{
  ssr: boolean
}>()
</script>

<template>
  <div class="output-container">
    <Preview show :ssr="props.ssr" />
  </div>
</template>

<style scoped>
.output-container {
  overflow: hidden;
  position: relative;
}
</style>
