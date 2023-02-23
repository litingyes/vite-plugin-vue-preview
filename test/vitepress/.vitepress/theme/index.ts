import DefaultTheme from 'vitepress/theme'
import { VuePreviewWrapper } from '../../../../dist'
import '../../../../dist/style.css'

export default {
  ...DefaultTheme,
  enhanceApp(ctx) {
    DefaultTheme.enhanceApp(ctx)
    ctx.app.component('VuePreviewWrapper', VuePreviewWrapper)
  },
}
