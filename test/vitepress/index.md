# Vite Plugin Vue Preview

<p style="display: flex; align-items: center; gap: 8px;">
  <a href="https://github.com/liting-yes/vite-plugin-vue-preview"><img src="https://img.shields.io/github/stars/liting-yes/vite-plugin-vue-preview" alt="Downloads"></a>
  <a href="https://www.npmjs.com/package/vite-plugin-vue-preview"><img src="https://img.shields.io/npm/dm/vite-plugin-vue-preview" alt="Downloads"></a>
  <a href="https://www.npmjs.com/package/vite-plugin-vue-preview"><img src="https://img.shields.io/npm/v/vite-plugin-vue-preview" alt="Version"></a>
  <a href="https://www.npmjs.com/package/vite-plugin-vue-preview"><img src="https://img.shields.io/npm/l/vite-plugin-vue-preview" alt="License"></a>
</p>

A Vite plugin made for previewing and editing Vue components in Markdown and, of course, exporting a **VuePreview** component to be used directly in Vue applications.

> [!TIP]
> For most simple code preview scenarios that don't strongly bind to a vue component, it's even more recommended to use the [sandboxrun](https://github.com/liting-yes/sandboxrun.git)

## Demo

<!-- #region demo -->
```vue preview
<script lang="ts" setup>
import { isSpecialBooleanAttr } from '@vue/shared'
</script>

<template>
  <h1>Demo: vite-plugin-vue-preview</h1>
  <span>readonly is special boolean attr: {{ isSpecialBooleanAttr('readonly') }}</span>
</template>
```
<!-- #endregion demo -->

## Install

```bash
pnpm add vite-plugin-vue-preview@1
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
  // Third-party dependencies (CDN) that can be introduced by the demo component
  importMap?: Record<string, string> | string
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
/* VuePreview background-color of loading model */
--vue-preview-color-model-bg
/* VuePreview color of loading icon */
--vue-preview-color-loading
```

## Usage

### Vue

> Import the VuePreview component and style

```TS
import { createApp } from 'vue'
import { VuePreview } from 'vite-plugin-vue-preview'
import 'vite-plugin-vue-preview/style.css'

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
import 'vite-plugin-vue-preview/style.css'

export default {
  ...DefaultTheme,
  enhanceApp(ctx) {
    DefaultTheme.enhanceApp(ctx)
    ctx.app.component('VuePreview', VuePreview)
  },
}
```

Once you've set up the above, you're ready to use it in your markdown file:

<<< @/index.md#demo

## Plugin Configuration

There is no elegant way to pass component **Props** in a MarkDown file, so passing in specific component Props is supported in the plugin configuration for global configuration

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
