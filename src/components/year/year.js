import { defineComponent, ref, computed, watch } from 'vue'
import { isDate } from 'wenyejie'

export default defineComponent({
  name: 'SYear',
  props: {
    modelValue: {
      type: Date
    },
    viewValue: {
      type: Date,
      default: () => new Date()
    }
  },
  emits: ['update:modelValue', 'change', 'switch'],
  setup(props, { emit }) {
    const innerDate = ref(props.modelValue)
    const viewDate = ref(props.viewValue)
    const list = ref([])
    const handleSwitch = year => {
      viewDate.value.setFullYear(viewDate.value.getFullYear() + year)

      viewDate.value = new Date(viewDate.value)
    }

    const generateList = () => {
      const year = Math.round(viewDate.value.getFullYear() / 10) * 10
      const years = []
      for (let i = 0; i < 10; i++) {
        years.push(year + i)
      }
      list.value = years
    }

    const handleClick = year => {
      innerDate.value.setFullYear(year)
      innerDate.value = new Date(innerDate.value)
      emit('update:modelValue', innerDate.value)
      emit('change', innerDate.value)
      emit('switch', 'month')
    }

    const year = computed(() => {
      return Math.round(viewDate.value.getFullYear() / 10) * 10
    })

    const innerYear = computed(() => {
      return isDate(props.modelValue) ? props.modelValue.getFullYear() : 0
    })

    watch(() => props.viewValue, generateList, {
      immediate: true,
      deep: true
    })

    return {
      list,
      year,
      innerYear,
      handleSwitch,
      handleClick
    }
  }
})
