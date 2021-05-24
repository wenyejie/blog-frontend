import { defineAsyncComponent } from 'vue'
export default defineAsyncComponent(() => import(/* webpackChunkName: "s-form" */ './form.vue'))
