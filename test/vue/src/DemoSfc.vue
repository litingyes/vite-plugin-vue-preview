<script lang="ts" setup>
import { provide } from 'vue'

import '../../../dist/style.css'
import { VuePreview } from '../../../src/index'

const code = '<template><div>TEST VuePreviewWrapper</div></template>'
</script>

<template>
    <div class="demo-sfc">
        <VuePreview :code="code"></VuePreview>
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