import DefaultTheme from 'vitepress/theme'
import VuePreview from '../../../../dist/sfc'
import '../../../../dist/style.css'

export default {
  ...DefaultTheme,
  enhanceApp(ctx) {
    DefaultTheme.enhanceApp(ctx)
    ctx.app.component('VuePreview', VuePreview)
  },
}
