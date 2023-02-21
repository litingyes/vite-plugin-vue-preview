const start = '```vue preview'
const end = '```'

const getCode = (code: string) => {
  code = code.replace(start, '')
  code = code.replace(end, '')
  return ` <VuePreviewWrapper code="${code}"></VuePreviewWrapper>\n`
}

export default function VuePreviewPlugin() {
  return {
    name: 'vite-plugin-vue-preview',
    transform(code, id) {
      if (!id.endsWith('.md') || !new RegExp().test(code))
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
