import { defineComponent, provide, reactive, ref, toRefs } from 'vue'
import { propSizeOpts } from '@/composition/formElement'
// import { removeItemByProp } from 'wenyejie'

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

    // 表单组件
    const formComponents = []

    const checkValidity = () => {
      return refForm.value.checkValidity()
    }

    const handleSubmit = event => {
      emit('submit', event)
      event.preventDefault()
    }

    const addFormComponent = component => {
      formComponents.push(component)
    }

    const removeFormComponent = () => {
      // console.log(component, formComponents)
      // removeItemByProp(formComponents, '_uid', )
    }

    const reset = () => {
      refForm.value.reset()
    }

    provide(
      'sFormProvide',
      reactive({
        ...toRefs(props),
        addFormComponent,
        removeFormComponent
      })
    )

    return {
      handleSubmit,
      checkValidity,
      refForm,
      reset
    }
  }
})
