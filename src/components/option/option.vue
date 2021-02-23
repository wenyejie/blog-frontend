<template>
  <dd class="s-option" :class="{ 'is-disabled': disabled }" @click="handleClick">
    <slot>{{ label }}</slot>
  </dd>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
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
    const handleClick = () => {
      emit('click', props.value)
      emit('change', { value: props.value, label: props.label })
    }
    return {
      handleClick
    }
  }
})
</script>

<style lang="scss" src="./option.scss"></style>
