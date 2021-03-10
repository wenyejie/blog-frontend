<template>
  <div class="s-chosen" :class="classes">
    <div class="s-chosen--view" @click="handleToggle">
      <template v-if="multiple">
        <div class="s-chosen--tag" v-for="item in selectData" :key="item[valueKey]">
          {{ item[labelKey] }}<span class="s-chosen--close" @click="handleClose(item)">×</span>
        </div>
      </template>
      <div class="s-chosen--input-wrap">
        <input
          :readonly="innerReadonly"
          v-model="innerInput"
          :placeholder="innerPlaceholder"
          class="s-chosen--input"
          type="text"
          @keydown.enter="handleEnter"
        />
      </div>
    </div>
    <transition name="s-chosen--list">
      <ul class="s-chosen--list" v-show="visible === 1" @click.stop>
        <template v-if="filterData && filterData.length >= 0">
          <s-chosen-item
            v-for="item in filterData"
            v-show="item.visible"
            :key="item[valueKey]"
            :visible="item[visibleKey]"
            :disabled="item[disabledKey]"
            :value="item[valueKey]"
            :label="item[labelKey]"
          />
        </template>
        <slot />
      </ul>
    </transition>
  </div>
</template>

<script>
import { defineComponent, reactive, ref, computed, provide, watch } from 'vue'
import { formEleDefProps } from '@/composition/formElement'
import clickOutside from '@/utils/clickOutside'
import SChosenItem from '../chosenItem'
export default defineComponent({
  name: 'SChosen',
  components: { SChosenItem },
  props: {
    modelValue: {
      type: [Array, String, Number, Date]
    },
    data: {
      type: Array,
      default: () => []
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
      default: 'value'
    },
    visibleKey: {
      type: String,
      default: 'visible'
    },
    visibility: Boolean,
    filterable: Boolean,
    creatable: Boolean,
    multiple: Boolean,
    ...formEleDefProps
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const visible = ref(props.visibility ? 1 : 0)
    const innerInput = ref('')
    const innerPlaceholder = ref(props.placeholder)
    const dataList = reactive(
      props.data.map(item => {
        return {
          value: item[props.valueKey],
          label: item[props.labelKey],
          disabled: item[props.disabledKey]
        }
      })
    )
    const inputHeight = ref(null)

    const innerReadonly = computed(() => {
      return !props.filterable && !props.creatable
    })

    const handleToggle = () => {
      visible.value = visible.value === 1 ? 2 : 1
      if (visible.value === 1) {
        clickOutside.add(handleToggle)
      } else {
        clickOutside.remove(handleToggle)
      }
      innerInput.value = ''
    }

    const findIndex = item => {
      return dataList.findIndex(({ value }) => value === item.value)
    }

    // 增加子项
    const handleAdd = item => {
      const index = findIndex(item)

      if (index >= 0) {
        dataList[index] = Object.assign(dataList[index], item)
        return dataList[index]
      }

      dataList.push(item)
      return dataList[dataList.length - 1]
    }

    // 移除子项
    const handleRemove = item => {
      const index = findIndex(item)

      if (index >= 0) {
        dataList.splice(index, 1)
      }
    }

    // 选中子项
    const handleSelect = item => {
      const index = findIndex(item)
      if (index >= 0) {
        if (!props.multiple) {
          dataList.forEach(item => (item.active = false))
        }
        dataList[index].active = !dataList[index].active
      }
      if (!props.multiple) {
        handleToggle()
      }
    }

    const handleClose = item => {
      item.active = false
    }

    const handleEnter = () => {
      if (props.creatable) {
        dataList.push({
          label: innerInput.value,
          value: innerInput.value,
          created: true,
          active: true
        })
      }
    }

    const selectData = computed(() => {
      return dataList.filter(item => item.active)
    })

    const filterData = computed(() => {
      const label = (innerInput.value || '').toLocaleLowerCase()
      return dataList.filter(item => {
        if (!props.filterable) {
          return true
        } else {
          return !label || (item[props.labelKey] || '').toLocaleLowerCase().includes(label)
        }
      })
    })

    const classes = computed(() => {
      return {
        'is-multiple': props.multiple,
        'is-visible': visible.value === 1,
        'is-disabled': props.disabled,
        'is-selected': !props.multiple && selectData.value.length > 0,
        'is-created': props.creatable
      }
    })

    watch(
      () => dataList,
      list => {
        if (!props.multiple) {
          const value = (list.find(item => item.active) || {}).value
          if (value) {
            innerPlaceholder.value = value
          }
        }
      },
      {
        deep: true,
        immediate: true
      }
    )

    watch(
      () => props.modelValue,
      value => {
        // TODO
      },
      {
        immediate: true,
        deep: true
      }
    )
    provide('chosenAdd', handleAdd)
    provide('chosenRemove', handleRemove)
    provide('chosenSelect', handleSelect)

    return {
      visible,
      innerReadonly,
      innerPlaceholder,
      innerInput,
      handleToggle,
      handleClose,
      handleEnter,
      selectData,
      filterData,
      inputHeight,
      classes
    }
  }
})
</script>

<style lang="scss" src="./chosen.scss"></style>
