import { defineAsyncComponent } from 'vue'
const SSidebar = () => import(/* webpackChunkName: 's-sidebar' */ './sidebar.vue')

export default defineAsyncComponent(SSidebar)
