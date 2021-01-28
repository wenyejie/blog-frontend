<template>
  <div class="s-form-item" :class="classes">
    <div v-if="innerHasLabel" class="s-form-item--label" :style="labelStyles">
      <slot name="label">{{ label }}</slot>
    </div>
    <div class="s-form-item--content"><slot /></div>
    <div class="s-form-item--message" v-if="$slots.message || innerMessage">{{ innerMessage }}</div>
  </div>
</template>

<script>
import { defineComponent, inject, computed } from 'vue'
import { propSizeOpts } from '@/composition/formElement'
export default defineComponent({
  name: 'SFormItem',
  props: {
    label: {
      type: [String, Boolean],
      default: ''
    },
    hasLabel: {
      type: [Boolean, undefined],
      default: undefined
    },
    labelWidth: {
      type: [Number, String]
    },
    size: propSizeOpts,
    message: String
  },
  setup(props, { emit, slots }) {
    const formLabelWidth = inject('formLabelWidth')
    const formLabelPosition = inject('formLabelPosition')
    const formSize = inject('formSize')
    const formHasLabel = inject('formHasLabel')

    const innerHasLabel = computed(() => {
      return (
        props.label ||
        slots.label ||
        props.hasLabel ||
        (props.hasLabel === undefined && formHasLabel.value)
      )
    })

    const innerLabelWidth = computed(() => {
      return props.labelWidth || formLabelWidth.value
    })

    const innerSize = computed(() => {
      if (props.size) {
        return props.size
      } else {
        return formSize.value
      }
    })

    const innerMessage = computed(() => {
      if (props.message) {
        return props.message
      }
    })

    const labelStyles = computed(() => {
      return {
        width: Number.isSafeInteger(innerLabelWidth.value)
          ? `${innerLabelWidth.value}px`
          : innerLabelWidth.value
      }
    })

    const classes = computed(() => {
      return {
        [`in-${formLabelPosition.value}`]: !!formLabelPosition.value,
        [`is-${innerSize.value}`]: !!innerSize.value
      }
    })

    return {
      classes,
      labelStyles,
      innerMessage,
      innerHasLabel
    }
  }
})
</script>

<style lang="scss" src="./FormItem.scss"></style>
