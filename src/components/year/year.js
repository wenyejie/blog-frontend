import { defineComponent, ref, computed, watch } from 'vue'
import { isDate, toNewDate } from 'wenyejie'

export default defineComponent({
  name: 'SYear',
  props: {
    modelValue: {
      type: Date
    }
  },
  emits: ['update:modelValue', 'change', 'switch'],
  setup(props, { emit }) {
    const innerDate = ref(toNewDate(props.modelValue))
    const viewDate = ref(toNewDate(props.modelValue))

    const handleSwitch = year => {
      viewDate.value.setFullYear(viewDate.value.getFullYear() + year)

      viewDate.value = toNewDate(viewDate.value)
    }

    const handleClick = year => {
      if (!isDate(innerDate.value)) {
        innerDate.value = toNewDate(viewDate.value)
      }
      innerDate.value.setFullYear(year)
      innerDate.value = toNewDate(innerDate.value)
      emit('update:modelValue', toNewDate(innerDate.value))
      emit('change', innerDate.value)
      emit('switch', 'month')
    }

    const year = computed(() => {
      return viewDate.value.getFullYear()
    })

    const innerYear = computed(() => {
      return isDate(innerDate.value) ? innerDate.value.getFullYear() : new Date().getFullYear()
    })

    const list = computed(() => {
      const year = Math.round(viewDate.value.getFullYear() / 10) * 10
      const years = []
      for (let i = 0; i < 10; i++) {
        years.push(year + i)
      }
      return years
    })

    watch(
      () => props.modelValue,
      val => {
        innerDate.value = toNewDate(val)
        viewDate.value = toNewDate(val)
      }
    )

    return {
      list,
      year,
      innerYear,
      handleSwitch,
      handleClick
    }
  }
})
