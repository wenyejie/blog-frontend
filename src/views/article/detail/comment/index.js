import { defineAsyncComponent } from 'vue'

export default defineAsyncComponent(() =>
  import(/* webpackChunkName: 'article-detail-comment' */ './comment.vue')
)
