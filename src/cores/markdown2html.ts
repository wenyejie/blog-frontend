import marked from 'marked'
import createDOMPurify from 'dompurify'

let DOMPurify: any = null

export const markdown2html = (markdown: string, options?: any) => {
  if (DOMPurify === null) {
    DOMPurify = createDOMPurify(window)
  }
  return DOMPurify.sanitize(marked(markdown, options))
}

export default markdown2html
