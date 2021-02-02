<template>
  <s-article v-for="item in articleList" :key="item._id" :data="item" />
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'
import { getArticleList } from '@/apis/article'

export default defineComponent({
  name: 'Home',
  setup() {
    const articleList: any[] = reactive([])

    getArticleList().then((result: any) => {
      return articleList.push(...result.list)
    })

    return {
      articleList
    }
  }
})
</script>
