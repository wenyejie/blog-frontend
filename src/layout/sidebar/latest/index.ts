import { defineAsyncComponent } from 'vue'
const SLatest = () => import(/* webpackChunkName: 's-latest' */ './latest.vue')

export default defineAsyncComponent(SLatest)
