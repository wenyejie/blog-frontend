import { defineAsyncComponent } from 'vue'

export default defineAsyncComponent(
  () => import(/* webpackChunkName: 's-chosen-item' */ './chosenItem.vue')
)
