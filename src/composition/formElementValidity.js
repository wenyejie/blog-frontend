import { computed, reactive, inject, onMounted } from 'vue'
import { hyphenate, isFunction } from 'wenyejie'

// interface FormElementValidity {
//   badInput?: boolean
//   customError?: boolean
//   patternMismatch?: boolean
//   rangeOverflow?: boolean
//   rangeUnderflow?: boolean
//   stepMismatch?: boolean
//   tooLong?: boolean
//   tooShort?: boolean
//   typeMismatch?: boolean
//   valid?: boolean
//   invalid?: boolean
//   valueMissing?: boolean
// }

const defaultValidity = {
  badInput: false,
  customError: false,
  patternMismatch: false,
  rangeOverflow: false,
  rangeUnderflow: false,
  stepMismatch: false,
  tooLong: false,
  tooShort: false,
  typeMismatch: false,
  valid: false,
  invalid: false,
  valueMissing: true
}

export default () => {
  const form = inject('sFormProvide', reactive({}))
  const formItem = inject('sFormItemProvide', reactive({}))

  const validity = reactive({ ...defaultValidity })

  const validityClasses = computed(() => {
    const result = {
      'is-invalid': !validity.valid
    }
    for (const key in validity) {
      if (validity[key]) {
        result['is-' + hyphenate(key)] = true
      }
    }

    return result
  })

  const updateValidity = (data = {}) => {
    for (const key in data) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore
      validity[key] = data[key]
    }
    validity.invalid = !validity.valid

    if (isFunction(formItem.updateValidity)) {
      formItem.updateValidity(validity)
    }

    if (isFunction(form.updateValidity)) {
      form.updateValidity(validity)
    }
  }

  return {
    validity,
    validityClasses,
    updateValidity
  }
}
