import { defineAsyncComponent } from 'vue'
const SHottest = () => import(/* webpackChunkName: 's-hottest' */ './hottest.vue')

export default defineAsyncComponent(SHottest)
