# vite-plugin-vue-preview

[简体中文](./README.ZH-CN.md)

## Features

- Support for Vue/Vitepress applications
- Support online editing

## Usage

### Vue

> Just introduce the **VuePreview** component and style

```TS
import { createApp } from 'vue'
import { VuePreview } from 'vue-plugin-vue-preview'
import 'vite-plugin-vue-preview/dist/style.css'

const app = createApp({})

app.component('VuePreview', VuePreview)
```

### Vitepress

> Introduction the plugin / component / style

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
