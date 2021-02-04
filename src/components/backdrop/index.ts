import { defineAsyncComponent } from 'vue'
export default defineAsyncComponent(
  () => import(/* webpackChunkName: 's-backdrop' */ './backdrop.vue')
)
