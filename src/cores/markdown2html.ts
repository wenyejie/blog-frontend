import marked from 'marked'
import createDOMPurify from 'dompurify'

/**
 * @author: Storm
 * @date: 2021/01/21
 * @email: wenyejie@foxmail.com
 */

let DOMPurify: any = null

export const markdown2html = (markdown: string, options?: any) => {
  if (DOMPurify === null) {
    DOMPurify = createDOMPurify(window)
  }
  return DOMPurify.sanitize(marked(markdown, options))
}

export default markdown2html
