// 弹窗位置
export enum DialogPosition {
  CENTER = 'center',
  TOP = 'top',
  TOP_CENTER = 'top-center',
  TOP_START = 'top-start',
  TOP_END = 'top-end',
  LEFT = 'left',
  LEFT_CENTER = 'left-center',
  LEFT_START = 'left-start',
  LEFT_END = 'left-end',
  BOTTOM = 'bottom',
  BOTTOM_CENTER = 'bottom-center',
  BOTTOM_START = 'bottom-start',
  BOTTOM_END = 'bottom-end',
  RIGHT = 'right',
  RIGHT_CENTER = 'right-center',
  RIGHT_START = 'right-start',
  RIGHT_END = 'right-end'
}

// 弹窗实例
export interface DialogInstance {
  show(opts: DialogProps): void
  close(): void
}

// 弹窗属性
export interface DialogProps {
  // 标题
  title?: string
  // 内容
  content?: string
  // 位置
  position?: DialogPosition
  // 宽度
  width?: number | string
  // z-index
  zIndex?: number
  // 是否有背景
  hasBackdrop?: boolean
  // 点击背景关闭
  backdropClose?: boolean
  // 是否有头部
  hasHeader?: boolean
  // 是否有取消
  hasCancel?: boolean
  // 是否有尾部
  hasFooter?: boolean
  // 是否有关闭
  hasClose?: boolean
  // 取消文本
  cancelLabel?: string
  // 是否有确定
  hasOk?: boolean
  // 确定文本
  okLabel?: string
  // 确定回调
  ok?(): void
  // 取消回调
  cancel?(): void
  // 关闭回调
  close?(): void
  // 销毁回调
  destroy?(): void
}
