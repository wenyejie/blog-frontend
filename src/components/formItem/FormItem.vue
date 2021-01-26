<template>
  <div class="s-form-item" :class="classes">
    <div v-if="$slots.label || label" class="s-form-item--label" :style="labelStyles">
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
      type: String
    },
    size: propSizeOpts,
    message: String
  },
  setup(props, { emit }) {
    const labelWidth = inject('formLabelWidth')
    const labelPosition = inject('formLabelPosition')
    const formSize = inject('formSize')

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
        width: Number.isSafeInteger(labelWidth.value) ? `${labelWidth.value}px` : labelWidth.value
      }
    })

    const classes = computed(() => {
      return {
        [`in-${labelPosition.value}`]: !!labelPosition.value,
        [`is-${innerSize.value}`]: !!innerSize.value
      }
    })

    return {
      classes,
      labelWidth,
      labelStyles,
      innerMessage
    }
  }
})
</script>

<style lang="scss" src="./FormItem.scss"></style>
