<!--
 - @author: Storm
 - @date: 2021/1/11 0011
 - @email: wenyejie@foxmail.com
 -->
<template>
  <button :class="classes" :type="nativeType" :disabled="innerDisabled" :autofocus="autofocus">
    <slot />
  </button>
</template>

<script>
import { defineComponent, computed } from 'vue'
import { formEleDefProps, propSizeOpts } from '@/composition/formElement'

const CLS_NAME = 's-button'

export default defineComponent({
  name: 'SButton',
  props: {
    type: {
      type: String,
      validator: val => {
        return ['primary', 'success', 'warning', 'danger', 'info'].includes(val)
      }
    },
    nativeType: {
      type: String,
      default: 'button',
      validator: val => {
        return ['button', 'submit', 'reset'].includes(val)
      }
    },
    size: propSizeOpts,
    icon: String,
    block: Boolean,
    loading: Boolean,
    plain: Boolean,
    round: Boolean,
    circle: Boolean,
    ...formEleDefProps
  },
  setup(props) {
    const classes = computed(() => [
      CLS_NAME,
      {
        [`${CLS_NAME}--${props.type}`]: !!props.type,
        [`${CLS_NAME}--${props.size}`]: !!props.size,
        'is-block': props.block,
        'is-loading': props.loading,
        'is-plain': props.plain,
        'is-round': props.round,
        'is-circle': props.circle
      }
    ])

    // 当按钮被禁用或者loading状态时, 禁用按钮
    const innerDisabled = computed(() => {
      return props.loading || props.disabled
    })

    return {
      classes,
      innerDisabled
    }
  }
})
</script>

<style lang="scss" src="./Button.scss"></style>
