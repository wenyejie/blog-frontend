import { defineAsyncComponent } from 'vue'
const STag = () => import(/* webpackChunkName: 's-tag' */ './tag.vue')

export default defineAsyncComponent(STag)
