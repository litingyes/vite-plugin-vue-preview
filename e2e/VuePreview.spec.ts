import { expect, test } from '@playwright/experimental-ct-vue'
import { VuePreview } from '../src'
import TestProps from './components/TestProps.vue'

test.describe('basic', () => {
  test('mount successfully', async ({ mount }) => {
    const sfc = await mount(VuePreview)
    await expect(sfc).toHaveClass('vue-preview')
    await expect(sfc).toContainText('Hi, vite-plugin-vue-preview !')
  })

  test('copy code', async ({ mount }) => {
    const sfc = await mount(VuePreview)
    const expandBtn = await sfc.locator('.vue-preview__btns-item').nth(0)
    const copyIcon = await expandBtn.locator('.icon-copy')
    const copiedIcon = await expandBtn.locator('.icon-copied')
    await expect(await copyIcon.count()).toBe(1)
    await expect(await copiedIcon.count()).toBe(0)
    await copyIcon.click()
    await expect(await copyIcon.count()).toBe(0)
    await expect(await copiedIcon.count()).toBe(1)
  })

  test('collapse & expand', async ({ mount }) => {
    const sfc = await mount(VuePreview)
    const editorContainer = await sfc.locator('.editor-container')
    await expect(editorContainer).toBeHidden()
    const expandBtn = await sfc.locator('.vue-preview__btns-item').nth(1)
    await expandBtn.click()
    await expect(editorContainer).not.toBeHidden()
    await expandBtn.click()
    await expect(editorContainer).toBeHidden()
  })
})

test.describe('props', () => {
  test('default props', async ({ mount }) => {
    const sfc = await mount(VuePreview)
    const iframe = await sfc.frameLocator('iframe')

    // code: default code
    const iframeDiv = await iframe.getByText('Hi, vite-plugin-vue-preview !')
    await iframeDiv.waitFor()
    await expect(await iframeDiv.count()).toBe(1)

    // collapse: true
    const editor = await sfc.locator('.vue-preview__editor')
    await expect(await editor.count()).toBe(1)
    await expect(await editor.isHidden()).toBe(true)

    // ssr: false
    const outputContainer = await sfc.locator('.output-container')
    await expect(await outputContainer.getAttribute('data-ssr')).toBe('false')

    // outputBgColor: transparent
    const iframeBody = await iframe.locator('body')
    await expect(iframeBody).toHaveCSS('background-color', 'rgba(0, 0, 0, 0)')

    // justify: undefined; align: undefined
    const iframeApp = await iframe.locator('#app')
    await expect(iframeApp).toHaveCSS('display', 'block')
    await expect(iframeApp).toHaveCSS('justify-content', 'normal')
    await expect(iframeApp).toHaveCSS('align-items', 'normal')
  })

  test('pass props', async ({ mount }) => {
    const sfc = await mount(TestProps)
    const iframe = await sfc.frameLocator('iframe')

    // code: specified value
    const iframeDiv = await iframe.getByText('Hi, playwright test !')
    await iframeDiv.waitFor()
    await expect(await iframeDiv.count()).toBe(1)

    // collapse: false
    const editor = await sfc.locator('.vue-preview__editor')
    await expect(await editor.count()).toBe(1)
    await expect(await editor.isVisible()).toBe(true)

    // ssr: true
    const outputContainer = await sfc.locator('.output-container')
    await expect(await outputContainer.getAttribute('data-ssr')).toBe('true')

    // outputBgColor: red
    const iframeBody = await iframe.locator('body')
    await expect(iframeBody).toHaveCSS('background-color', 'rgb(255, 0, 0)')

    // justify: center; align: center
    const iframeApp = await iframe.locator('#app')
    await expect(iframeApp).toHaveCSS('display', 'flex')
    await expect(iframeApp).toHaveCSS('justify-content', 'center')
    await expect(iframeApp).toHaveCSS('align-items', 'center')
  })
})
