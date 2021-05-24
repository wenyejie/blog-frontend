import { defineComponent, computed, ref } from 'vue'
import { formEleDefProps } from '@/composition/formElement'
import formElementValidity from '@/composition/formElementValidity'

export default defineComponent({
  name: 'STextarea',
  props: {
    modelValue: {
      type: String,
      default: ''
    },
    block: Boolean,
    cols: Number,
    rows: Number,
    wrap: {
      type: String,
      validator: val => {
        return ['hard', 'sort'].includes(val)
      }
    },
    resize: {
      type: String,
      validator: val => {
        return ['none', 'both', 'horizontal', 'vertical'].includes(val)
      }
    },
    maxlength: [Number, String],
    minlength: [Number, String],
    ...formEleDefProps
  },
  emits: ['update:modelValue', 'input', 'change'],
  setup(props, { emit }) {
    const innerValue = ref('')
    const { validity, updateValidity, validityClasses } = formElementValidity()

    const classes = computed(() => {
      return {
        'is-block': props.block,
        ...validityClasses.value
      }
    })

    const textareaStyles = computed(() => {
      const result = {}
      if (props.resize) {
        result.resize = props.resize
      }
      return result
    })

    const handleInput = event => {
      updateValidity(event.target.validity)
      emit('update:modelValue', innerValue.value)
      emit('input')
    }

    const handleChange = () => {
      emit('change')
    }

    return {
      validity,
      innerValue,
      classes,
      textareaStyles,
      handleInput,
      handleChange
    }
  }
})
