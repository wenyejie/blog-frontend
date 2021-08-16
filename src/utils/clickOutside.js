import { globalThis } from 'wenyejie'

const add = callback => {
  setTimeout(() => {
    globalThis.addEventListener('click', callback, {
      once: true
    })
  }, 0)
}

const remove = callback => {
  globalThis.removeEventListener('click', callback)
}

const clickOutside = (callback, isAdd) => {
  if (isAdd) {
    add(callback)
  } else {
    remove(callback)
  }
}

clickOutside.add = add

clickOutside.remove = remove

export default clickOutside
