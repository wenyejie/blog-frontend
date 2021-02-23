import { inBrowser } from 'wenyejie'
import type { ComponentPublicInstance, DirectiveBinding, ObjectDirective } from 'vue'

if (inBrowser()) {
  window.addEventListener('click', () => {})
}

const elHandler = (event: MouseEvent) => {
  // event.stopPropagation()
}

const ClickOutside: ObjectDirective = {
  beforeMount(el, binding) {
    el.addEventListener('click', elHandler)
    el.winHandler = () => {
      binding.value()
    }
    window.addEventListener('click', el.winHandler)
  },
  unmounted(el) {
    el.removeEventListener('click', elHandler)
    window.removeEventListener('click', el.winHandler)
    delete el.winHandler
  }
}

export default ClickOutside
