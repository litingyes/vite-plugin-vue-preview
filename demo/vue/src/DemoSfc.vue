<script lang="ts" setup>
import { provide } from 'vue'

// import 'vite-plugin-vue-preview/dist/style.css'
import { VuePreview, ReplStore, VuePreviewWrapper } from '../../../src/index'

const store = new ReplStore({ code: '<template><div>TEST</div></template>' });

provide('store', store)
provide('clear-console', true)

const code = '<template><div>TEST VuePreviewWrapper</div></template>'
</script>

<template>
    <div class="demo-sfc">
        <div class="demo-sfc__item">
            <VuePreview :store="store" ssr></VuePreview>
        </div>
        <div class="demo-sfc__item">
            <VuePreviewWrapper :code="code"></VuePreviewWrapper>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.demo-sfc {
    margin: 0 auto;
    padding-top: 100px;
    width: 1000px;
    display: flex;
    gap: 100px;
    justify-content: center;

    &__item {
        width: 400px;
    }
}
</style>