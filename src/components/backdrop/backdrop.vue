<template>
  <teleport to="body">
    <transition name="s-backdrop" :appear="true">
      <div class="s-backdrop" v-if="visible" @click.self="$emit('click')" :style="styles"></div>
    </transition>
  </teleport>
</template>

<script lang="ts">
import { defineComponent, computed, onBeforeUnmount, ref, watch } from 'vue'

export default defineComponent({
  name: 'SBackdrop',
  props: {
    modelValue: {
      type: Boolean,
      default: false
    },
    backgroundColor: {
      type: String,
      default: ''
    },
    zIndex: {
      type: Number,
      default: 2000
    },
    hasBackdrop: {
      type: Boolean,
      default: true
    }
  },
  emits: ['click'],
  setup(props) {
    const styles = computed(() => ({
      'background-color': props.backgroundColor,
      zIndex: props.zIndex
    }))

    const visible = ref(props.modelValue)

    watch(
      () => props.modelValue,
      (val: boolean) => {
        visible.value = val
      }
    )

    const $body = document.body

    onBeforeUnmount(() => {
      $body.classList.remove('s-body-overflow-hidden')
    })

    $body.classList.add('s-body-overflow-hidden')

    return {
      visible,
      styles
    }
  }
})
</script>

<style lang="scss" src="./backdrop.scss"></style>
