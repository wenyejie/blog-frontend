import { createApp, defineAsyncComponent, h, ref } from 'vue'
import { DialogProps, DialogInstance } from '@/types/dialog'
import { dialogProps } from './utils'
import { AnyObject } from '@/statement'
import { cachedOne, ban } from 'wenyejie'

export const DialogConstruct = defineAsyncComponent(() =>
  import(/* webpackChunkName: 's-dialog' */ './dialog.vue')
)

const getRenderProps = (that: AnyObject) => {
  const props: AnyObject = {}
  for (const key in dialogProps) {
    props[key] = that[key]
  }
  return props
}

const getDataProps = () => {
  const props: AnyObject = {}
  for (const key in dialogProps) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    props[key] = dialogProps[key]['default']
  }
  return props
}

const newInstance = (opts: DialogProps): DialogInstance => {
  const el = document.createElement('div')
  el.id = 's-dialog-wrap'
  document.body.appendChild(el)

  const data = Object.assign(getDataProps(), ban(opts, 'ok', 'cancel', 'close'))

  const app: any = createApp({
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
      const handleUpdateModelValue = (value: boolean) => {
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
        // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
        // @ts-ignore
        app[key] = opts[key]
      }
      app.visible = true
    },
    close() {
      //
    }
  }
}

const getInstance = cachedOne((opts: DialogProps) => newInstance(opts))

function dialog(content: string, opts: DialogProps): Promise<void> {
  opts.content = content
  return new Promise((resolve, reject) => {
    const vm: DialogInstance = getInstance(opts)
    opts.ok = resolve
    opts.cancel = reject
    vm.show(opts)
  })
}

dialog.alert = function(content: string, opts: DialogProps = {}) {
  opts.hasCancel = false
  return dialog(content, opts)
}
dialog.confirm = function(content: string, opts: DialogProps = {}) {
  opts.hasCancel = true
  return dialog(content, opts)
}

dialog.prompt = function(content: string, opts: DialogProps = {}) {
  return dialog(content, opts)
}

export default dialog
