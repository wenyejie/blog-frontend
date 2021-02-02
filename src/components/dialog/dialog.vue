<template>
  <s-backdrop :backdrop="backdrop">
    <section class="s-dialog" :style="styles" :class="classes">
      <header v-if="hasHeader || title || $slots.header" class="s-dialog--header">
        <slot name="header">
          <h1 class="s-dialog--title">{{ title }}</h1>
        </slot>
        <a href="javascript:;" class="s-dialog--close" v-if="hasClose">×</a>
      </header>
      <div class="s-dialog--body">
        <slot>{{ content }}</slot>
      </div>
      <footer v-if="hasFooter || $slots.footer" class="s-dialog--footer">
        <slot name="footer">
          <slot name="footer-start"></slot>
          <s-button size="small">取消</s-button>
          <slot name="footer-center"></slot>
          <s-button size="small" type="primary">确定</s-button>
          <slot name="footer-end"></slot>
        </slot>
      </footer>
    </section>
  </s-backdrop>
</template>

<script>
import { defineComponent, computed } from 'vue'
import { toCSSUnit } from '../utils'
export default defineComponent({
  name: 'SDialog',
  props: {
    // 是否拥有背景
    backdrop: {
      type: Boolean,
      default: true
    },
    type: {
      type: String,
      default: 'default',
      validator: val => ['info'].includes(val)
    },
    // 弹框标题
    title: String,
    // 展示内容
    content: String,
    // 弹框位置
    position: {
      type: String,
      default: 'center',
      validator: val => ['center'].includes(val)
    },
    // 弹窗宽度
    width: {
      type: [Number, String]
    },
    // 是否拥有头部
    hasHeader: {
      type: Boolean,
      default: true
    },
    // 是否拥有尾部
    hasFooter: {
      type: Boolean,
      default: true
    },
    hasCancel: {
      type: Boolean,
      default: true
    },
    hasConfirm: {
      type: Boolean,
      default: true
    },
    hasClose: {
      type: Boolean,
      default: true
    }
  },
  setup(props) {
    const classes = computed(() => ({
      [`in-${props.position}`]: !!props.position
    }))
    const styles = computed(() => ({
      width: toCSSUnit(props.width)
    }))
    return {
      classes,
      styles
    }
  }
})
</script>

<style lang="scss" src="./dialog.scss"></style>
