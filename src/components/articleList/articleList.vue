<template>
  <s-article v-for="item in articleList" :key="item._id" :data="item" />
  <p v-if="articleList.length === 0">
    {{ loading === 1 ? '正在加载中...' : '暂无数据' }}
  </p>
  <s-pagination
    v-model="page"
    :pageSize="pageSize"
    :totalSize="totalSize"
    v-if="articleList.length"
    @change="handlePagination"
  />
</template>

<script>
import { defineComponent, ref, watch } from 'vue'
import { getArticleList } from '@/apis/article'

export default defineComponent({
  name: 'SArticleList',
  props: {
    data: {
      type: Object,
      default: () => ({})
    }
  },
  emits: ['success'],
  setup(props, { emit }) {
    const articleList = ref([])
    const pageSize = ref(10)
    const page = ref(1)
    const totalSize = ref(0)

    const handlePagination = () => {
      const data = {
        page: page.value,
        pageSize: pageSize.value
      }

      for (const key in props.data) {
        data[key] = props.data[key]
      }

      getArticleList(data).then(result => {
        articleList.value = result.list
        pageSize.value = Number.parseInt(result.pageSize)
        page.value = Number.parseInt(result.page)
        totalSize.value = result.totalSize
        emit('success', result)
      })
    }

    watch(
      () => props.data,
      () => {
        handlePagination()
      },
      {
        deep: true,
        immediate: true
      }
    )

    return {
      articleList,
      page,
      pageSize,
      totalSize,
      handlePagination
    }
  }
})
</script>
