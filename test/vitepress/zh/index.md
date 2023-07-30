# Vite Plugin Vue Preview

<p style="display: flex; align-items: center; gap: 8px;">
  <a href="https://github.com/liting-yes/vite-plugin-vue-preview"><img src="https://img.shields.io/github/stars/liting-yes/vite-plugin-vue-preview" alt="Downloads"></a>
  <a href="https://www.npmjs.com/package/vite-plugin-vue-preview"><img src="https://img.shields.io/npm/dm/vite-plugin-vue-preview" alt="Downloads"></a>
  <a href="https://www.npmjs.com/package/vite-plugin-vue-preview"><img src="https://img.shields.io/npm/v/vite-plugin-vue-preview" alt="Version"></a>
  <a href="https://www.npmjs.com/package/vite-plugin-vue-preview"><img src="https://img.shields.io/npm/l/vite-plugin-vue-preview" alt="License"></a>
</p>

一个为在 Markdown 中预览和编辑Vue组件而生的Vite插件，当然，也导出了一个 **VuePreview** 组件可以直接在 Vue 应用中使用

## 演示

<!-- #region demo -->
```vue preview
<script lang="ts" setup>
import { isSpecialBooleanAttr } from '@vue/shared'
</script>

<template>
  <h1>演示： vite-plugin-vue-preview</h1>
  <span>readonly is special boolean attr: {{ isSpecialBooleanAttr('readonly') }}</span>
</template>
```
<!-- #endregion demo -->

## 安装

```bash
pnpm add vite-plugin-vue-preview@1
```

## 特征

- 支持 Vue3/Vitepress 应用
- 支持代码预览
- 支持在线编辑

## Props

### VuePreview

```TS
interface Props {
  // 初始化代码字符串
  code: string
  // 组件挂载时是否折叠代码
  collapse: boolean
  // 是否开启 ssr
  ssr: boolean
  // 传入的 props 字符串是否被 encodeURIComponent 编码（主要在 vitepress 中很必要）
  encode: boolean
  // iframe 元素中的 body 样式
  previewBodyStyle: Partial<CSSStyleDeclaration> | string
  // iframe 元素中根组件的样式
  previewAppStyle?: Partial<CSSStyleDeclaration> | string
  // demo 组件可引入的第三方依赖（CDN）
  importMap?: Record<string, string> | string
}
```

## CSS 样式

```CSS
/* VuePreview 外边框圆角 */
--vue-preview-radius
/* VuePreview 边框颜色 */
--vue-preview-color-border
/* VuePreview 盒子阴影 */
--vue-preview-box-shadow
/* VuePreview 图标颜色 */
--vue-preview-color-icon
/* VuePreview 图标 hover 颜色 */
--vue-preview-color-icon-bg-hover
/* VuePreview 加载区域背景色 */
--vue-preview-color-model-bg
```

## 用法

### Vue 应用

> 导入 VuePreview 组件及样式

```TS
import { createApp } from 'vue'
import { VuePreview } from 'vite-plugin-vue-preview'
import 'vite-plugin-vue-preview/style.css'

const app = createApp()

app.component('VuePreview', VuePreview)
```

### VitePress 应用

> 导入 VuePreview 组件及样式，同时配置插件设置

```TS
// vite.config.ts
import { defineConfig } from 'vite'
import { vuePreviewPlugin } from 'vite-plugin-vue-preview'

export default defineConfig({
  plugins: [vuePreviewPlugin()],
})

// .vitepress/theme/index.ts
import DefaultTheme from 'vitepress/theme'
import { VuePreview } from 'vite-plugin-vue-preview'
import 'vite-plugin-vue-preview/style.css'

export default {
  ...DefaultTheme,
  enhanceApp(ctx) {
    DefaultTheme.enhanceApp(ctx)
    ctx.app.component('VuePreview', VuePreview)
  },
}
```

一旦你按照上述流程配置完成，你就可以在你的markdown文件中使用了：

<<< @/zh/index.md#demo

## 插件配置

在 MarkDown 文件中，传递组件 **Props** 并没有太优雅的办法，故在插件配置中支持传入特定的组件 Props 进行全局配置

```TS
// vite.config.ts
import { defineConfig } from 'vite'
import { vuePreviewPlugin } from 'vite-plugin-vue-preview'

export default defineConfig({
  plugins: [vuePreviewPlugin({
    props: {
      previewBodyStyle: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      },
      previewAppStyle: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
      },
      importMap: {
        '@vue/shared': 'https://unpkg.com/@vue/shared@latest/dist/shared.esm-bundler.js',
      },
    },
  })],
})
```
