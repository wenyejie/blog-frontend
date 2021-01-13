<!--
 - @author: Storm
 - @date: 2021/1/11 0011
 - @email: wenyejie@foxmail.com
 -->
<template>
  <button :class="classes" :type="props.nativeType" :disabled="innerDisabled">
    <slot />
  </button>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
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
    loading: propBooleanDefFalse,
    disabled: propBooleanDefFalse,
    plain: propBooleanDefFalse,
    round: propBooleanDefFalse,
    autofocus: propBooleanDefFalse,
    circle: propBooleanDefFalse
  },
  setup(props) {
    const classes = computed(() => {
      return [
        CLS_NAME,
        {
          [`${CLS_NAME}-${props.type}`]: !!props.type,
          [`${CLS_NAME}-${props.size}`]: !!props.size,
          "is-block": props.block,
          "is-loading": props.loading,
          "is-plain": props.plain,
          "is-round": props.round,
          "is-circle": props.circle
        }
      ];
    });

    // 当按钮被禁用或者loading状态时, 禁用按钮
    const innerDisabled = computed(() => {
      return props.loading || props.disabled;
    });

    return {
      props,
      classes,
      innerDisabled
    };
  }
});
</script>

<style lang="scss">
.s-button {
  display: inline-block;
  cursor: pointer;
  line-height: 1.4285714285714286;
  white-space: nowrap;
  background-color: #fff;
  border: 1px solid #dcdfe6;
  color: #606266;
  text-align: center;
  box-sizing: border-box;
  outline: none;
  margin: 0;
  transition: 0.1s;
  font-weight: 500;
  user-select: none;
  padding: 10px 20px;
  font-size: 14px;
  border-radius: 4px;

  &:disabled {
    pointer-events: none;
  }

  &.is-block {
    display: block;
    width: 100%;
  }

  &-primary {
  }

  &.is-round {
    border-radius: 20px;
  }

  &.is-loading {
    position: relative;

    &::before {
      content: "";
      display: inline-block;
      vertical-align: middle;
      width: 1em;
      height: 1em;
      border: 2px solid #999;
      border-bottom-color: #ccc;
      border-radius: 100%;
      animation: rotating 1s linear infinite;
      margin-right: 5px;
      margin-top: -0.1em;
    }

    &::after {
      pointer-events: none;
      content: "";
      position: absolute;
      left: -1px;
      top: -1px;
      right: -1px;
      bottom: -1px;
      border-radius: inherit;
      background-color: hsla(0, 0%, 100%, 0.35);
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
