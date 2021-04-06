<template>
  <s-article v-for="item in articleList" :key="item._id" :data="item" />
  <p class="s-article-list--status" v-if="loading !== 0" v-show="articleList.length === 0">
    {{ loading === 1 ? '正在加载中...' : '暂无数据' }}
  </p>
  <s-pagination
    class="s-article-list--pagination"
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
    const loading = ref(0)

    const handlePagination = () => {
      const data = {
        page: page.value,
        pageSize: pageSize.value
      }

      for (const key in props.data) {
        data[key] = props.data[key]
      }

      loading.value = 1
      getArticleList(data).then(
        result => {
          loading.value = 2
          articleList.value = result.list
          pageSize.value = Number.parseInt(result.pageSize)
          page.value = Number.parseInt(result.page)
          totalSize.value = result.totalSize
          emit('success', result)
        },
        () => {
          loading.value = 3
        }
      )
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
      loading,
      page,
      pageSize,
      totalSize,
      handlePagination
    }
  }
})
</script>

<style lang="scss">
.s-article-list {
  &--status {
    padding: 50px 0;
  }
  &--pagination {
    margin-top: 50px;
  }
}
</style>
