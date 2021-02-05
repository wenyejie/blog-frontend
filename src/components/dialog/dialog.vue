<template>
  <s-backdrop
    v-model="visible"
    :hasBackdrop="hasBackdrop"
    :zIndex="zIndex - 1"
    @click="handleBackdrop"
  />
  <teleport to="body">
    <transition name="s-dialog" :appear="true" @after-leave="handleAfterLeave">
      <section v-if="visible" class="s-dialog" :style="styles" :class="classes">
        <div class="s-dialog--content">
          <slot name="content">
            <header v-if="hasHeader || title || $slots.header" class="s-dialog--header">
              <slot name="header">
                <h1 class="s-dialog--title">{{ title }}</h1>
              </slot>
              <a href="javascript:;" class="s-dialog--close" v-if="hasClose" @click="handleClose"
                >×</a
              >
            </header>
            <div class="s-dialog--body">
              <slot>{{ content }}</slot>
            </div>
            <footer v-if="hasFooter || $slots.footer" class="s-dialog--footer">
              <slot name="footer">
                <slot name="footer-start" />
                <s-button v-if="hasCancel" @click="handleCancel" size="small"
                  >{{ cancelLabel }}
                </s-button>
                <slot name="footer-center" />
                <s-button v-if="hasOk" @click="handleOk" size="small" type="primary"
                  >{{ okLabel }}
                </s-button>
                <slot name="footer-end" />
              </slot>
            </footer>
          </slot>
        </div>
      </section>
    </transition>
  </teleport>
</template>

<script lang="ts">
import { defineComponent, computed, ref, watch } from 'vue'
import SButton from '@/components/button'
import SBackdrop from '@/components/backdrop'
import { toCSSUnit } from '../utils'

export default defineComponent({
  name: 'SDialog',
  components: {
    SButton,
    SBackdrop
  },
  props: {
    modelValue: Boolean,
    // 是否拥有背景
    backdrop: {
      type: Boolean,
      default: true
    },
    // 弹框标题
    title: String,
    // 展示内容
    content: String,
    // 弹框位置
    position: {
      type: String,
      default: 'center',
      validator: (val: string) => ['center'].includes(val)
    },
    // 弹窗宽度
    width: {
      type: [Number, String]
    },
    zIndex: {
      type: Number,
      default: 2001
    },
    // 是否拥有背景
    hasBackdrop: {
      type: Boolean,
      default: true
    },
    // 点击背景关闭
    backdropClose: Boolean,
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
    hasOk: {
      type: Boolean,
      default: true
    },
    cancelLabel: {
      type: String,
      default: '取消'
    },
    okLabel: {
      type: String,
      default: '确定'
    },
    hasClose: {
      type: Boolean,
      default: true
    }
  },
  emits: ['update:modelValue', 'ok', 'cancel', 'close', 'destroy'],
  setup(props, { emit }) {
    const visible = ref(props.modelValue)
    const classes = computed(() => ({
      [`in-${props.position}`]: !!props.position
    }))
    const styles = computed(() => ({
      width: toCSSUnit(props.width),
      zIndex: props.zIndex
    }))
    watch(
      () => props.modelValue,
      (val: boolean) => {
        visible.value = val
      }
    )
    const close = () => {
      visible.value = false
    }
    const handleCancel = () => {
      emit('cancel')
      close()
    }
    const handleOk = () => {
      emit('ok')
      close()
    }
    const handleClose = () => {
      emit('close')
      close()
    }
    const handleBackdrop = () => {
      if (props.backdropClose) {
        emit('close')
        close()
      }
    }
    const handleAfterLeave = () => {
      emit('update:modelValue', false)
      emit('destroy')
    }
    return {
      visible,
      handleAfterLeave,
      handleCancel,
      handleOk,
      handleBackdrop,
      handleClose,
      classes,
      styles
    }
  }
})
</script>

<style lang="scss" src="./dialog.scss"></style>
