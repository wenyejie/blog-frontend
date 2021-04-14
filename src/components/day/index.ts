import { defineAsyncComponent } from 'vue'

export default defineAsyncComponent(() => import(/* s-day */ './day.vue'))
