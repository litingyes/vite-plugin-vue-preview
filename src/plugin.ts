import type { Props } from './VuePreview.vue'

const start = '```vue preview'
const end = '```'

function getCode(code: string, options?: VuePreviewPluginOptions) {
  code = code.match(/(?<=(```vue preview))(.)*(?=(```))/gims)![0].trim()
  const str = encodeURIComponent(code)
  let expandProps = ''

  if (options?.props?.previewBodyStyle)
    expandProps += ` previewBodyStyle="${encodeURIComponent(JSON.stringify(options?.props?.previewBodyStyle))}"`
  if (options?.props?.previewAppStyle)
    expandProps += ` previewAppStyle="${encodeURIComponent(JSON.stringify(options?.props?.previewAppStyle))}"`

  return code.trim() ? `<VuePreview code="${str}" ${expandProps} encode ssr></VuePreview>\n` : '<VuePreview ssr></VuePreview>\n'
}

interface VuePreviewPluginOptions {
  props?: {
    previewBodyStyle?: Props['previewBodyStyle']
    previewAppStyle?: Props['previewAppStyle']
  }
}

export default function vuePreviewPlugin(options?: VuePreviewPluginOptions) {
  return {
    name: 'vite-plugin-vue-preview',
    transform(code: string, id: string) {
      if (!id.endsWith('.md') || !/```vue preview/i.test(code))
        return code
      let startIndex, endIndex
      while (/```vue preview/.test(code)) {
        startIndex = code.indexOf(start)
        endIndex = code.indexOf(end, startIndex + 1)
        const str = code.slice(startIndex, endIndex + 3)
        code = code.replace(str, getCode(str, options))
      }
      return code
    },
  }
}
