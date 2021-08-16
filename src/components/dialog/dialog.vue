<template src="./dialog.html"></template>

<script>
import { defineComponent, computed, ref, watch } from 'vue'
import SButton from '@/components/button'
import SBackdrop from '@/components/backdrop'
import { toCSSUnit } from 'wenyejie'
import { dialogProps } from './utils'

export default defineComponent({
  name: 'SDialog',
  components: {
    SButton,
    SBackdrop
  },
  props: {
    modelValue: Boolean,
    ...dialogProps
  },
  emits: ['update:modelValue', 'ok', 'cancel', 'close', 'destroy'],
  setup(props, { emit }) {
    const visible = ref(props.modelValue)
    const classes = computed(() => ({
      [`in-${props.position}`]: !!props.position
    }))
    const styles = computed(() => ({
      width: toCSSUnit(props.width),
      zIndex: props.zIndex
    }))
    watch(
      () => props.modelValue,
      val => {
        visible.value = val
      }
    )
    const close = () => {
      visible.value = false
    }
    const handleCancel = () => {
      emit('cancel')
      close()
    }
    const handleOk = () => {
      emit('ok')
      close()
    }
    const handleClose = () => {
      emit('close')
      close()
    }
    const handleBackdrop = () => {
      if (props.backdropClose) {
        emit('close')
        close()
      }
    }
    const handleAfterLeave = () => {
      emit('update:modelValue', false)
      emit('destroy')
    }
    return {
      visible,
      handleAfterLeave,
      handleCancel,
      handleOk,
      handleBackdrop,
      handleClose,
      classes,
      styles
    }
  }
})
</script>

<style lang="scss" src="./dialog.scss"></style>
