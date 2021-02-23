import { defineAsyncComponent } from 'vue'

export default defineAsyncComponent(() =>
  import(/* webpackChunkName: 's-sidebar-item' */ './sidebarItem.vue')
)
