<template>
  <div :class="classes" v-if="totalSize !== 0 || totalPage !== 0" class="s-pagination">
    <ul>
      <li v-if="hasInfo" class="s-pagination--info">
        <template v-if="totalSize">共{{ totalSize }}条;&nbsp;</template>
        <template v-if="innerPageSize">每页{{ innerPageSize }}条;&nbsp;</template>
        第{{ current + 1 }}页; 共{{ innerTotalPage }}页;
      </li>
      <li
        v-if="hasFirst"
        :class="{ 'is-disabled': current === 0 }"
        class="s-pagination--item"
        @click="togglePage(0)"
      >
        {{ firstText }}
      </li>
      <li
        v-if="hasPrev"
        :class="{ 'is-disabled': current === 0 }"
        class="s-pagination--item"
        @click="togglePage(current - 1)"
      >
        {{ prevText }}
      </li>
      <li
        v-if="hasPrevSizer"
        class="s-pagination--sizer s-pagination--item"
        @click="handleSizer(1)"
      >
        &hellip;
      </li>
      <template v-if="hasItem">
        <li
          v-for="item in list"
          :class="{ 'is-disabled': current === item, 'is-active': current === item }"
          :key="item"
          class="s-pagination--item"
          @click.prevent="togglePage(item)"
        >
          {{ item + 1 }}
        </li>
      </template>
      <li
        v-if="hasNextSizer"
        class="s-pagination--sizer s-pagination--item"
        @click="handleSizer(2)"
      >
        &hellip;
      </li>
      <li
        v-if="hasNext"
        :class="{ 'is-disabled': current === innerTotalPage - 1 }"
        class="s-pagination--item"
        @click="togglePage(current + 1)"
      >
        {{ nextText }}
      </li>
      <li
        v-if="hasLast"
        :class="{ 'is-disabled': current === innerTotalPage - 1 }"
        class="s-pagination--item"
        @click="togglePage(innerTotalPage - 1)"
      >
        {{ lastText }}
      </li>
      <li v-if="hasPageSize" class="s-pagination--size">
        <select :size="size" v-model="innerPageSize" @change="handlePageSize">
          <option :value="10">10 条/页</option>
          <option :value="20">20 条/页</option>
          <option :value="30">30 条/页</option>
          <option :value="50">50 条/页</option>
          <option :value="100">100 条/页</option>
          <option :value="200">200 条/页</option>
        </select>
      </li>
      <li v-if="hasElevator" class="s-pagination--elevator">
        跳至
        <input
          :max="innerTotalPage"
          :min="1"
          :step="1"
          v-model.number="tier"
          type="number"
          @keyup.enter="startElevator"
          @change="startElevator"
        />页
      </li>
    </ul>
  </div>
</template>

<script>
import { computed, defineComponent, watch, ref } from 'vue'

/**
 * 向上取整, 对按钮数的对半
 * @param num 按钮数
 * @return {number}
 */
const countHalf = num => Math.ceil(num / 2)
/**
 * 根据参数起始值, 和结束值计算分页列表
 * @param start
 * @param end
 * @return {Array}
 */
const countList = (start, end) => {
  const list = []
  for (; start < end; start++) {
    list.push(start)
  }
  return list
}
/**
 * 生成分页列表
 * @param current 当前页
 * @param total 总页数
 * @param number 按钮数量
 */
const generateList = (current, total, number) => {
  // 起始页, 结束页
  let start = 0
  let end = total
  const half = countHalf(number)
  // 如果总页数低于按钮数
  if (total <= number) {
    end = total
  } else if (current < half) {
    // 按钮数的前几页
    end = number
  } else if (total <= current + half) {
    // 倒数几页
    start = total - number
  } else {
    // 默认情况
    start = current + 1 - half
    end = current + half
  }
  return countList(start, end)
}
/**
 * 数字验证规则
 * @param val
 * @return {boolean}
 */
const validator = val => val >= 0

