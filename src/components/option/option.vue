<template>
  <dd class="s-option" :class="classes" @click="handleClick">
    <slot>{{ label }}</slot>
  </dd>
</template>

<script lang="ts">
import { defineComponent, inject, computed } from 'vue'
import { AnyObject } from '@/statement'
export default defineComponent({
  name: 'SOption',
  props: {
    value: {
      type: [Number, String, Boolean]
    },
    label: {
      type: [String, Number]
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  emits: ['click', 'change'],
  setup(props, { emit }) {
    const selectValue = inject('selectValue')
    const handleClick = () => {
      emit('click', props.value)
      emit('change', { value: props.value, label: props.label })
    }

    const classes = computed(() => {
      const isActive = (selectValue && (selectValue as AnyObject).value) === props.value
      return {
        'is-active': isActive,
        'is-disabled': props.disabled || isActive
      }
    })

    return {
      classes,
      handleClick
    }
  }
})
</script>

<style lang="scss" src="./option.scss"></style>
