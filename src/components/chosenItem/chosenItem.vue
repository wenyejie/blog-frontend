<template>
  <li class="s-chosen-item" :class="classes" @click="handleClick">
    <slot>{{ innerLabel }}</slot>
  </li>
</template>

<script>
import { defineComponent, computed, onBeforeUnmount, reactive, ref, getCurrentInstance } from 'vue'
import { getParentProxy } from '@/utils'

export default defineComponent({
  name: 'SChosenItem',
  props: {
    value: [String, Number, Boolean],
    label: [String, Number],
    disabled: Boolean,
    visible: {
      type: [Boolean, undefined],
      default: undefined
    }
  },
  emits: ['click'],
  setup(props, { slots }) {
    const instance = getCurrentInstance()
    const proxy = instance.proxy

    const $parent = getParentProxy(instance, 'SChosen')

    if (!$parent) {
      throw new Error('SChosenItem must be in SChosen')
    }

    const innerLabel = computed(() => props.label | slots.default || props.value)

    const innerValue = computed(() => props.value || innerLabel.value)

    const active = ref(
      $parent.multiple
        ? $parent.innerValue.includes(innerValue.value)
        : $parent.innerValue === innerValue.value
    )

    const inner = reactive({
      value: innerValue.value,
      label: innerLabel.value,
      active: active.value,
      visible: true
    })

    const handleClick = () => {
      active.value = !active.value
      $parent.handleSelect(instance.proxy, active.value)
    }

    const innerVisible = computed(() => {
      if ($parent.innerInput && innerLabel.value.includes($parent.innerInput)) {
        return false
      } else {
        return props.visible
      }
    })

    const classes = computed(() => {
      return {
        'is-disabled': props.disabled,
        'is-visible': innerVisible,
        'is-active': active.value
      }
    })

    $parent.addChild(inner)

    onBeforeUnmount(() => {
      const index = $parent.children.indexOf(inner)
      $parent.children.splice(index, 1)
    })
    return {
      handleClick,
      classes,
      innerVisible,
      innerLabel,
      innerValue,
      active
    }
  }
})
</script>

<style lang="scss" src="./chosenItem.scss"></style>
