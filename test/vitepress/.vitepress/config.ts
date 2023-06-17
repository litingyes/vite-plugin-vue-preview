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
  themeConfig: {
    socialLinks: [
      { icon: 'github', link: 'https://github.com/liting-yes/vite-plugin-vue-preview' },
    ],
    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2023-present Liting',
    },
  },
})
