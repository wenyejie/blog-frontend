import { globalThis } from 'wenyejie'
interface ClickOutside {
  add(callback: EventListenerOrEventListenerObject): void
  remove(callback?: EventListenerOrEventListenerObject): void
}

// 点击外部
export const clickOutside: ClickOutside = {
  add: (callback: EventListenerOrEventListenerObject) => {
    setTimeout(() => {
      globalThis.addEventListener('click', callback, {
        once: true
      })
    })
  },
  remove: (callback: EventListenerOrEventListenerObject) => {
    globalThis.removeEventListener('click', callback)
  }
}

export default clickOutside
