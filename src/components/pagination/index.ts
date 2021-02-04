import { defineAsyncComponent } from 'vue'

export default defineAsyncComponent(
  () => import(/* webpackChunkName: "s-pagination" */ './Pagination.vue')
)
