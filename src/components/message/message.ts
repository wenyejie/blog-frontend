import { createApp, defineAsyncComponent, h, ref } from 'vue'
import { MessageProps, MessageTypes } from './type'

const SMessage = () => import(/* webpackChunkName: 's-message' */ './message.vue')

let instance: any

const newInstance = (opts: MessageProps) => {
  const el = document.createElement('div')
  document.body.appendChild(el)

  const app: any = createApp({
    setup() {
      const visible = ref(false)
      const type = ref(MessageTypes.INFO)
      const message = ref('')
      const useHtml = ref(false)
      const handleUpdateModelValue = (value: boolean) => {
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
      console.log('render', this)
      return h(defineAsyncComponent(SMessage), {
        modelValue: this.visible,
        type: this.type,
        message: this.message,
        'update:modelValue': this.handleUpdateModelValue
      })
    }
  }).mount(el)

  // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
  // @ts-ignore
  console.log(app, app.visible)

  return {
    show(opts: MessageProps) {
      app.type = opts.type
      app.message = opts.message
      app.visible = true
    }
  }
}

const getInstance = (opts: MessageProps) => {
  instance = instance || newInstance(opts)
  return instance
}

const initInstance = (message = '', opts: MessageProps = {}) => {
  opts.message = message
  return new Promise((resolve) => {
    const vm = getInstance(opts)
    opts.ok = resolve
    vm.show(opts)
  })
}

SMessage.success = (message = '', opts: MessageProps = {}) => {
  opts.type = MessageTypes.SUCCESS
  return initInstance(message, opts)
}
SMessage.info = (message = '', opts: MessageProps = {}) => {
  opts.type = MessageTypes.INFO
  return initInstance(message, opts)
}
SMessage.danger = (message = '', opts: MessageProps = {}) => {
  opts.type = MessageTypes.DANGER
  return initInstance(message, opts)
}
SMessage.warning = (message = '', opts: MessageProps = {}) => {
  opts.type = MessageTypes.WARNING
  return initInstance(message, opts)
}

export default SMessage
