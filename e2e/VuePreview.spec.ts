import { expect, test } from '@playwright/experimental-ct-vue'
import TestBasic from './components/Basic.vue'
import TestCssVars from './components/CssVars.vue'
import TestProps from './components/Props.vue'

test.describe.skip('basic', () => {
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

test.describe.skip('css', () => {
  test('default style of css vars', async ({ mount }) => {
    const sfc = await mount(TestBasic)
    const vuePreviewContainer = await sfc.locator('.vue-preview__container')
    const iframeContainer = await sfc.locator('.iframe-container')
    const editor = await sfc.locator('.editor')
    const btns = await sfc.locator('.vue-preview__btns')
    const copyBtn = await btns.locator('button').nth(0)

    // --vue-preview-radius: 8px;
    await expect(sfc).toHaveCSS('border-top-left-radius', '8px')
    await expect(sfc).toHaveCSS('border-top-right-radius', '8px')
    await expect(sfc).toHaveCSS('border-bottom-left-radius', '8px')
    await expect(sfc).toHaveCSS('border-bottom-right-radius', '8px')
    await expect(iframeContainer).toHaveCSS('border-top-left-radius', '8px')
    await expect(iframeContainer).toHaveCSS('border-top-right-radius', '8px')
    await expect(editor).toHaveCSS('border-bottom-left-radius', '8px')
    await expect(editor).toHaveCSS('border-bottom-right-radius', '8px')

    // --vue-preview-color-border
    await expect(iframeContainer).toHaveCSS('border-top-color', 'rgba(40, 44, 52, 0.1)')
    await expect(iframeContainer).toHaveCSS('border-bottom-color', 'rgba(40, 44, 52, 0.1)')
    await expect(iframeContainer).toHaveCSS('border-left-color', 'rgba(40, 44, 52, 0.1)')
    await expect(iframeContainer).toHaveCSS('border-right-color', 'rgba(40, 44, 52, 0.1)')

    // --vue-preview-box-shadow
    await expect(sfc).toHaveCSS('box-shadow', 'rgba(0, 0, 0, 0.1) 2px 4px 8px 4px')

    // --vue-preview-color-icon
    await expect(btns).toHaveCSS('color', 'rgb(40, 44, 52)')

    // --vue-preview-color-icon-bg-hover
    await expect(copyBtn).toHaveCSS('background-color', 'rgba(0, 0, 0, 0)')
    await vuePreviewContainer.hover()
    await copyBtn.hover()
    await expect(copyBtn).toHaveCSS('background-color', 'rgb(230, 238, 254)')

    // --vue-preview-color-model-bg
  })

  test('define style of css vars', async ({ mount }) => {
    const sfc = await mount(TestCssVars)
    const vuePreviewContainer = await sfc.locator('.vue-preview__container')
    const iframeContainer = await sfc.locator('.iframe-container')
    const editor = await sfc.locator('.editor')
    const btns = await sfc.locator('.vue-preview__btns')
    const copyBtn = await btns.locator('button').nth(0)

    // --vue-preview-radius: 8px;
    await expect(sfc).toHaveCSS('border-top-left-radius', '4px')
    await expect(sfc).toHaveCSS('border-top-right-radius', '4px')
    await expect(sfc).toHaveCSS('border-bottom-left-radius', '4px')
    await expect(sfc).toHaveCSS('border-bottom-right-radius', '4px')
    await expect(iframeContainer).toHaveCSS('border-top-left-radius', '4px')
    await expect(iframeContainer).toHaveCSS('border-top-right-radius', '4px')
    await expect(editor).toHaveCSS('border-bottom-left-radius', '4px')
    await expect(editor).toHaveCSS('border-bottom-right-radius', '4px')

    // --vue-preview-color-border
    await expect(iframeContainer).toHaveCSS('border-top-color', 'rgba(40, 44, 52, 0.2)')
    await expect(iframeContainer).toHaveCSS('border-bottom-color', 'rgba(40, 44, 52, 0.2)')
    await expect(iframeContainer).toHaveCSS('border-left-color', 'rgba(40, 44, 52, 0.2)')
    await expect(iframeContainer).toHaveCSS('border-right-color', 'rgba(40, 44, 52, 0.2)')

    // --vue-preview-box-shadow
    await expect(sfc).toHaveCSS('box-shadow', 'rgba(0, 0, 0, 0.2) 1px 2px 4px 2px')

    // --vue-preview-color-icon
    await expect(btns).toHaveCSS('color', 'rgb(68, 84, 116)')

    // --vue-preview-color-icon-bg-hover
    await expect(copyBtn).toHaveCSS('background-color', 'rgba(0, 0, 0, 0)')
    await vuePreviewContainer.hover()
    await copyBtn.hover()
    await expect(copyBtn).toHaveCSS('background-color', 'rgb(255, 255, 255)')

    // --vue-preview-color-model-bg
  })
})

test.describe('props', () => {
  test('default props', async ({ mount }) => {
    const sfc = await mount(TestBasic)
    const iframe = await sfc.frameLocator('iframe')

    // code
    const h1 = await iframe.locator('h1')
    await expect(h1).toHaveText('vite-plugin-vue-preview')
    const input = await iframe.locator('input')
    await expect(input).toHaveValue('vite-plugin-vue-preview')
  })

  test('define props', async ({ mount }) => {
    const sfc = await mount(TestProps)
    const iframe = await sfc.frameLocator('iframe')

    // code
    const h1 = await iframe.locator('h1')
    await expect(h1).toHaveText('test props')
    const input = await iframe.locator('input')
    await expect(input).toHaveValue('test props')

    // collapse
    const editor = await sfc.locator('.editor')
    await expect(editor).toBeHidden()
    const vuePreviewContainer = await sfc.locator('.vue-preview__container')
    await vuePreviewContainer.hover()
    const btns = await sfc.locator('.vue-preview__btns')
    await btns.waitFor()
    const expandBtn = await btns.locator('button').nth(3)
    await expandBtn.click()
    await expect(editor).toBeVisible()

    // previewBodyStyle
    const iframeBody = await iframe.locator('body')
    await expect(iframeBody).toHaveCSS('background-color', 'rgb(255, 0, 0)')

    // previewAppStyle
    const iframeApp = await iframe.locator('#app')
    await expect(iframeApp).toHaveCSS('background-color', 'rgb(255, 255, 0)')
  })
})
