import marked from 'marked'
import createDOMPurify from 'dompurify'

const DOMPurify = createDOMPurify(window)

interface Markdown2htmlOptions {
  [propName: string]: never
}

export const markdown2html = (markdown = '', options?: Markdown2htmlOptions) => {
  return DOMPurify.sanitize(marked(markdown, options))
}

// 清除markdown中的错误或者是有恶意的html
export const markdownClean = (markdown: string) => {
  return DOMPurify.sanitize(markdown)
}

export default markdown2html
