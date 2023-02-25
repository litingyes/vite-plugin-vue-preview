<h1 align="center">vite-plugin-vue-preview</h1>

<p align="center">
  <a href="https://www.npmjs.com/package/vite-plugin-vue-preview"><img src="https://img.shields.io/npm/dm/vite-plugin-vue-preview" alt="Downloads"></a>
  <a href="https://www.npmjs.com/package/vite-plugin-vue-preview"><img src="https://img.shields.io/npm/v/vite-plugin-vue-preview" alt="Version"></a>
  <a href="https://www.npmjs.com/package/vite-plugin-vue-preview"><img src="https://img.shields.io/npm/l/vite-plugin-vue-preview" alt="License"></a>
</p>

<p align="center">
  <a href="./README.md">English</a>
</p>

## 下载

```bash
pnpm add vite-plugin-vue-preview
```

## 特征

- 支持 Vue/Vitepress 应用
- 支持在线编辑

## 用法

### Vue 应用

> 导入 VuePreview 组件及样式
>
> VuePreview 组件支持 prop code, 可传入字符串初始化代码

```TS
import { createApp } from 'vue'
import { VuePreview } from 'vite-plugin-vue-preview'
import 'vite-plugin-vue-preview/dist/style.css'

const app = createApp({})

app.component('VuePreview', VuePreview)
```

### Vitepress 应用

> 导入 VuePreview 组件及样式，同时配置插件设置

```TS
// vite.config.ts
import { defineConfig } from 'vite'
import vuePreview from 'vite-plugin-vue-preview/plugin'

export default defineConfig({
  plugins: [vuePreview()],
})

// .vitepress/theme/index.ts
import DefaultTheme from 'vitepress/theme'
import { VuePreview } from 'vite-plugin-vue-preview'
import 'vite-plugin-vue-preview/dist/style.css'

export default {
  ...DefaultTheme,
  enhanceApp(ctx) {
    DefaultTheme.enhanceApp(ctx)
    ctx.app.component('VuePreview', VuePreview)
  },
}
```

## 声明

- 核心代码来源于 [@vue/repl](https://github.com/vuejs/repl)
