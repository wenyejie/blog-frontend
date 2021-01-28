import prismjs from 'prismjs'
import { nextTick } from 'vue'

export default () => {
  nextTick().then(() => {
    prismjs.highlightAll()
  })
}
