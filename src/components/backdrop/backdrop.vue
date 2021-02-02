<template>
  <teleport to="body">
    <div class="s-backdrop" :style="styles">
      <slot />
    </div>
  </teleport>
</template>

<script>
import { defineComponent, computed, onBeforeUnmount } from 'vue'

let counter = 0

export default defineComponent({
  name: 'SBackdrop',
  props: {
    backgroundColor: {
      type: String,
      default: ''
    },
    zIndex: {
      type: Number,
      default: 2000
    },
    backdrop: {
      type: Boolean,
      default: true
    }
  },
  setup(props) {
    const styles = computed(() => ({
      'background-color': props.backgroundColor,
      zIndex: props.zIndex + counter
    }))

    const $body = document.body

    onBeforeUnmount(() => {
      $body.classList.remove('s-overflow-hidden')
      counter--
    })

    counter++

    $body.classList.add('s-overflow-hidden')

    return {
      styles
    }
  }
})
</script>

<style lang="scss" src="./backdrop.scss"></style>
