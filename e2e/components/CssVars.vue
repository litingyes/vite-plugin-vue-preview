<script setup lang="ts">
import { VuePreview } from '../../dist/index'
</script>

<template>
  <VuePreview />
</template>

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
