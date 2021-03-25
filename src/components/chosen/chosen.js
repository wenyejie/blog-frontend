import { defineComponent, computed, watch, ref, reactive, onMounted } from 'vue'
import SInput from '../input'
import SChosenItem from '../chosenItem'
import clickOutside from '@/utils/clickOutside'

export default defineComponent({
  name: 'SChosen',
  components: { SInput, SChosenItem },
  props: {
    modelValue: {
      type: [Array, String, Number, Date]
    },
    data: {
      type: Array,
      default: () => []
    },
    maxlength: Number,
    filter: Boolean,
    multiple: Boolean,
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
      default: '$disabled'
    },
    visibleKey: {
      type: String,
      default: '$visible'
    },
    placeholder: String
  },
  emits: ['update:modelValue', 'change'],
  setup(props, { emit }) {
    const visible = ref(false)
    const innerInput = ref('')
    const innerPlaceholder = ref(props.placeholder)
    const children = reactive([])
    const selectedList = reactive([])
    const innerValue = ref(props.modelValue)

    const innerReadonly = computed(() => {
      return !props.filter
    })

    const classes = computed(() => ({
      'is-multiple': props.multiple,
      'is-visible': visible.value
    }))

    const handleFocusin = () => {
      // TODO
    }

    const handleFocusout = () => {
      // TODO
    }

    const handleRemoveSelect = () => {
      // TODO
    }

    const handleToggle = () => {
      visible.value = !visible.value
      clickOutside(handleToggle, visible.value)
    }

    // 加入子组件
    const addChild = (child) => {
      children.push(child)
      if (innerValue.value.includes(child.innerValue)) {
        if (props.multiple) {
          selectedList.push(child)
        }
      }
    }

    watch(
      () => children,
      (list) => {
        if (props.multiple) {
          innerValue.value = list.filter((item) => item.active).map((item) => item.innerValue)
        } else {
          innerValue.value = (list.find((item) => item.active) || {}).innerValue
        }
      },
      { deep: true }
    )

    // 移除子组件
    const removeChild = (child) => {
      const index = children.indexOf(child)
      children.splice(index, 1)
      if (innerValue.value.includes(child.innerValue)) {
        if (props.multiple) {
          const index = selectedList.includes(child)
          if (index >= 0) {
            selectedList.splice(index, 1)
          }
        } else {
          innerValue.value = ''
        }
      }
    }

    return {
      visible,
      innerInput,
      innerPlaceholder,
      innerReadonly,
      classes,
      children,
      selectedList,

      handleToggle,
      handleFocusin,
      handleFocusout,
      handleRemoveSelect,
      addChild,
      removeChild
    }
  }
})
