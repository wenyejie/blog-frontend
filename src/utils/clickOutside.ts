import { globalThis } from 'wenyejie'

const add = (callback: EventListenerOrEventListenerObject) => {
  setTimeout(() => {
    globalThis.addEventListener('click', callback, {
      once: true
    })
  }, 0)
}

const remove = (callback: EventListenerOrEventListenerObject) => {
  globalThis.removeEventListener('click', callback)
}

const clickOutside = (callback: EventListenerOrEventListenerObject, isAdd: boolean) => {
  if (isAdd) {
    add(callback)
  } else {
    remove(callback)
  }
}

clickOutside.add = add

clickOutside.remove = remove

export default clickOutside
