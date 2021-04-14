import { defineAsyncComponent } from 'vue'

export default defineAsyncComponent(() => import(/* webpackChunkName: 's-year' */ './year.vue'))
