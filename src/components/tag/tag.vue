<template>
  <span class="s-tag"
    ><slot>{{ label }}</slot
    ><span v-if="closable" class="s-tag--close">×</span></span
  >
</template>

<script>
import { defineComponent, computed } from 'vue'
export default defineComponent({
  name: 'STag',
  props: {
    closable: Boolean
  },
  setup() {
    const classes = computed(() => {
      return {}
    })
    return {
      classes
    }
  }
})
</script>

<style lang="scss" src="./tag.scss"></style>
