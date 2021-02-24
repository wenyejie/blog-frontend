<!--
 - @author: Storm
 - @date: 2021/01/13
 - @email: wenyejie@foxmail.com
 -->
<template>
  <div :class="classes">
    <input
      :name="name"
      v-model="innerValue"
      @input="handleInput"
      @change="handleChange"
      :class="`${CLS_NAME}--inner`"
      :placeholder="placeholder"
      :disabled="disabled"
      :readonly="readonly"
      :required="required"
      :autocomplete="autocomplete"
      :autofocus="autofocus"
      :type="type"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref, watch } from 'vue'
import { propSizeOpts, formEleDefProps } from '@/composition/formElement'

const CLS_NAME = 's-input'

export default defineComponent({
  name: 'SInput',
  props: {
    modelValue: {
      type: [String, Number]
    },
    type: {
      type: String,
      default: 'text',
      validator: (val: string) => {
        return ['text', 'password', 'number', 'tel', 'email'].includes(val)
      }
    },
    size: propSizeOpts,
    ...formEleDefProps
  },
  emits: ['update:modelValue', 'input', 'change'],
  setup(props, { emit }) {
    const classes = computed(() => [
      CLS_NAME,
      {
        'is-disabled': props.disabled,
        [`${CLS_NAME}--${props.size}`]: !!props.size
      }
    ])

    const innerValue = ref(props.modelValue)

    watch(
      () => props.modelValue,
      value => {
        innerValue.value = value
      }
    )

    const handleInput = (event: InputEvent) => {
      emit('update:modelValue', innerValue.value)
      emit('input', event)
    }

    const handleChange = (event: InputEvent) => {
      emit('change', event)
    }

    return {
      innerValue,
      handleInput,
      handleChange,
      classes,
      CLS_NAME
    }
  }
})
</script>

<style lang="scss" src="input.scss"></style>
