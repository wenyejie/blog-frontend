import { defineComponent, ref, computed, watch, reactive } from 'vue'
import { isDate, isSameYear } from 'wenyejie'

export default defineComponent({
  name: 'SMonth',
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
    const monthCNs = reactive([
      '一',
      '二',
      '三',
      '四',
      '五',
      '六',
      '七',
      '八',
      '九',
      '十',
      '十一',
      '十二'
    ])
    const list = ref([])
    const handleSwitch = year => {
      viewDate.value.setFullYear(viewDate.value.getFullYear() + year)

      viewDate.value = new Date(viewDate.value)
    }

    const generateList = () => {
      const months = []
      for (let i = 0; i < 12; i++) {
        months.push(i)
      }
      list.value = months
    }

    const handleClick = month => {
      viewDate.value.setMonth(month)
      innerDate.value = new Date(viewDate.value)
      emit('update:modelValue', innerDate.value)
      emit('change', innerDate.value)
      emit('switch', 'day')
    }

    const year = computed(() => {
      return viewDate.value.getFullYear()
    })

    const month = computed(() => {
      return viewDate.value.getMonth()
    })

    const innerYear = computed(() => {
      return isDate(props.modelValue) ? props.modelValue.getFullYear() : 0
    })

    watch(() => props.viewValue, generateList, {
      immediate: true,
      deep: true
    })

    watch(() => props.modelValue, generateList, {
      immediate: true,
      deep: true
    })

    return {
      list,
      month,
      year,
      innerYear,
      monthCNs,
      handleSwitch,
      handleClick
    }
  }
})
