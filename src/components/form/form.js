import { defineComponent, provide, ref } from 'vue'
import { propSizeOpts } from '@/composition/formElement'

export default defineComponent({
  name: 'SForm',
  props: {
    labelWidth: {
      type: [String, Number],
      default: 'auto'
    },
    labelPosition: {
      type: String,
      default: 'left',
      validator: val => {
        return ['left', 'right', 'top'].includes(val)
      }
    },
    name: String,
    hasLabel: {
      type: Boolean,
      default: true
    },
    size: propSizeOpts,
    inline: Boolean,
    showMessage: Boolean
  },
  emits: ['submit'],
  setup(props, { emit }) {
    const refForm = ref()

    const handleSubmit = event => {
      emit('submit', event)
      event.preventDefault()
    }

    const checkValidity = () => {
      return refForm.value.checkValidity()
    }

    provide('formLabelWidth', ref(props.labelWidth))
    provide('formLabelPosition', ref(props.labelPosition))
    provide('formSize', ref(props.size))
    provide('formHasLabel', ref(props.hasLabel))
    provide('formShowMessage', ref(props.showMessage))

    return {
      handleSubmit,
      checkValidity,
      refForm
    }
  }
})
