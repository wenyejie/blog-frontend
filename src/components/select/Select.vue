<template>
  <select v-model="innerValue" :class="classes" class="s-select" @change="handleChange">
    <option v-if="placeholder" disabled value="">{{ placeholder }}</option>
    <slot>
      <template v-if="data">
        <option
          v-for="item in data"
          :key="item[valueKey]"
          :disabled="item[disabledKey]"
          :value="item[valueKey]"
          >{{ item[labelKey] }}
        </option>
      </template>
    </slot>
  </select>
</template>

<script>
import { defineComponent, ref, watch, computed } from 'vue'

export default defineComponent({
  name: 'SSelect',
  props: {
    placeholder: {
      type: String,
      default: '请选择'
    },
    modelValue: {
      type: [String, Number]
    },
    // 大小
    size: {
      type: String,
      default: undefined,
      validator(val) {
        return ['lg', 'sm', 'xs'].includes(val)
      }
    },
    // 是否为块级元素
    block: {
      type: Boolean,
      default: false
    },
    // 循环数据
    data: {
      type: [Array, Object]
    },
    disabledKey: {
      type: String,
      default: 'disabled'
    },
    labelKey: {
      type: String,
      default: 'label'
    },
    valueKey: {
      type: String,
      default: '_id'
    }
  },
  emits: ['update:modelValue', 'change'],
  setup(props, { emit }) {
    const innerValue = ref(props.modelValue)

    watch(
      () => props.modelValue,
      val => {
        innerValue.value = val
      }
    )

    const classes = computed(() => {
      return {
        [`s-select-${props.size}`]: !!props.size,
        [`s-select-block`]: !!props.block
      }
    })

    const handleChange = () => {
      emit('update:modelValue', innerValue.value)
      emit('change', innerValue.value)
    }

    return {
      classes,
      innerValue,
      handleChange
    }
  }
})
</script>

<style lang="scss" src="./Select.scss"></style>
