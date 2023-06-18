import { resolve } from 'node:path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import dts from 'vite-plugin-dts'

export default defineConfig({
  plugins: [vue(), dts({
    rollupTypes: true,
  })],
  build: {
    lib: {
      entry: [resolve(__dirname, 'src/index.ts')],
      formats: ['es', 'cjs'],
    },
    rollupOptions: {
      external: [
        'vue',
      ],
      output: {
        exports: 'named',
      },
    },
  },
})
