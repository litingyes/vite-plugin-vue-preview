import DefaultTheme from 'vitepress/theme'
import { VuePreview } from '../../../../src/index'

export default {
  ...DefaultTheme,
  enhanceApp(ctx) {
    DefaultTheme.enhanceApp(ctx)
    ctx.app.component('VuePreview', VuePreview)
  },
}
