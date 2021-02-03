<template>
  <div class="tag">
    <h1 class="page-title tag--title">{{ pageTitle }}</h1>
    <s-article v-for="item in articleList" :key="item._id" :data="item" />
    <div class="tag--nodata" v-if="articleList.length === 0">暂无数据...</div>
    <s-pagination v-model="page" :totalSize="totalSize" v-if="articleList.length" />
  </div>
</template>

<script>
import { defineComponent, ref, watch } from 'vue'
import { getArticleList } from '@/apis/article'
import { useRoute } from 'vue-router'

export default defineComponent({
  name: 'TagDetail',
  setup() {
    const route = useRoute()
    const articleList = ref([])
    const pageSize = ref(10)
    const page = ref(1)
    const totalSize = ref(0)
    const pageTitle = ref('')

    const fetchArticleList = () => {
      getArticleList({ tagName: pageTitle.value }).then(result => {
        articleList.value = result.list
        pageSize.value = result.pageSize
        page.value = result.page - 1
        totalSize.value = result.totalSize
      })
    }

    watch(
      () => route.path,
      () => {
        pageTitle.value = route.params.tagName
        fetchArticleList()
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
.tag {
  &--title {
    text-transform: uppercase;
  }
}
</style>
