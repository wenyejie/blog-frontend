<!--
 - @author: Storm
 - @date: 2021/01/20
 - @email: wenyejie@foxmail.com
 -->
<template>
  <s-article v-if="article._id" class="article-detail" :plain="false" :data="article" />
</template>

<script>
import { defineComponent, reactive } from 'vue'
import { useRoute } from 'vue-router'
import { getArticleDetail } from '@/apis/article'
export default defineComponent({
  name: 'ArticleDetail',
  setup() {
    const route = useRoute()
    const article = reactive({})

    getArticleDetail({ _id: Number.parseInt(route.params.id) }).then(result => {
      Object.assign(article, result)
    })

    return {
      article
    }
  }
})
</script>

<style lang="scss">
.article-detail {
}
</style>
