import { defineAsyncComponent } from 'vue'

export default defineAsyncComponent(() =>
  import(/* webpackChunkName: "s-checkbox-group" */ './checkboxGroup.vue')
)
