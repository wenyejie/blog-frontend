<template>
  <transition name="s-message" :appear="true" @after-leave="handleAfterLeave">
    <div v-show="innerVisible" class="s-message" :class="classes">
      <s-icon v-if="innerIcon" class="s-message--icon" :type="innerIcon" />
      <slot>
        <p v-if="!useHtml" class="s-message--content">{{ message }}</p>
        <p v-else v-html="message"></p>
      </slot>
    </div>
  </transition>
</template>

<script>
import { defineComponent, computed, onBeforeUnmount, watch, ref } from 'vue'
import SIcon from '../icon'

export default defineComponent({
  name: 'SMessage',
  components: {
    SIcon: SIcon
  },
  props: {
    modelValue: {
      type: Boolean,
      default: false
    },
    type: {
      type: String,
      default: 'info',
      validator: val => {
        return ['info', 'success', 'danger', 'warning'].includes(val)
      }
    },
    icon: String,
    message: String,
    useHtml: Boolean,
    duration: { type: Number, default: 3000 }
  },
  emits: ['destroy', 'update:modelValue'],
  setup(props, { emit }) {
    let timer = -1
    const innerVisible = ref(props.modelValue)
    const classes = computed(() => ({
      [`is-${props.type}`]: !!props.type
    }))

    const innerIcon = computed(() => {
      return props.icon || props.type
    })

    const handleAfterLeave = () => {
      emit('update:modelValue', false)
      emit('destroy')
    }

    const startCountdown = () => {
      if (props.duration) {
        timer = setTimeout(() => {
          innerVisible.value = false
        }, props.duration)
      }
    }

    watch(
      () => props.modelValue,
      val => {
        innerVisible.value = val
        if (innerVisible.value) {
          startCountdown()
        }
      },
      {
        immediate: true
      }
    )

    onBeforeUnmount(() => {
      clearTimeout(timer)
    })

    return {
      innerVisible,
      innerIcon,
      classes,
      handleAfterLeave
    }
  }
})
</script>

<style lang="scss" src="./message.scss"></style>
