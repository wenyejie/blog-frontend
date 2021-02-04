import { defineAsyncComponent } from 'vue'
export default defineAsyncComponent(
  () => import(/* webpackChunkName: "s-form-item" */ './FormItem.vue')
)
