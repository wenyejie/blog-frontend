import { defineComponent, ref, computed, reactive } from 'vue'
import { toNewDate } from 'wenyejie'

const defaultMonthList = [
  {
    cn: '一',
    month: 0
  },
  {
    cn: '二',
    month: 1
  },
  {
    cn: '三',
    month: 2
  },
  {
    cn: '四',
    month: 3
  },
  {
    cn: '五',
    month: 4
  },
  {
    cn: '六',
    month: 5
  },
  {
    cn: '七',
    month: 6
  },
  {
    cn: '八',
    month: 7
  },
  {
    cn: '九',
    month: 8
  },
  {
    cn: '十',
    month: 9
  },
  {
    cn: '十一',
    month: 10
  },
  {
    cn: '十二',
    month: 11
  }
]

export default defineComponent({
  name: 'SMonth',
  props: {
    modelValue: {
      type: Date
    }
  },
  emits: ['update:modelValue', 'change', 'switch'],
  setup(props, { emit }) {
    const innerDate = ref(toNewDate(props.modelValue))
    const viewDate = ref(toNewDate(props.modelValue))
    const monthList = reactive(defaultMonthList)

    const innerYear = computed(() => {
      return innerDate.value.getFullYear()
    })
    const innerMonth = computed(() => {
      return innerDate.value.getMonth()
    })

    const viewYear = computed(() => {
      return viewDate.value.getFullYear()
    })

    const handleClick = item => {
      const date = toNewDate(viewDate)
      date.setMonth(item.month)
      emit('update:modelValue', date)
    }

    return {
      monthList,
      innerYear,
      innerMonth,
      viewYear,
      handleClick
    }
  }
})
