const start = '```vue preview'
const end = '```'

function getCode(code: string) {
  code = code.match(/(?<=(```vue preview))(.)*(?=(```))/gims)![0].trim()
  if (!code.startsWith('<')) {
    const index = code.indexOf('<')
    const props = code.slice(0, index).trim()
    code = code.slice(index)
    const str = encodeURIComponent(code)
    return code.trim() ? `<VuePreview code="${str}" decode ssr ${props}></VuePreview>\n` : '<VuePreview ssr></VuePreview>\n'
  }
  const str = encodeURIComponent(code)
  return code.trim() ? `<VuePreview code="${str}" decode ssr></VuePreview>\n` : '<VuePreview ssr></VuePreview>\n'
}

export default function VuePreviewPlugin() {
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
        code = code.replace(str, getCode(str))
      }
      return code
    },
  }
}