export default defineComponent({
  name: 'SPagination',
  props: {
    modelValue: {
      type: Number,
      default: 0
    },
    name: {
      type: String,
      default: 'page'
    },
    // 总页数
    totalPage: {
      type: Number,
      default: 0,
      validator
    },
    // 总条数
    totalSize: {
      type: Number,
      default: 0,
      validator
    },
    // 每页条数
    pageSize: {
      type: Number,
      default: 10,
      validator
    },
    hasPageSize: {
      type: Boolean,
      default: false
    },
    // 按钮数量
    number: {
      type: Number,
      default: 5,
      validator
    },
    // 尺寸
    size: {
      type: String,
      default: undefined,
      validator(val) {
        return ['lg', 'sm', 'xs'].includes(val)
      }
    },
    // 禁用, 例如: 当正在加载时
    disabled: {
      type: Boolean,
      default: false
    },
    // 是否有跳转功能
    hasElevator: {
      type: Boolean,
      default: false
    },
    // 筛选器
    hasSizer: {
      type: Boolean,
      default: false
    },
    // 是否有信息
    hasInfo: {
      type: Boolean,
      default: false
    },
    // 是否有页码子项
    hasItem: {
      type: Boolean,
      default: true
    },
    // 是否有下一页
    hasNext: {
      type: Boolean,
      default: true
    },
    // 是否有上一页
    hasPrev: {
      type: Boolean,
      default: true
    },
    // 下一页文本
    nextText: {
      type: String,
      default: '>'
    },
    // 上一页文本
    prevText: {
      type: String,
      default: '<'
    },
    // 是否有第一页
    hasFirst: {
      type: Boolean,
      default: true
    },
    // 第一页文本
    firstText: {
      type: String,
      default: '\u00AB'
    },
    // 是否有最后一页
    hasLast: {
      type: Boolean,
      default: true
    },
    // 最后一页文本
    lastText: {
      type: String,
      default: '\u00BB'
    },
    align: {
      type: String,
      default: undefined,
      validator(val) {
        return ['left', 'center', 'right'].includes(val)
      }
    }
  },
  emits: ['update:modelValue', 'change'],
  setup(props, { emit }) {
    const innerPageSize = ref(props.pageSize)

    // 当前页
    const current = ref(props.modelValue)

    // 按钮数的对半向上取值
    const half = countHalf(props.number)
    // 层级
    const tier = ref(1)

    const list = ref([])

    const classes = computed(() => {
      return {
        [`is-disabled`]: props.disabled,
        [`is-${props.size}`]: !!props.size,
        [`in-${props.align}`]: !!props.align
      }
    })

    // 总页数
    const innerTotalPage = computed(() => {
      if (Number.isInteger(props.totalPage) && props.totalPage !== 0) {
        return props.totalPage
      } else if (props.totalSize > 0 && props.pageSize > 0) {
        return Math.ceil(props.totalSize / props.pageSize)
      }
      return 0
    })
    // 是否显示上一个筛选器
    const hasPrevSizer = computed(() => {
      return props.hasSizer && list.value[0] > 0
    })
    // 是否显示下一个筛选器
    const hasNextSizer = computed(() => {
      return props.hasSizer && list.value[props.number - 1] < props.totalPage - 1
    })

    // pageSize变更
    const handlePageSize = () => {
      if (props.disabled) return
      emit('change', innerPageSize.value)
    }

    // 点击切换页面
    const togglePage = page => {
      if (props.disabled) return
      // 如果页码小于0或者大于总页数, 或者等于当前页退出函数
      if (page < 0 || page >= innerTotalPage.value || page === current.value) return false
      current.value = page
      emit('update:modelValue', page)
      emit('change', page)
    }

    // 启动电梯
    const startElevator = () => {
      if (props.disabled) return
      tier.value = Math.ceil(tier.value)
      if (tier.value <= 0) {
        tier.value = 1
      } else if (tier.value > innerTotalPage.value) {
        tier.value = innerTotalPage.value
      }
      togglePage(tier.value - 1)
    }
    /**
     * 生成列表
     * @param opts 选项
     */
    const buildList = (opts = {}) => {
      if (innerTotalPage.value === 0 || !Number.isInteger(innerTotalPage.value)) return
      const options = Object.assign(
        {
          total: innerTotalPage.value,
          current: current.value,
          number: props.number
        },
        opts
      )
      list.value = generateList(options.current, options.total, options.number)
    }
    /**
     * 切换筛选器
     * @param type 类型 1:prev, 2:next
     */
    const handleSizer = type => {
      if (props.disabled) return
      // 起始值, 结束值
      let start = 0
      let end = innerTotalPage.value
      if (type === 1) {
        end = list.value[0]
        start = list.value[0] - props.number
      } else if (type === 2) {
        start = list.value[props.number - 1] + 1
        end = start + props.number
        if (end >= innerTotalPage.value) {
          end = innerTotalPage.value
        }
      }
      list.value = countList(start, end)
    }

    // 监听value是否发生变化
    watch(
      () => props.modelValue,
      val => {
        if (!Number.isSafeInteger(val)) return
        current.value = val
        buildList()
      },
      {
        immediate: true
      }
    )
    // 监听按钮数是否发生变化
    watch(
      () => props.number,
      (val, oldVal) => {
        if (val === oldVal) return
        half.value = countHalf(val)
        buildList()
      }
    )
    watch(
      () => props.pageSize,
      (val, oldVal) => {
        if (val === oldVal) return
        innerPageSize.value = val
      }
    )
    watch(() => innerTotalPage, buildList)

    return {
      list,
      tier,
      current,
      innerPageSize,
      classes,
      innerTotalPage,
      hasPrevSizer,
      hasNextSizer,
      handlePageSize,
      togglePage,
      startElevator,
      handleSizer
    }
  }
})
</script>

<style lang="scss" src="./Pagination.scss"></style>
