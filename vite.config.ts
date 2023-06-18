import { resolve } from 'node:path'
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
