<template>
  <li class="s-chosen-item" v-show="visible" :class="classes" @click="handleClick">
    <slot>{{ label }}</slot>
  </li>
</template>

<script>
import { defineComponent, inject, computed, onBeforeUnmount } from 'vue'
import { noop } from 'wenyejie'
export default defineComponent({
  name: 'SChosenItem',
  props: {
    value: [String, Number, Boolean],
    label: [String, Number],
    disabled: {
      type: Boolean,
      default: false
    },
    visible: {
      type: Boolean,
      default: false
    }
  },
  emits: ['click'],
  setup(props, { slots }) {
    const chosenAdd = inject('chosenAdd', noop)
    const chosenRemove = inject('chosenRemove', noop)
    const chosenSelect = inject('chosenSelect', noop)

    const label = props.label | slots.default || props.value

    const value = props.value || label

    const item = chosenAdd({
      label,
      value,
      disabled: props.disabled,
      active: false,
      visible: true
    })

    const handleClick = () => {
      chosenSelect(item)
    }

    if (item.created) {
      handleClick()
    }

    onBeforeUnmount(() => {
      chosenRemove(item)
    })

    const classes = computed(() => {
      return {
        'is-active': item.active,
        'is-disabled': props.disabled
      }
    })
    return {
      classes,
      handleClick
    }
  }
})
</script>

<style lang="scss" src="./chosenItem.scss"></style>
