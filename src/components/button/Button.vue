<!--
 - @author: Storm
 - @date: 2021/1/11 0011
 - @email: wenyejie@foxmail.com
 -->
<template>
  <button :class="classes" :type="props.nativeType">
    <slot />
  </button>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from "vue";
import { propBooleanDefFalse } from "@/components/utils";

const CLS_NAME = "s-button";

export default defineComponent({
  name: "SButton",
  props: {
    type: {
      type: String,
      validator: (val: string) => {
        return ["primary", "success", "warning", "danger", "info"].includes(
          val
        );
      }
    },
    nativeType: {
      type: String,
      default: "button",
      validator: (val: string) => {
        return ["button", "submit", "reset"].includes(val);
      }
    },
    size: {
      type: String,
      validator: (val: string) => {
        return ["lg", "sm", "xs"].includes(val);
      }
    },
    block: propBooleanDefFalse,
    loading: propBooleanDefFalse
  },
  setup(props, { emit, attrs }) {
    const classes = computed(() => {
      return [
        CLS_NAME,
        {
          [`${CLS_NAME}-${props.type}`]: !!props.type,
          "is-block": props.block,
          "is-loading": props.loading
        }
      ];
    });

    return {
      props,
      classes
    };
  }
});
</script>

<style lang="scss">
.s-button {
  &.is-block {
    display: block;
    width: 100%;
  }

  &.is-loading {
    position: relative;

    &::before {
      content: "";
      display: inline-block;
      vertical-align: baseline;
      width: 0.75em;
      height: 0.75em;
      border: 2px solid #999;
      border-bottom-width: 0;
      border-radius: 100%;
      animation: rotating 1s linear infinite;
      margin-right: 5px;
    }
  }
}

@keyframes rotating {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
