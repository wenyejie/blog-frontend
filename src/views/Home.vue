<template>
  <div class="home">
    <s-article v-for="item in articleList" :key="item._id" :data="item" />
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'
import { getArticleList } from '@/apis'

export default defineComponent({
  name: 'Home',
  setup() {
    const articleList: any[] = reactive([])

    getArticleList().then((list: any) => {
      return articleList.push(...list)
    })

    return {
      articleList
    }
  }
})
</script>
