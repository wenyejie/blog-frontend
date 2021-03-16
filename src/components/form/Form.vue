<template>
  <form @submit="handleSubmit"><slot /></form>
</template>

<script>
import { defineComponent, provide, ref } from 'vue'
import { propSizeOpts } from '@/composition/formElement'

export default defineComponent({
  name: 'SForm',
  props: {
    labelWidth: {
      type: [String, Number],
      default: 'auto'
    },
    labelPosition: {
      type: String,
      default: 'left',
      validator: val => {
        return ['left', 'right', 'top'].includes(val)
      }
    },
    hasLabel: {
      type: Boolean,
      default: true
    },
    size: propSizeOpts,
    inline: Boolean
  },
  emits: ['submit'],
  setup(props, { emit }) {
    const handleSubmit = event => {
      emit('submit', event)
      event.preventDefault()
    }

    provide('formLabelWidth', ref(props.labelWidth))
    provide('formLabelPosition', ref(props.labelPosition))
    provide('formSize', ref(props.size))
    provide('formHasLabel', ref(props.hasLabel))

    return {
      handleSubmit
    }
  }
})
</script>

<!--<style lang="scss" src="./Form.scss"></style>-->
