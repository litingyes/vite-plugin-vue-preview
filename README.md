<h1 align="center">vite-plugin-vue-preview</h1>

<p align="center">
  <a href="https://github.com/liting-yes/vite-plugin-vue-preview"><img src="https://img.shields.io/github/stars/liting-yes/vite-plugin-vue-preview" alt="Downloads"></a>
  <a href="https://www.npmjs.com/package/vite-plugin-vue-preview"><img src="https://img.shields.io/npm/dm/vite-plugin-vue-preview" alt="Downloads"></a>
  <a href="https://www.npmjs.com/package/vite-plugin-vue-preview"><img src="https://img.shields.io/npm/v/vite-plugin-vue-preview" alt="Version"></a>
  <a href="https://www.npmjs.com/package/vite-plugin-vue-preview"><img src="https://img.shields.io/npm/l/vite-plugin-vue-preview" alt="License"></a>
</p>

<p align="center">
  <a href="./README.zh-CN.md">简体中文</a>
</p>

A Vite plugin made for previewing and editing Vue components in Markdown and, of course, exporting a **VuePreview** component to be used directly in Vue applications.

## Demo

<p align="center">
  <img src="./public/demo.gif" />
</p>

## Install

```bash
pnpm add vite-plugin-vue-preview
```

## Features

- Support for Vue/Vitepress applications
- Support code preview
- Support online editing

## Props

### VuePreview

```TS
interface Props {
  // Initialization code string
  code: string
  // Whether to collapse the code when the component is mounted
  collapse: boolean
  // Whether to turn on ssr
  ssr: boolean
  // Whether the incoming props string is encoded by encodeURIComponent (necessary mainly in vitepress)
  encode: boolean
  // The body style in the iframe element
  previewBodyStyle: Partial<CSSStyleDeclaration> | string
  // Styling of the root component in the iframe element
  previewAppStyle?: Partial<CSSStyleDeclaration> | string
}
```

## CSS Styles

```CSS
/* VuePreview border-radius */
--vue-preview-radius
/* VuePreview border-color */
--vue-preview-color-border
/* VuePreview box-shadow */
--vue-preview-box-shadow
/* VuePreview color */
--vue-preview-color-icon
/* VuePreview hover:color */
--vue-preview-color-icon-bg-hover 
```

## Usage

### Vue

> Import the VuePreview component and style

```TS
import { createApp } from 'vue'
import { VuePreview } from 'vite-plugin-vue-preview'
import 'vite-plugin-vue-preview/dist/style.css'

const app = createApp()

app.component('VuePreview', VuePreview)
```

### Vitepress

> Import the VuePreview component / style and plugin

```TS
// vite.config.ts
import { defineConfig } from 'vite'
import { VuePreviewPlugin } from 'vite-plugin-vue-preview'


export default defineConfig({
  plugins: [VuePreviewPlugin()],
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

Once you've set up the above, you're ready to use it in your markdown file:

<pre>
  <code>
&#96;&#96;&#96;vue preview
&lt;template&gt;
  &lt;h1&gt;Demo: vite-plugin-vue-preview&lt;/h1&gt;
&lt;/template&gt;
&#96;&#96;&#96;
  </code>
</pre>

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
    },
  })],
})
```
