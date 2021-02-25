<template>
  <label class="s-checkbox">
    <input
      type="checkbox"
      :readonly="readonly"
      :disabled="disabled"
      :required="required"
      :autofocus="autofocus"
      :name="name"
      v-model="innerValue"
      @change="handleChange"
      class="s-checkbox--inner"
    />
    <span class="s-checkbox--indicate"></span>
    <span class="s-checkbox--label"
      ><slot>{{ label }}</slot></span
    >
  </label>
</template>

<script lang="ts">
import { defineComponent, ref, watch, inject } from 'vue'
import { formEleDefProps } from '@/composition/formElement'
import { noop } from 'wenyejie'

const valueType = [Number, String, Boolean]

export default defineComponent({
  name: 'SCheckbox',
  props: {
    modelValue: {
      type: valueType,
      default: false
    },
    value: valueType,
    trueValue: {
      type: valueType,
      default: true
    },
    falseValue: {
      type: valueType,
      default: false
    },
    label: {
      type: String,
      default: ''
    },
    ...formEleDefProps
  },
  emits: ['update:modelValue', 'change'],
  setup(props, { emit }) {
    const checkboxIsGroup = inject('checkboxIsGroup', false)
    const checkboxValue = inject('checkboxValue', ref([]))
    const checkboxAddValue = inject('checkboxAddValue', noop)
    const checkboxRemoveValue = inject('checkboxRemoveValue', noop)
    const innerValue = ref(false)

    const handleChange = () => {
      const value = innerValue.value ? props.trueValue : props.falseValue
      emit('update:modelValue', value)
      if (checkboxIsGroup) {
        ;(innerValue.value ? checkboxAddValue : checkboxRemoveValue)(props.value)
      }
    }

    watch(
      () => checkboxValue,
      groupValue => {
        if (checkboxIsGroup) {
          innerValue.value = groupValue.value.includes(props.value as never)
        }
      },
      {
        immediate: true
      }
    )

    watch(
      () => props.modelValue,
      value => {
        innerValue.value = props.trueValue === value
      },
      {
        immediate: true
      }
    )

    handleChange()

    return {
      innerValue,
      handleChange
    }
  }
})
</script>

<style lang="scss" src="./checkbox.scss"></style>
