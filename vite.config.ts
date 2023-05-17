import { resolve } from 'node:path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import dts from 'vite-plugin-dts'

export default defineConfig({
  plugins: [vue(), dts()],
  build: {
    lib: {
      entry: [resolve(__dirname, 'src/index.ts')],
      formats: ['es', 'cjs'],
    },
    rollupOptions: {
      external: [
        'vue',
        'vue/compiler-sfc',
        '@codemirror/autocomplete',
        '@codemirror/commands',
        '@codemirror/lang-vue',
        '@codemirror/state',
        '@codemirror/theme-one-dark',
        '@codemirror/view',
      ],
      output: {
        exports: 'named',
      },
    },
  },
})
