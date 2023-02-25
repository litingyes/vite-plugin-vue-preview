const start = '```vue preview'
const end = '```'

const getCode = (code: string) => {
  code = code.match(/(?<=(```vue preview))(.)*(?=(```))/gims)![0]
  const str = encodeURIComponent(code.trim())
  return code.trim() ? `<VuePreview code="${str}" decode></VuePreview>\n` : '<VuePreview></VuePreview>\n'
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
