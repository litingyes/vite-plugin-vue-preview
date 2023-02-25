import { defineConfig } from 'vite'
import vuePreview from '../../dist'

export default defineConfig({
  plugins: [vuePreview()],
})
