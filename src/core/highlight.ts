import prismjs from 'prismjs'
import { nextTick } from 'vue'

export default () => {
  nextTick().then(() => {
    const $codes = document.querySelectorAll('code[class^="language-"]')
    $codes.forEach((item) => {
      ;(item.parentElement as HTMLPreElement).classList.add('line-numbers')
    })
    prismjs.highlightAll()
  })
}
