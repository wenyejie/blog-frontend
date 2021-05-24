import { defineComponent, reactive, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getArticleDetail } from '@/apis/article'
import { setPageTitle } from '@/utils'
import ArticleDetailComment from './comment.vue'

export default defineComponent({
  name: 'ArticleDetail',
  components: { ArticleDetailComment },
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
