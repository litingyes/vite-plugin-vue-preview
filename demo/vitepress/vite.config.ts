import { defineConfig } from 'vite'
// import Vue from '@vitejs/plugin-vue'
// import { VuePreview } from '../../src'
import vuePreview from 'vite-plugin-vue-preview/plugin'

// function vuePreview(): Plugin {
//   return {
//     name: 'vite-plugin-vue-preview',
//     transform(code, id) {
//       if (!id.endsWith('.md'))
//         return code
//       // eslint-disable-next-line no-console
//       console.log(code, id, ReplStore)
//     },
//   }
// }

export default defineConfig({
  plugins: [vuePreview()],
})
