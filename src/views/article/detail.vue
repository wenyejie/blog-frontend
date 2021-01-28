<!--
 - @author: Storm
 - @date: 2021/01/20
 - @email: wenyejie@foxmail.com
 -->
<template>
  <s-article v-if="article._id" class="article-detail" :plain="false" :data="article" />
</template>

<script>
import { defineComponent, reactive, watch } from 'vue'
import { useRoute } from 'vue-router'
import { getArticleDetail } from '@/apis/article'
import { setPageTitle } from '@/utils'
export default defineComponent({
  name: 'ArticleDetail',
  setup() {
    const route = useRoute()
    const article = reactive({})

    watch(
      () => route.params.id,
      () => {
        getArticleDetail({ _id: Number.parseInt(route.params.id) }).then(result => {
          Object.assign(article, result)
          setPageTitle(article.title)
        })
      },
      {
        immediate: true
      }
    )

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
