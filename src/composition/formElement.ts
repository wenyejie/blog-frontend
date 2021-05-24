// size默认配置
export const propSizeOpts = {
  type: String,
  validator: (val: string) => {
    return ['large', 'small', 'mini'].includes(val)
  }
}

export const formEleDefProps = {
  name: String,
  title: String,
  disabled: Boolean,
  required: Boolean,
  readonly: Boolean,
  placeholder: String,
  autofocus: Boolean,
  autocomplete: {
    type: String,
    default: 'on',
    validator: (val: string) => {
      return ['on', 'off'].includes(val)
    }
  }
}
