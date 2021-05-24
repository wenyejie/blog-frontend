<template>
  <i class="s-icon" :class="classes" :style="styles"></i>
</template>

<script>
import { computed, defineComponent } from 'vue'
import { toCSSUnit } from 'wenyejie'
export default defineComponent({
  name: 'SIcon',
  props: {
    type: String,
    nativeClass: String,
    size: [Number, String],
    color: String
  },
  setup(props) {
    const classes = computed(() => [
      props.nativeClass,
      {
        [`s-icon-${props.type}`]: !!props.type
      }
    ])

    const styles = computed(() => {
      const result = {}
      if (props.color) {
        result.color = props.color
      }
      if (props.size) {
        result.fontSize = toCSSUnit(props.size)
      }
      return result
    })

    return {
      classes,
      styles
    }
  }
})
</script>

<!--<style lang="scss" src="./icon.scss"></style>-->
