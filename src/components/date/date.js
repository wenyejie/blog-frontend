import { defineComponent, ref, watch } from 'vue'
import SDay from '../day'
import SYear from '../year'
import SMonth from '../month'

export default defineComponent({
  name: 'SDate',
  components: { SDay, SYear, SMonth },
  props: {
    modelValue: {
      type: Date
    },
    viewValue: {
      type: Date,
      default: () => new Date()
    }
  },
  emits: ['update:modelValue', 'change'],
  setup(props, { emit }) {
    const innerDate = ref(props.modelValue)
    const viewDate = ref(props.viewValue)
    const innerMode = ref('day')

    const handleChange = () => {
      emit('update:modelValue', innerDate.value)
      emit('change', innerDate.value)
    }

    const handleSwitch = mode => {
      innerMode.value = mode
    }

    watch(
      () => props.modelValue,
      val => {
        innerDate.value.vlaue = val
      }
    )

    return {
      innerDate,
      innerMode,
      viewDate,
      handleChange,
      handleSwitch
    }
  }
})
