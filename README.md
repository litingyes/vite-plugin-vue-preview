<h1 align="center">vite-plugin-vue-preview</h1>

<p align="center">
  <a href="https://www.npmjs.com/package/vite-plugin-vue-preview"><img src="https://img.shields.io/npm/dm/vite-plugin-vue-preview" alt="Downloads"></a>
  <a href="https://www.npmjs.com/package/vite-plugin-vue-preview"><img src="https://img.shields.io/npm/v/vite-plugin-vue-preview" alt="Version"></a>
  <a href="https://www.npmjs.com/package/vite-plugin-vue-preview"><img src="https://img.shields.io/npm/l/vite-plugin-vue-preview" alt="License"></a>
</p>

<p align="center">
  <a href="./README.ZH-CN.md">简体中文</a>
</p>

## Install

```bash
pnpm add vue-plugin-vue-preview
```

## Features

- Support for Vue/Vitepress applications
- Support online editing

## Usage

### Vue

> Import the VuePreview component and style
>
> The VuePreview component supports prop code, which can be passed in as a string initialization code

```TS
import { createApp } from 'vue'
import { VuePreview } from 'vue-plugin-vue-preview'
import 'vite-plugin-vue-preview/dist/style.css'

const app = createApp({})

app.component('VuePreview', VuePreview)
```

### Vitepress

> Import the VuePreview component / style and plugin

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

## Statement

- Core code from [@vue/repl](https://github.com/vuejs/repl)
