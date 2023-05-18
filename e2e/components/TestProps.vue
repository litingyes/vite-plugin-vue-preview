<template>
    <VuePreview :code="codeStr" :collapse="false" ssr outputBgColor="red" justify="center" align="center" />
</template>

<script setup lang="ts">
import { VuePreview } from '../../src'

const codeStr = `
    <template>
      <div>Hi, playwright test !</div>  
    </template>
`
</script>