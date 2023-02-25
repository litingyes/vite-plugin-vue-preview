import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'vite-plugin-vue-preview',
  description: 'a vite plugin for vue preview',
  cleanUrls: true,
  locales: {
    root: {
      label: 'English',
      lang: 'en-US',
      themeConfig: {
        outlineTitle: 'Catalog',
      },
    },
    zh: {
      label: '简体中文',
      lang: 'zh-CN',
      link: '/zh/',
      themeConfig: {
        outlineTitle: '目录',
      },
    },
  },
})
