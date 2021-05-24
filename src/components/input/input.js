import { defineComponent, computed, ref, watch } from 'vue'
import { propSizeOpts, formEleDefProps } from '@/composition/formElement'
import formElementValidityState from '@/composition/formElementValidity'
import SIcon from '../icon'
import { isRegExp } from 'wenyejie'

const CLS_NAME = 's-input'

export default defineComponent({
  name: 'SInput',
  components: { SIcon },
  props: {
    modelValue: {
      type: [String, Number]
    },
    type: {
      type: String,
      default: 'text',
      validator: val => {
        return ['text', 'password', 'number', 'tel', 'email'].includes(val)
      }
    },
    minlength: [Number, String],
    maxlength: [Number, String],
    pattern: [String, RegExp],
    // 后缀icon
    suffixIcon: String,
    // 前缀icon
    prefixIcon: String,
    size: propSizeOpts,
    ...formEleDefProps
  },
  emits: ['update:modelValue', 'input', 'change', 'suffixClick', 'enter'],
  setup(props, { emit, slots }) {
    const { updateValidity, validity, validityClasses } = formElementValidityState()

    console.log(validityClasses)

    const classes = computed(() => [
      CLS_NAME,
      {
        'is-disabled': props.disabled,
        'has-suffix': slots.suffix || props.suffixIcon,
        [`${CLS_NAME}--${props.size}`]: !!props.size,
        ...validityClasses.value
      }
    ])

    const innerPattern = computed(() => {
      if (isRegExp(props.pattern)) {
        return props.pattern.toString().replace(/(^\/)|(\/$)/g, '')
      }
      return props.pattern
    })

    const innerValue = ref(props.modelValue)
    const refInput = ref()

    watch(
      () => props.modelValue,
      value => {
        innerValue.value = value
      }
    )

    const handleInput = event => {
      updateValidity(refInput.value.validity)
      console.log(validity)
      emit('update:modelValue', innerValue.value)
      emit('input', event)
    }

    const handleChange = event => {
      emit('change', event)
    }

    const handleSuffixClick = event => {
      emit('suffixClick', event)
    }

    const handleEnter = event => {
      emit('enter', event)
    }

    return {
      validity,
      refInput,
      innerPattern,
      innerValue,
      handleInput,
      handleChange,
      handleSuffixClick,
      handleEnter,
      classes,
      CLS_NAME
    }
  }
})
