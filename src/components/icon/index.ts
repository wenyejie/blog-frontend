import { defineAsyncComponent } from 'vue'
export default defineAsyncComponent(() => import(/* webpackChunkName: 's-icon' */ './icon.vue'))
