import { defineComponent, computed, watch, reactive, ref } from 'vue'
import SInput from '../input'

export default defineComponent({
  name: 'SChosen',
  components: { SInput },
  props: {
    modelValue: {
      type: [Array, String, Number, Date]
    },
    data: {
      type: Array,
      default: () => []
    },
    multiple: {
      type: Boolean,
      default: false
    },
    valueKey: {
      type: String,
      default: 'value'
    },
    labelKey: {
      type: String,
      default: 'label'
    },
    disabledKey: {
      type: String,
      default: 'disabled'
    }
  },
  setup(props, { emit }) {
    // 初始化子项
    const handleInitItem = (item) => {
      return Object.assign(
        {
          $selected: false,
          $label: item[props.labelKey],
          $value: item[props.valueKey],
          $disabled: item[props.disabledKey],
          $created: false,
          $filtered: true
        },
        item
      )
    }

    // 初始化数据
    const handleInitData = (data) => {
      return data.map((item) => handleInitItem(item))
    }

    const innerData = ref(handleInitData(props.data))
    const innerInput = ref('')
    const classes = computed(() => {
      return {
        'is-multipled': props.multiple
      }
    })

    // 移除当前选项
    const handleClose = (item) => {
      item.$selected = false
    }

    watch(
      () => props.data,
      (val) => {
        if (Array.isArray(val)) {
          innerData.value = handleInitData(val)
        }
      },
      {
        immediate: true,
        deep: true
      }
    )
    return {
      classes,
      innerData,
      innerInput,
      handleClose
    }
  }
})
