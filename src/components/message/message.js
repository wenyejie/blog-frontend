import { createApp, defineAsyncComponent, h, ref } from 'vue'

export const MessageConstructor = defineAsyncComponent(() =>
  import(/* webpackChunkName: 's-message' */ './message.vue')
)

let instance = null

const newInstance = opts => {
  const el = document.createElement('div')
  el.id = 's-message-wrap'
  document.body.appendChild(el)

  const app = createApp({
    setup() {
      const visible = ref(false)
      const type = ref('info')
      const message = ref('')
      const useHtml = ref(false)
      const handleUpdateModelValue = value => {
        visible.value = value
        if (!value) {
          opts.ok && opts.ok()
        }
      }
      return {
        visible,
        type,
        message,
        useHtml,
        handleUpdateModelValue
      }
    },
    render() {
      return h(MessageConstructor, {
        modelValue: this.visible,
        type: this.type,
        message: this.message,
        'onUpdate:modelValue': this.handleUpdateModelValue
      })
    }
  }).mount(el)

  return {
    show(opts) {
      app.type = opts.type
      app.message = opts.message
      app.visible = true
    }
  }
}

const getInstance = opts => {
  instance = instance || newInstance(opts)
  return instance
}

const handleMessage = (message = '', opts = {}) => {
  opts.message = message
  return new Promise(resolve => {
    const vm = getInstance(opts)
    opts.ok = resolve
    vm.show(opts)
  })
}

handleMessage.success = (message, opts = {}) => {
  opts.type = 'success'
  return handleMessage(message, opts)
}
handleMessage.info = (message = '', opts = {}) => {
  opts.type = 'info'
  return handleMessage(message, opts)
}
handleMessage.danger = (message = '', opts = {}) => {
  opts.type = 'danger'
  return handleMessage(message, opts)
}
handleMessage.warning = (message = '', opts = {}) => {
  opts.type = 'warning'
  return handleMessage(message, opts)
}

export default handleMessage
