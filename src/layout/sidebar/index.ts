import { defineAsyncComponent } from 'vue'

export default defineAsyncComponent(
  () => import(/* webpackChunkName: 's-sidebar' */ './sidebar.vue')
)
