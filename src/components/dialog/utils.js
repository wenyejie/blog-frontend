export const dialogProps = {
  // 弹框标题
  title: {
    type: String,
    default: ''
  },
  // 展示内容
  content: {
    type: String,
    default: ''
  },
  // 弹框位置
  position: {
    type: String,
    default: 'center',
    validator: val => ['center'].includes(val)
  },
  // 弹窗宽度
  width: {
    type: [Number, String],
    default: ''
  },
  zIndex: {
    type: Number,
    default: 2001
  },
  // 是否拥有背景
  hasBackdrop: {
    type: Boolean,
    default: true
  },
  // 点击背景关闭
  backdropClose: {
    type: Boolean,
    default: ''
  },
  // 是否拥有头部
  hasHeader: {
    type: Boolean,
    default: true
  },
  // 是否拥有尾部
  hasFooter: {
    type: Boolean,
    default: true
  },
  hasCancel: {
    type: Boolean,
    default: true
  },
  hasOk: {
    type: Boolean,
    default: true
  },
  cancelLabel: {
    type: String,
    default: '取消'
  },
  okLabel: {
    type: String,
    default: '确定'
  },
  hasClose: {
    type: Boolean,
    default: true
  }
}
