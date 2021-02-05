import { createApp, defineAsyncComponent, h, ref } from 'vue'
import { MessageProps, MessageTypes } from './type'

export const MessageConstructor = defineAsyncComponent(
  () => import(/* webpackChunkName: 's-message' */ './message.vue')
)

let instance: any

const newInstance = (opts: MessageProps) => {
  const el = document.createElement('div')
  el.id = 's-message-wrap'
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
      return h(MessageConstructor, {
        modelValue: this.visible,
        type: this.type,
        message: this.message,
        'onUpdate:modelValue': this.handleUpdateModelValue
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

const handleMessage = (message = '', opts: MessageProps = {}) => {
  opts.message = message
  return new Promise((resolve) => {
    const vm = getInstance(opts)
    opts.ok = resolve
    vm.show(opts)
  })
}

handleMessage.success = (message: string, opts: MessageProps = {}) => {
  opts.type = MessageTypes.SUCCESS
  return handleMessage(message, opts)
}
handleMessage.info = (message = '', opts: MessageProps = {}) => {
  opts.type = MessageTypes.INFO
  return handleMessage(message, opts)
}
handleMessage.danger = (message = '', opts: MessageProps = {}) => {
  opts.type = MessageTypes.DANGER
  return handleMessage(message, opts)
}
handleMessage.warning = (message = '', opts: MessageProps = {}) => {
  opts.type = MessageTypes.WARNING
  return handleMessage(message, opts)
}

export default handleMessage
