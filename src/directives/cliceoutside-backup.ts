import { inBrowser } from 'wenyejie'
import type { ComponentPublicInstance, DirectiveBinding, ObjectDirective } from 'vue'

type DocumentHandler = <T extends MouseEvent>(mouseup: T, mousedown: T) => void

type FlushList = Map<
  HTMLElement,
  {
    documentHandler: DocumentHandler
    bindingFn: (...args: unknown[]) => unknown
  }
>

declare type Nullable<T> = T | null

/* istanbul ignore next */
const on = function (
  element: HTMLElement | Document | Window,
  event: string,
  handler: EventListenerOrEventListenerObject,
  useCapture = false
): void {
  if (element && event && handler) {
    element.addEventListener(event, handler, useCapture)
  }
}

const nodeList: FlushList = new Map()

let startClick: MouseEvent

if (inBrowser()) {
  // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
  // @ts-ignore
  on(document, 'mousedown', (e: MouseEvent) => (startClick = e))
  // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
  // @ts-ignore
  on(document, 'mouseup', (e: MouseEvent) => {
    for (const { documentHandler } of nodeList.values()) {
      documentHandler(e, startClick)
    }
  })
}

function createDocumentHandler(el: HTMLElement, binding: DirectiveBinding): DocumentHandler {
  let excludes: HTMLElement[] = []
  if (Array.isArray(binding.arg)) {
    excludes = binding.arg
  } else {
    // due to current implementation on binding type is wrong the type casting is necessary here
    excludes.push((binding.arg as unknown) as HTMLElement)
  }
  return function (mouseup, mousedown) {
    const popperRef = (binding.instance as ComponentPublicInstance<{
      popperRef: Nullable<HTMLElement>
    }>).popperRef
    const mouseUpTarget = mouseup.target as Node
    const mouseDownTarget = mousedown.target as Node
    const isBound = !binding || !binding.instance
    const isTargetExists = !mouseUpTarget || !mouseDownTarget
    const isContainedByEl = el.contains(mouseUpTarget) || el.contains(mouseDownTarget)
    const isSelf = el === mouseUpTarget

    const isTargetExcluded =
      (excludes.length && excludes.some((item) => item?.contains(mouseUpTarget))) ||
      (excludes.length && excludes.includes(mouseDownTarget as HTMLElement))
    const isContainedByPopper =
      popperRef && (popperRef.contains(mouseUpTarget) || popperRef.contains(mouseDownTarget))
    if (
      isBound ||
      isTargetExists ||
      isContainedByEl ||
      isSelf ||
      isTargetExcluded ||
      isContainedByPopper
    ) {
      return
    }
    binding.value()
  }
}

const ClickOutside: ObjectDirective = {
  beforeMount(el, binding) {
    nodeList.set(el, {
      documentHandler: createDocumentHandler(el, binding),
      bindingFn: binding.value
    })
  },
  updated(el, binding) {
    nodeList.set(el, {
      documentHandler: createDocumentHandler(el, binding),
      bindingFn: binding.value
    })
  },
  unmounted(el) {
    nodeList.delete(el)
  }
}

export default ClickOutside
