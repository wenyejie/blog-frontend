import { defineAsyncComponent } from 'vue'
export default defineAsyncComponent(() => import(/* webpackChunkName: 's-dialog' */ './dialog.vue'))
