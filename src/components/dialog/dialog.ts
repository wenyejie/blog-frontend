import { render, createVNode } from 'vue'
import { isString } from 'wenyejie'
import DialogConstructor from './message.vue'

const instances = []

const Dialog = function (opts: any = {}) {
  if (isString(opts)) {
    opts = {}
    opts.message = opts
    opts.type = 'info'
  }

  const options = opts

  const container = document.createElement('div')

  const vm = createVNode(DialogConstructor, options)

  // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
  // @ts-ignore
  vm.props.onDestroy = () => {
    render(null, container)
  }

  render(vm, container)

  instances.push({ vm })
  // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
  // @ts-ignore
  document.body.appendChild(container.firstElementChild)

  return {
    close: () => {
      // vm?.component?.proxy?.visible = false
      console.log('close')
    }
  }
}

Dialog.info = (options: any) => {
  return Dialog(options)
}

export default Dialog
