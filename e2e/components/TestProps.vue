<script setup lang="ts">
import { VuePreview } from '../../src'

const codeStr = `
    <template>
      <div>Hi, playwright test !</div>  
    </template>
`
</script>

<template>
  <VuePreview :code="codeStr" :collapse="false" ssr output-bg-color="red" justify="center" align="center" />
</template>
