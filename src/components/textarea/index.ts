import { defineAsyncComponent } from 'vue'

export default defineAsyncComponent(() =>
  import(/* webpackChunkName: 's-textarea' */ './textarea.vue')
)
