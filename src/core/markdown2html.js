import { marked } from 'marked'
// import createDOMPurify from 'dompurify'
// import { globalThis } from 'wenyejie'

// const DOMPurify = createDOMPurify(globalThis)

export const markdown2html = (markdown = '', options) => {
  // return DOMPurify.sanitize(marked(markdown, options))
  return marked(markdown, options)
}

// 清除markdown中的错误或者是有恶意的html
export const markdownClean = markdown => {
  // return DOMPurify.sanitize(markdown)
  return markdown
}

export default markdown2html
