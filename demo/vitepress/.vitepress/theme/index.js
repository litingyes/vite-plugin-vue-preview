import DefaultTheme from 'vitepress/theme'
import { VuePreviewWrapper } from 'vite-plugin-vue-preview'
import 'vite-plugin-vue-preview/dist/style.css'

export default {
  ...DefaultTheme,
  enhanceApp(ctx) {
    DefaultTheme.enhanceApp(ctx)

    ctx.app.component('VuePreviewWrapper', VuePreviewWrapper)
  },
}
