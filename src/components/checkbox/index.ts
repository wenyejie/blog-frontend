import { defineAsyncComponent } from 'vue'

export default defineAsyncComponent(
  () => import(/* webpackChunkName: "s-checkbox" */ './checkbox.vue')
)
