import { defineAsyncComponent } from 'vue'

export default defineAsyncComponent(() => import(/* webpackChunkName: 's-month' */ './month.vue'))
