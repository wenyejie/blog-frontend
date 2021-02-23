interface ClickOutside {
  add(callback: EventListenerOrEventListenerObject): void
  remove(callback?: EventListenerOrEventListenerObject): void
}

// 点击外部
export const clickOutside: ClickOutside = {
  add: (callback: EventListenerOrEventListenerObject) => {
    setTimeout(() => {
      window.addEventListener('click', callback, {
        once: true
      })
    })
  },
  remove: (callback: EventListenerOrEventListenerObject) => {
    window.removeEventListener('click', callback)
  }
}

export default clickOutside
