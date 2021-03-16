<!--
 - @author: Storm
 - @date: 2021/01/13
 - @email: wenyejie@foxmail.com
 -->
<template>
  <div :class="classes">
    <slot name="prefix"></slot>
    <input
      :name="name"
      :title="title"
      v-model="innerValue"
      @input="handleInput"
      @change="handleChange"
      @keydown.enter="handleEnter"
      :class="`${CLS_NAME}--inner`"
      :placeholder="placeholder"
      :disabled="disabled"
      :readonly="readonly"
      :required="required"
      :autocomplete="autocomplete"
      :autofocus="autofocus"
      :type="type"
    />
    <span @click="handleSuffixClick" class="s-input--suffix" v-if="$slots.suffix || suffixIcon">
      <slot name="suffix">
        <s-icon v-if="suffixIcon" :type="suffixIcon" class="s-input--icon s-input--suffix-icon" />
      </slot>
    </span>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref, watch } from 'vue'
import { propSizeOpts, formEleDefProps } from '@/composition/formElement'
import SIcon from '../icon'

const CLS_NAME = 's-input'

export default defineComponent({
  name: 'SInput',
  components: { SIcon },
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
    // 后缀icon
    suffixIcon: String,
    // 前缀icon
    prefixIcon: String,
    size: propSizeOpts,
    ...formEleDefProps
  },
  emits: ['update:modelValue', 'input', 'change', 'suffixClick', 'enter'],
  setup(props, { emit, slots }) {
    const classes = computed(() => [
      CLS_NAME,
      {
        'is-disabled': props.disabled,
        'has-suffix': slots.suffix || props.suffixIcon,
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

    const handleSuffixClick = (event: Event) => {
      emit('suffixClick', event)
    }

    const handleEnter = (event: InputEvent) => {
      emit('enter', event)
    }

    return {
      innerValue,
      handleInput,
      handleChange,
      handleSuffixClick,
      handleEnter,
      classes,
      CLS_NAME
    }
  }
})
</script>

<style lang="scss" src="./input.scss"></style>
