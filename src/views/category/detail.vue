<template>
  <div class="category">
    <h1 class="page-title category--title">{{ pageTitle }}</h1>
    <s-article v-for="item in articleList" :key="item._id" :data="item" />
    <div class="category--nodata" v-if="articleList.length === 0">暂无数据...</div>
    <s-pagination v-model="page" :totalSize="totalSize" v-if="articleList.length" />
  </div>
</template>

<script>
import { defineComponent, ref, watch } from 'vue'
import { getArticleList } from '@/apis/article'
import { useRoute } from 'vue-router'
import { setPageTitle } from '@/utils'

export default defineComponent({
  name: 'Category',
  setup() {
    const route = useRoute()
    const articleList = ref([])
    const pageSize = ref(10)
    const page = ref(1)
    const totalSize = ref(0)
    const pageTitle = ref('')

    const fetchArticleList = () => {
      getArticleList({ categoryName: route.params.categoryName }).then(result => {
        articleList.value = result.list
        pageSize.value = result.pageSize
        page.value = result.page - 1
        totalSize.value = result.totalSize
      })
    }

    watch(
      () => route.path,
      () => {
        fetchArticleList()
        pageTitle.value = route.params.categoryName
        setPageTitle(pageTitle.value)
      },
      {
        immediate: true
      }
    )

    return {
      pageTitle,
      page,
      pageSize,
      totalSize,
      articleList
    }
  }
})
</script>

<style lang="scss" scoped>
.category {
  &--title {
    text-transform: uppercase;
  }
}
</style>
