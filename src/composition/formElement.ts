// size默认配置
export const propSizeOpts = {
  type: String,
  validator: (val: string) => {
    return ['large', 'small', 'mini'].includes(val)
  }
}

export const formEleDefProps = {
  name: String,
  disabled: Boolean,
  required: Boolean,
  readonly: Boolean,
  placeholder: {
    type: String,
    default: ''
  },
  autofocus: Boolean,
  autocomplete: {
    type: String,
    default: 'on',
    validator: (val: string) => {
      return ['on', 'off'].includes(val)
    }
  }
}
