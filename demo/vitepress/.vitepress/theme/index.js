import DefaultTheme from 'vitepress/theme'
import { VuePreviewWrapper } from 'vite-plugin-vue-preview'

export default {
  ...DefaultTheme,
  enhanceApp(ctx) {
    DefaultTheme.enhanceApp(ctx)

    ctx.app.component('VuePreviewWrapper', VuePreviewWrapper)
  },
}
