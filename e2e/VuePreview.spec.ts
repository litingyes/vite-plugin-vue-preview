import { expect, test } from '@playwright/experimental-ct-vue'
import { VuePreview } from '../src'

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
