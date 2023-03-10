import { createApp, defineAsyncComponent, h, ref } from 'vue'
import { dialogProps } from './utils'
import { cachedOne, ban } from 'wenyejie'

export const DialogConstruct = defineAsyncComponent(() =>
  import(/* webpackChunkName: 's-dialog' */ './dialog.vue')
)

const getRenderProps = that => {
  const props = {}
  for (const key in dialogProps) {
    props[key] = that[key]
  }
  return props
}

const getDataProps = () => {
  const props = {}
  for (const key in dialogProps) {
    props[key] = dialogProps[key]['default']
  }
  return props
}

const newInstance = opts => {
  const el = document.createElement('div')
  el.id = 's-dialog-wrap'
  document.body.appendChild(el)

  const data = Object.assign(getDataProps(), ban(opts, 'ok', 'cancel', 'close'))

  const app = createApp({
    data() {
      return data
    },
    setup() {
      const visible = ref(false)
      const handleOk = () => {
        opts.ok && opts.ok()
      }
      const handleCancel = () => {
        opts.cancel && opts.cancel()
      }
      const handleUpdateModelValue = value => {
        visible.value = value
      }
      return {
        handleUpdateModelValue,
        handleOk,
        handleCancel,
        visible
      }
    },
    render() {
      return h(
        DialogConstruct,
        Object.assign(
          {
            modelValue: this.visible,
            onOk: this.handleOk,
            onCancel: this.handleCancel,
            'onUpdate:modelValue': this.handleUpdateModelValue
          },
          getRenderProps(this)
        )
      )
    }
  }).mount(el)

  return {
    show(opts) {
      for (const key in opts) {
        app[key] = opts[key]
      }
      app.visible = true
    },
    close() {
      //
    }
  }
}

const getInstance = cachedOne(opts => newInstance(opts))

function dialog(content, opts) {
  opts.content = content
  return new Promise((resolve, reject) => {
    const vm = getInstance(opts)
    opts.ok = resolve
    opts.cancel = reject
    vm.show(opts)
  })
}

dialog.alert = function (content, opts = {}) {
  opts.hasCancel = false
  return dialog(content, opts)
}
dialog.confirm = function (content, opts = {}) {
  opts.hasCancel = true
  return dialog(content, opts)
}

dialog.prompt = function (content, opts = {}) {
  return dialog(content, opts)
}

export default dialog
