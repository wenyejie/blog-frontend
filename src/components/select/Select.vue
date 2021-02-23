<template>
  <div class="s-select">
    <div class="s-select--input">
      <input
        class="s-select--inner"
        v-model="innerValue"
        :readonly="readonly"
        :placeholder="placeholder"
        @click="handleToggle"
      />
    </div>
    <transition>
      <dl class="s-select--list" v-show="visible" @click.stop>
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
    <!--<select
      v-model="innerValue"
      :size="nativeSize"
      :class="classes"
      class="s-select&#45;&#45;inner"
      @change="handleChange"
    >
      <option v-if="placeholder" disabled :value="null">{{ placeholder }}</option>
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
    </select>-->
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch, computed, nextTick } from 'vue'
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

    const visible = ref(false)

    watch(
      () => props.modelValue,
      val => {
        innerValue.value = val
      }
    )

    const classes = computed(() => {
      return {
        [`is-${props.size}`]: !!props.size,
        [`s-select-block`]: !!props.block
      }
    })

    const handleChange = () => {
      emit('update:modelValue', innerValue.value)
      emit('change', innerValue.value)
    }

    const handleClick = (item: any) => {
      innerValue.value = item[props.valueKey]
      emit('update:modelValue', innerValue.value)
      emit('change', innerValue.value)
    }

    const handleToggle = () => {
      visible.value = !visible.value
      if (visible.value === true) {
        clickOutside.add(handleToggle)
      } else {
        clickOutside.remove(handleToggle)
      }
    }

    const readonly = computed(() => {
      return true
    })

    return {
      visible,
      readonly,
      classes,
      innerValue,
      handleChange,
      handleClick,
      handleToggle
    }
  }
})
</script>

<style lang="scss" src="./Select.scss"></style>
