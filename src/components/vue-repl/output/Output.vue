<script setup lang="ts">
import { inject } from 'vue'
import Preview from './Preview.vue'

const props = defineProps<{
  ssr: boolean
}>()

const bgColor = inject('outputBgColor') as string
</script>

<template>
  <div class="output-container" :data-ssr="props.ssr">
    <Preview show :ssr="props.ssr" />
  </div>
</template>

<style scoped>
.output-container {
  overflow: hidden;
  position: relative;
  background: v-bind('bgColor');
}
</style>
