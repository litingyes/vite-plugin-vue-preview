# vite-plugin-vue-preview

[English](./README.md)

## 特征

- 支持 Vue/Vitepress 应用
- 支持在线编辑

## 用法

### Vue 应用

> 引入 VuePreview 组件及样式即可

```TS
import { createApp } from 'vue'
import { VuePreview } from 'vue-plugin-vue-preview'
import 'vite-plugin-vue-preview/dist/style.css'

const app = createApp({})

app.component('VuePreview', VuePreview)
```

### Vitepress 应用

> 引入插件及组件

```TS
// vite.config.ts
import { defineConfig } from 'vite'
import vuePreview from 'vite-plugin-vue-preview/plugin'

export default defineConfig({
  plugins: [vuePreview()],
})

// .vitepress/theme/index.ts
import DefaultTheme from 'vitepress/theme'
import { VuePreviewWrapper } from 'vite-plugin-vue-preview'

export default {
  ...DefaultTheme,
  enhanceApp(ctx) {
    DefaultTheme.enhanceApp(ctx)
    ctx.app.component('VuePreviewWrapper', VuePreviewWrapper)
  },
}
```

## 声明

- 核心代码来源于 [@vue/repl](https://github.com/vuejs/repl)
