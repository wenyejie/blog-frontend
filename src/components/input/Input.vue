<!--
 - @author: Storm
 - @date: 2021/01/13
 - @email: wenyejie@foxmail.com
 -->
<template>
  <div :class="classes">
    <input
      v-model="innerValue"
      @input="handleInput"
      @change="handleChange"
      :class="`${CLS_NAME}--inner`"
      :disabled="disabled"
      :readonly="readonly"
      :required="required"
      :autocomplete="autocomplete"
      :type="type"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref } from 'vue'
import { propBooleanDefFalse, propSizeOpts } from '@/components/utils'

const CLS_NAME = 's-input'

export default defineComponent({
  name: 'SInput',
  props: {
    modelValue: {
      type: String
    },
    type: {
      type: String,
      default: 'text',
      validator: (val: string) => {
        return ['text', 'password', 'number'].includes(val)
      }
    },
    disabled: propBooleanDefFalse,
    readonly: propBooleanDefFalse,
    required: propBooleanDefFalse,
    autocomplete: propBooleanDefFalse,
    size: propSizeOpts
  },
  emits: ['input', 'change'],
  setup(props, { emit }) {
    const classes = computed(() => [
      CLS_NAME,
      {
        'is-disabled': props.disabled,
        [`${CLS_NAME}--${props.size}`]: !!props.size
      }
    ])

    const innerValue = ref('')

    const handleInput = (event: InputEvent) => {
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

<style lang="scss" src="./Input.scss"></style>
