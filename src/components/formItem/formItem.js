import { defineComponent, inject, computed, ref } from 'vue'
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
    const formLabelWidth = inject('formLabelWidth', ref(''))
    const formLabelPosition = inject('formLabelPosition', ref(''))
    const formSize = inject('formSize', ref(''))
    const formHasLabel = inject('formHasLabel', ref(''))
    const formShowMessage = inject('formShowMessage', ref(false))

    const innerHasLabel = computed(() => {
      return (
        props.label ||
        slots.label ||
        props.hasLabel ||
        (props.hasLabel === undefined && formHasLabel.value)
      )
    })

    const innerLabelWidth = computed(() => {
      return props.labelWidth || formLabelWidth.value
    })

    const innerSize = computed(() => {
      if (props.size) {
        return props.size
      } else {
        return formSize.value
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
        return formShowMessage.value
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
        [`in-${formLabelPosition.value}`]: !!formLabelPosition.value,
        [`is-${innerSize.value}`]: !!innerSize.value
      }
    })

    return {
      classes,
      labelStyles,
      innerMessage,
      innerHasLabel,
      innerShowMessage
    }
  }
})
