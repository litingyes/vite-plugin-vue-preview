import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import dts from 'vite-plugin-dts'
import banner from 'vite-plugin-banner'
import { visualizer } from 'rollup-plugin-visualizer'

// @ts-expect-error fs-extra packag.json config
import { readJSONSync } from 'fs-extra/esm'

const pkg = readJSONSync('./package.json')

export default defineConfig({
  plugins: [
    vue(),
    dts({
      rollupTypes: true,
    }),
    banner({
      content: `/**\n * name: ${pkg.name}\n * version: v${pkg.version}\n * description: ${pkg.description}\n * author: ${pkg.author}\n * homepage: ${pkg.homepage}\n */`,
    }),
    visualizer()],
  build: {
    target: 'esnext',
    minify: false,
    lib: {
      entry: {
        sfc: './src/VuePreview.vue',
        plugin: './src/plugin.ts',
      },
      formats: ['es'],
    },
    rollupOptions: {
      external: [
        'vue',
        'vue/compiler-sfc',
      ],
      output: {
        chunkFileNames: 'chunks/[name]-[hash].js',
      },
    },
  },
})
