<template>
  <div class="s-checkbox-group"><slot /></div>
</template>

<script>
import { defineComponent, watch, ref, provide } from 'vue'
import { removeVal } from 'wenyejie'
export default defineComponent({
  name: 'SCheckboxGroup',
  props: {
    modelValue: {
      type: Array,
      default: () => []
    }
  },
  emits: ['update:modelValue', 'change'],
  setup(props, { emit }) {
    const innerValue = ref([])
    const handleChange = () => {
      emit('update:modelValue', innerValue.value)
      emit('change', innerValue.value)
    }
    const addValue = value => {
      innerValue.value.push(value)
      handleChange()
    }
    const removeValue = value => {
      removeVal(innerValue.value, value)
      handleChange()
    }

    provide('checkboxIsGroup', true)
    provide('checkboxValue', innerValue)
    provide('checkboxAddValue', addValue)
    provide('checkboxRemoveValue', removeValue)

    watch(
      () => props.modelValue,
      value => {
        innerValue.value = value
      }
    )
  }
})
</script>
