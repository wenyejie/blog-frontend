import marked from 'marked'
// import createDOMPurify from 'dompurify'
// import { globalThis } from 'wenyejie'

// const DOMPurify = createDOMPurify(globalThis)

interface Markdown2htmlOptions {
  [propName: string]: never
}

export const markdown2html = (markdown = '', options?: Markdown2htmlOptions) => {
  // return DOMPurify.sanitize(marked(markdown, options))
  return marked(markdown, options)
}

// 清除markdown中的错误或者是有恶意的html
export const markdownClean = (markdown: string) => {
  // return DOMPurify.sanitize(markdown)
  return markdown
}

export default markdown2html
