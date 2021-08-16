import { defineAsyncComponent } from 'vue'
export default defineAsyncComponent(
  /* webpackChunkName: "s-article-nav" */ () => import('./articleNav.vue')
)
