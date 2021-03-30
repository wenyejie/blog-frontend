import prismjs from 'prismjs'

export default () => {
  const $codes = document.querySelectorAll('code[class^="language-"]')
  $codes.forEach(item => {
    ;(item.parentElement as HTMLPreElement).classList.add('line-numbers')
  })
  prismjs.highlightAll()
}
