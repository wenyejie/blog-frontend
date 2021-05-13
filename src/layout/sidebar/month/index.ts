import { defineAsyncComponent } from 'vue'

export default defineAsyncComponent(() =>
  import(/* webpackChunkName: 'sidebar-month' */ './month.vue')
)
