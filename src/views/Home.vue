<template>
  <s-article v-for="item in articleList" :key="item._id" :data="item" />
  <s-pagination
    v-model="page"
    :pageSize="pageSize"
    :totalSize="totalSize"
    v-if="articleList.length"
    @change="handlePagination"
  />
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { getArticleList } from '@/apis/article'

export default defineComponent({
  name: 'Home',
  setup() {
    const articleList = ref([])
    const pageSize = ref(10)
    const page = ref(1)
    const totalSize = ref(0)

    const handlePagination = () => {
      getArticleList({
        page: page.value,
        pageSize: pageSize.value
      }).then((result: any) => {
        articleList.value = result.list
        pageSize.value = Number.parseInt(result.pageSize)
        page.value = Number.parseInt(result.page)
        totalSize.value = result.totalSize
      })
    }

    handlePagination()

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
