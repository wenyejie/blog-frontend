import { defineAsyncComponent } from 'vue'
const SSidebarItem = () => import(/* webpackChunkName: 's-sidebar-item' */ './sidebarItem.vue')

export default defineAsyncComponent(SSidebarItem)
