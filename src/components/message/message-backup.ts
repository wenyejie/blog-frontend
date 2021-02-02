import { h, render } from 'vue'
import SMessage from './message.vue'
import { isString } from 'wenyejie'

const messageInstance = new Map()

const initInstance = (props: any, container: HTMLElement) => {
  const vNode = h(SMessage, props)
  render(vNode, container)
  document.body.appendChild(container.firstElementChild as HTMLElement)
  return vNode.component as any
}

const genContainer = () => {
  return document.createElement('div')
}

const showMessage = (options: any) => {
  const container = genContainer()

  const instance = initInstance(options, container)

  // This is how we use message box programmably.
  // Maybe consider releasing a template version?
  // get component instance like v2.
  const vm = instance.proxy

  // Adding destruct method.
  // when transition leaves emitting `vanish` evt. so that we can do the clean job.
  options.onDestroy = () => {
    // not sure if this causes mem leak, need proof to verify that.
    // maybe calling out like 1000 msg-box then close them all.
    render(null, container)
    debugger
    messageInstance.delete(vm) // Remove vm to avoid mem leak.
    // here we were suppose to call document.body.removeChild(container.firstElementChild)
    // but render(null, container) did that job for us. so that we do not call that directly
  }

  options.onAction = (action: any) => {
    const currentMsg = messageInstance.get(vm)
    let resolve
    if (options.showInput) {
      resolve = { value: vm.state.inputValue, action }
    } else {
      resolve = action
    }
    if (options.callback) {
      options.callback(resolve, instance.proxy)
    } else {
      if (action === 'cancel' || action === 'close') {
        if (options.distinguishCancelAndClose && action !== 'cancel') {
          currentMsg.reject('close')
        } else {
          currentMsg.reject('cancel')
        }
      } else {
        currentMsg.resolve(resolve)
      }
    }
  }

  instance.slots.default = () => [options.message]
  // change visibility after everything is settled
  vm.visible = true
  return vm
}

function initMessage(message: string, options: any = {}) {
  let callback: any = null
  if (isString(message)) {
    options.message = message
  } else {
    callback = options.callback
  }

  return new Promise((resolve, reject) => {
    const vm = showMessage(options)
    // collect this vm in order to handle upcoming events.
    messageInstance.set(vm, {
      options,
      callback,
      resolve,
      reject
    })
  })
}

SMessage.base = initMessage

SMessage.success = (message: string, options: any = {}) => {
  options.type = 'info'
  return initMessage(message, options)
}

export default SMessage
