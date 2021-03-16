<template>
  <div class="search">
    <h1 class="page-title search--title">搜索: {{ keyword }}</h1>
    <s-article v-for="item in articleList" :key="item._id" :data="item" />
    <div class="search--nodata" v-if="articleList.length === 0">
      {{ loading === 1 ? '正在加载中' : '暂无数据' }}...
    </div>
    <s-pagination v-model="page" :totalSize="totalSize" v-if="articleList.length" />
  </div>
</template>

<script>
import { defineComponent, ref, watch } from 'vue'
import { getArticleList } from '@/apis/article'
import { useRoute } from 'vue-router'
import { setPageTitle } from '@/utils'
import message from '@/components/message'

export default defineComponent({
  name: 'Search',
  setup() {
    const route = useRoute()
    const articleList = ref([])
    const pageSize = ref(10)
    const page = ref(1)
    const totalSize = ref(0)
    const keyword = ref(route.query.keyword || '')
    const loading = ref(0)

    const fetchArticleList = () => {
      if (!keyword.value) {
        message.warning('搜索关键字不能为空!')
        return
      }
      if (loading.value === 1) {
        return
      }
      loading.value = 1
      getArticleList({ keyword: keyword.value }).then(
        result => {
          loading.value = 2
          articleList.value = result.list
          pageSize.value = result.pageSize
          page.value = result.page
          totalSize.value = result.totalSize
        },
        () => {
          loading.value = 3
        }
      )
    }

    watch(
      () => route.query.keyword,
      value => {
        keyword.value = value
        fetchArticleList()
        setPageTitle(value)
      },
      {
        immediate: true
      }
    )

    return {
      keyword,
      page,
      pageSize,
      totalSize,
      articleList,
      loading
    }
  }
})
</script>

<style lang="scss" scoped>
.search {
  &--title {
    text-transform: uppercase;
  }
}
</style>
