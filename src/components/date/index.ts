import { defineAsyncComponent } from 'vue'

export default defineAsyncComponent(() => import(/* webpackChunkName: "s-date" */ './date.vue'))
