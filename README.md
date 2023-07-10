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
- Integrating VSCode tips

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
  // Editor theme color, when not provided, automatically switch according to whether the html element has class name 'dark' or not.
  theme?: 'dark' | 'light'
  // Whether to hide the switch that controls whether compilation error messages are displayed or not
  hideMessageToggle?: boolean
  // Whether to hide compilation error messages
  hideMessage?: boolean
}
```

## CSS Styles

```CSS
/* border-radius */
--vue-preview-radius
/* border-color */
--vue-preview-color-border
/* box-shadow */
--vue-preview-box-shadow
/* color */
--vue-preview-color-icon
/* hover:color */
--vue-preview-color-icon-bg-hover
/* background-color of loading model */
--vue-preview-color-model-bg
/* maximum height of the edit container */
--vue-preview-editor-max-height
/* minimum height of the edit container */
--vue-preview-editor-min-height

/* the following CSS variables are inherited from vuejs/repl, go to its code repository for more details */
--bg
--border
--text-light
--font-code
--color-branding
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

<pre>
  <code>
&#96;&#96;&#96;vue preview
&lt;template&gt;
  &lt;h1&gt;Demo: vite-plugin-vue-preview&lt;/h1&gt;
&lt;/template&gt;
&#96;&#96;&#96;
  </code>
</pre>

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

## Acknowledgement

- [vuejs/repl](https://github.com/vuejs/repl)
