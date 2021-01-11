<!--
 - @author: Storm
 - @date: 2021/1/11 0011
 - @email: wenyejie@foxmail.com
 -->
<template>
  <button class="s-button"><slot /></button>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "SButton",
  props: {
    type: {
      type: String,
      default: "default",
      validator: (val: string) => {
        return [
          "default",
          "primary",
          "success",
          "warning",
          "danger",
          "info"
        ].includes(val);
      }
    }
  }
});
</script>

<style lang="scss">
.s-button {
  &--block {
    display: block;
    width: 100%;
  }
}
</style>
