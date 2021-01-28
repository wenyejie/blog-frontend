<template>
  <div class="category">
    <s-article v-for="item in articleList" :key="item._id" :data="item" />
    <s-pagination v-model="page" :totalSize="totalSize" v-if="articleList.length" />
  </div>
</template>

<script>
import { defineComponent, ref, watch } from 'vue'
import { getArticleList } from '@/apis/article'
import { useRoute } from 'vue-router'

export default defineComponent({
  name: 'Category',
  setup() {
    const route = useRoute()
    const articleList = ref([])
    const pageSize = ref(10)
    const page = ref(1)
    const totalSize = ref(0)

    const fetchArticleList = () => {
      getArticleList({ category: route.meta._id }).then(result => {
        articleList.value = result.list
        pageSize.value = result.pageSize
        page.value = result.page - 1
        totalSize.value = result.totalSize
      })
    }

    watch(() => route.path, fetchArticleList, {
      immediate: true
    })

    return {
      page,
      pageSize,
      totalSize,
      articleList
    }
  }
})
</script>

<style lang="scss" scoped></style>
