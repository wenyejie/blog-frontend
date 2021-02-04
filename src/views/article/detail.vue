<template>
  <s-article v-if="article._id" class="article-detail" :plain="false" :data="article" />
</template>

<script>
import { defineComponent, reactive, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
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
        if (route.name !== 'articleDetail') {
          return
        }
        getArticleDetail({ _id: Number.parseInt(route.params.id) }).then(
          result => {
            Object.assign(article, result)
            setPageTitle(article.title)
          },
          () => {
            useRouter().go(-1)
          }
        )
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
