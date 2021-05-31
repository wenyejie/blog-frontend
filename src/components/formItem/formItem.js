import { defineComponent, inject, computed, provide, reactive } from 'vue'
import { propSizeOpts } from '@/composition/formElement'
import { isUndefined, toCSSUnit } from 'wenyejie'

export default defineComponent({
  name: 'SFormItem',
  props: {
    label: {
      type: [String, Boolean],
      default: ''
    },
    hasLabel: {
      type: [Boolean, undefined],
      default: undefined
    },
    labelWidth: {
      type: [Number, String]
    },
    size: propSizeOpts,
    message: String,
    showMessage: Boolean
  },
  setup(props, { slots }) {
    const form = inject('sFormProvide')
    const validity = reactive({})

    const innerHasLabel = computed(() => {
      return (
        props.label ||
        slots.label ||
        props.hasLabel ||
        (props.hasLabel === undefined && form.hasLabel)
      )
    })

    const innerLabelWidth = computed(() => {
      return props.labelWidth || form.labelWidth
    })

    const innerSize = computed(() => {
      if (props.size) {
        return props.size
      } else {
        return form.size
      }
    })

    const innerMessage = computed(() => {
      if (props.message) {
        return props.message
      }
      return ''
    })

    const innerShowMessage = computed(() => {
      if (isUndefined(props.showMessage)) {
        return form.showMessage
      }
      return props.showMessage || slots.message || innerMessage
    })

    const labelStyles = computed(() => {
      return {
        width: toCSSUnit(innerLabelWidth.value)
      }
    })

    const classes = computed(() => {
      return {
        [`in-${form.labelPosition}`]: !!form.labelPosition,
        [`is-${innerSize.value}`]: !!innerSize.value
      }
    })

    const updateValidity = data => {
      Object.assign(validity, data)
    }

    provide(
      'sFormItemProvide',
      reactive({
        updateValidity
      })
    )

    return {
      validity,
      classes,
      labelStyles,
      innerMessage,
      innerHasLabel,
      innerShowMessage
    }
  }
})
