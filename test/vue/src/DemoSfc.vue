<script lang="ts" setup>
import '../../../dist/style.css'
import { VuePreview } from '../../../src/index'
</script>

<template>
    <div class="demo-sfc">
        <VuePreview ssr></VuePreview>
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