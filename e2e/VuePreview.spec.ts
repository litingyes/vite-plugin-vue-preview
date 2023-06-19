import { expect, test } from '@playwright/experimental-ct-vue'
import TestBasic from './components/Basic.vue'

test.describe('basic', () => {
  test('mount successfully', async ({ mount }) => {
    const sfc = await mount(TestBasic)
    await expect(sfc).toHaveClass('vue-preview')
    await expect(sfc).toContainText('vite-plugin-vue-preview')
  })

  // test failure in chromium and expect PR
  test.skip('copy code', async ({ mount }) => {
    const sfc = await mount(TestBasic)
    const vuePreviewContainer = await sfc.locator('.vue-preview__container')
    const btns = await sfc.locator('.vue-preview__btns')
    await expect(btns).toBeHidden()
    await vuePreviewContainer.hover()
    await btns.waitFor()
    await expect(btns).toBeVisible()

    const copyBtn = await btns.locator('button').nth(0)
    const copiedBtn = await btns.locator('button').nth(1)
    await expect(copyBtn).toBeVisible()
    await expect(copiedBtn).toBeHidden()
    await copyBtn.click()
    await expect(copyBtn).toBeHidden()
    await expect(copiedBtn).toBeVisible()
  })

  test('collapse & expand', async ({ mount }) => {
    const sfc = await mount(TestBasic)
    const vuePreviewContainer = await sfc.locator('.vue-preview__container')
    const editor = await sfc.locator('.editor')
    await expect(editor).toBeVisible()
    await vuePreviewContainer.hover()
    const btns = await sfc.locator('.vue-preview__btns')
    await btns.waitFor()
    const collapseBtn = await btns.locator('button').nth(2)
    const expandBtn = await btns.locator('button').nth(3)
    await expect(collapseBtn).toBeVisible()
    await expect(expandBtn).toBeHidden()
    await collapseBtn.click()
    await expect(editor).toBeHidden()
    await expect(collapseBtn).toBeHidden()
    await expect(expandBtn).toBeVisible()
    await expandBtn.click()
    await expect(editor).toBeVisible()
    await expect(collapseBtn).toBeVisible()
    await expect(expandBtn).toBeHidden()
  })
})
