import { defineAsyncComponent } from 'vue'

export default defineAsyncComponent(() => import(/* webpackChunkName: "s-input" */ './Input.vue'))
