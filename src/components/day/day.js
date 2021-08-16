import { computed, defineComponent, reactive, ref, watch } from 'vue'
import { getMonthList } from './utils.js'
import { padStart, toNewDate } from 'wenyejie'

export default defineComponent({
  name: 'SDay',
  props: {
    modelValue: {
      type: Date
    },
    // 选择模式, 'day', 'week'
    mode: {
      type: String,
      default: 'day'
    }
  },
  emits: ['update:modelValue', 'change', 'switch'],
  setup(props, { emit }) {
    const innerDate = ref(toNewDate(props.modelValue))
    const innerView = ref(toNewDate(props.modelValue))

    const weeks = reactive([
      { value: 0, label: '日' },
      { value: 1, label: '一' },
      { value: 2, label: '二' },
      { value: 3, label: '三' },
      { value: 4, label: '四' },
      { value: 5, label: '五' },
      { value: 6, label: '六' }
    ])

    const viewYear = computed(() => {
      return innerView.value.getFullYear()
    })

    const viewMonth = computed(() => {
      return padStart(innerView.value.getMonth() + 1)
    })

    const list = computed(() => {
      return getMonthList(innerView.value, {
        now: innerDate.value
      })
    })

    const handleSwitch = (year, month = 0) => {
      const date = innerView.value

      date.setFullYear(date.getFullYear() + year)
      date.setMonth(date.getMonth() + month)

      innerView.value = toNewDate(date)
    }

    const handleSwitchYear = () => {
      emit('switch', 'year')
    }

    const handleSwitchMonth = () => {
      emit('switch', 'month')
    }

    const handleClick = item => {
      innerDate.value.setFullYear(item.year)
      innerDate.value.setMonth(item.month)
      innerDate.value.setDate(item.day)
      innerDate.value = toNewDate(innerDate.value)

      emit('update:modelValue', toNewDate(innerDate.value))
      emit('change', toNewDate(innerDate.value))
    }

    watch(
      () => props.modelValue,
      val => {
        innerDate.value = toNewDate(val)
        innerView.value = toNewDate(val)
      }
    )

    return {
      innerDate,
      innerView,
      viewYear,
      viewMonth,
      weeks,
      list,
      handleSwitch,
      handleSwitchYear,
      handleSwitchMonth,
      handleClick
    }
  }
})
