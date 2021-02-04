<template>
  <s-article v-for="item in articleList" :key="item._id" :data="item" />
  <s-pagination v-model="page" :totalSize="totalSize" v-if="articleList.length" />
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

    getArticleList().then((result: any) => {
      articleList.value = result.list
      pageSize.value = result.pageSize
      page.value = result.page - 1
      totalSize.value = result.totalSize
    })

    return {
      articleList,
      page,
      pageSize,
      totalSize
    }
  }
})
</script>
