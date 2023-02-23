import { defineConfig } from 'vite'
import vuePreview from '../../dist/plugin'

export default defineConfig({
  plugins: [vuePreview()],
})
