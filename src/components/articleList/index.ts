import { defineAsyncComponent } from 'vue'

export default defineAsyncComponent(
  () => import(/* webpackChunkName: 's-article-list' */ './articleList.vue')
)
