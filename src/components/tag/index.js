import { defineAsyncComponent } from 'vue'

export default defineAsyncComponent(() => import(/* webpackChunkName: 's-tag' */ './tag.vue'))
