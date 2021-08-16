<template>
  <div class="s-select">
    <div class="s-select--input">
      <input
        class="s-select--inner"
        v-model="innerLabel"
        :readonly="readonly"
        :placeholder="placeholder"
        @click="handleToggle"
      />
    </div>
    <transition name="s-select--list">
      <dl class="s-select--list" v-if="visible !== 0" v-show="visible === 1" @click.stop>
        <slot>
          <s-option
            v-for="item in data"
            :key="item[valueKey]"
            :value="item[valueKey]"
            :label="item[labelKey]"
            @click="handleClick(item)"
          />
        </slot>
      </dl>
    </transition>
  </div>
</template>

<script>
import { defineComponent, ref, watch, computed, provide } from 'vue'
import { propSizeOpts, formEleDefProps } from '@/composition/formElement'
import SOption from '../option'
import clickOutside from '@/utils/clickOutside'

export default defineComponent({
  name: 'SSelect',
  components: { SOption },
  props: {
    ...formEleDefProps,
    modelValue: {
      type: [String, Number, Array]
    },
    // 大小
    size: propSizeOpts,

    // 原始属性
    nativeSize: [String, Number],

    // 可过滤的
    filterable: {
      type: Boolean,
      default: false
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
    const innerLabel = ref('')
    const selectItem = ref({})

    const visible = ref(0)
    provide('selectValue', innerValue)

    watch(
      () => props.modelValue,
      val => {
        innerValue.value = val
      },
      {
        immediate: true
      }
    )

    const classes = computed(() => {
      return {
        [`is-${props.size}`]: !!props.size,
        [`s-select-block`]: !!props.block
      }
    })

    const handleToggle = () => {
      visible.value = visible.value === 1 ? 2 : 1
      if (visible.value === 1) {
        clickOutside.add(handleToggle)
      } else {
        clickOutside.remove(handleToggle)
      }
    }

    const handleChange = () => {
      emit('update:modelValue', innerValue.value)
      emit('change', innerValue.value)
    }

    const handleClick = item => {
      selectItem.value = item
      innerValue.value = item[props.valueKey]
      innerLabel.value = item[props.labelKey]
      emit('update:modelValue', innerValue.value)
      emit('change', innerValue.value)
      handleToggle()
    }

    const readonly = computed(() => {
      return !props.filterable
    })

    return {
      visible,
      readonly,
      classes,
      innerValue,
      innerLabel,
      handleChange,
      handleClick,
      handleToggle
    }
  }
})
</script>

<style lang="scss" src="./Select.scss"></style>
