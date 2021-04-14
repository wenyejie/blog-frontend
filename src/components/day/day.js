import { computed, defineComponent, reactive, ref, watch } from 'vue'
import { getMonthList } from './utils.js'
import { isSameMonth } from 'wenyejie'

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
    const weeks = reactive([
      { value: 0, label: '日' },
      { value: 1, label: '一' },
      { value: 2, label: '二' },
      { value: 3, label: '三' },
      { value: 4, label: '四' },
      { value: 5, label: '五' },
      { value: 6, label: '六' }
    ])

    // 检查是否为活动状态
    const checkActive = () => {
      if (isSameMonth(props.modelValue, props.modelValue || null)) {
        const item = list.value.find(
          item => item.current && item.value === props.modelValue.getDate()
        )

        if (item) {
          item.active = true
        }
      }
    }

    // 生成天数列表
    const generateList = () => {
      list.value = getMonthList(props.viewValue, {
        now: props.modelValue
      })

      checkActive()
    }

    // 点击天数
    const handleClick = item => {
      const date = new Date()
      date.setFullYear(item.year, item.month, item.day)
      list.value.forEach(item => {
        item.forEach(subitem => (subitem.active = false))
      })
      item.active = true
      innerDate.value = date
      emit('update:modelValue', innerDate.value)
      emit('change', innerDate.value)
    }

    // 切换年月
    const handleSwitch = (year = 0, month = 0) => {
      viewDate.value.setFullYear(
        viewDate.value.getFullYear() + year,
        viewDate.value.getMonth() + month,
        1
      )

      viewDate.value = new Date(viewDate.value)
    }

    const handleSwitchYear = () => {
      emit('switch', 'year')
    }

    const handleSwitchMonth = () => {
      emit('switch', 'month')
    }

    const year = computed(() => viewDate.value.getFullYear())
    const month = computed(() => viewDate.value.getMonth())

    watch(() => props.viewValue, generateList, {
      immediate: true,
      deep: true
    })

    watch(() => props.modelValue, checkActive, {
      deep: true
    })

    return {
      year,
      month,
      weeks,
      list,
      handleClick,
      handleSwitch,
      handleSwitchYear,
      handleSwitchMonth
    }
  }
})
