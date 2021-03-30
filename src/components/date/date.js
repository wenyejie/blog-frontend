import { defineComponent, reactive, ref } from 'vue'
import { getMonthDayList } from './utils.js'
import { isDate, isSameMonth } from 'wenyejie'

export default defineComponent({
  name: 'SDate',
  props: {
    modelValue: {
      type: Date
    },
    hasSwitch: {
      type: Boolean,
      default: true
    },
    format: {
      type: String,
      default: 'yyyy-MM-dd'
    },
    weeks: {
      type: Array,
      default: () => [
        { value: 0, label: '日' },
        { value: 1, label: '一' },
        { value: 2, label: '二' },
        { value: 3, label: '三' },
        { value: 4, label: '四' },
        { value: 5, label: '五' },
        { value: 6, label: '六' }
      ]
    },
    defaultValue: {
      type: Date,
      default: () => new Date()
    }
  },
  emits: ['update:modelValue', 'change'],
  setup(props, { emit }) {
    const viewDate = ref(isDate(props.modelValue) ? props.modelValue : props.defaultValue)
    const innerDate = ref(viewDate.value)
    const days = ref([])

    const innerYear = ref('')
    const innerMonth = ref('')

    // 生成天数
    const generateDays = () => {
      days.value = getMonthDayList(viewDate.value, props.modelValue)
      innerYear.value = viewDate.value.getFullYear()
      innerMonth.value = viewDate.value.getMonth()
      if (isSameMonth(viewDate.value, props.modelValue || null)) {
        const item = days.value.find(
          item => item.current && item.value === props.modelValue.getDate()
        )

        if (item) {
          item.selected = true
        }
      }
    }

    // 切换年月
    const handleSwitch = (year = 0, month = 0) => {
      viewDate.value.setFullYear(
        viewDate.value.getFullYear() + year,
        viewDate.value.getMonth() + month,
        1
      )
      generateDays()
    }

    // 点击天数
    const handleClickDay = item => {
      const date = new Date(viewDate.value)
      if (item.current) {
        date.setDate(item.value)
      } else if (item.prev) {
        date.setMonth(date.getMonth() - 1, item.value)
      } else if (item.next) {
        date.setMonth(date.getMonth() + 1, item.value)
      }
      days.value.forEach(item => {
        item.forEach(subitem => (subitem.selected = false))
      })
      item.selected = true
      innerDate.value = date
      console.log(days)
      emit('update:modelValue', innerDate.value)
      emit('change', innerDate.value)
    }

    generateDays()

    return {
      days,
      innerDate,
      innerYear,
      innerMonth,
      handleSwitch,
      handleClickDay
    }
  }
})
