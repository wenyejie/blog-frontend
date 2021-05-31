import { defineAsyncComponent } from 'vue'

export default defineAsyncComponent(() =>
  import(/* webpackChunkName: 'ad-comment' */ './comment.vue')
)
