import main from '@/views/main.vue'
import { RouteRecordRaw } from 'vue-router'

const categoryRouter: RouteRecordRaw = {
  path: '/category',
  component: main,
  meta: {
    title: '分类'
  },
  children: [
    {
      path: '',
      name: 'category',
      component: () => import(/* webpackChunkName: 'r-category' */ '@/views/category/index.vue'),
      meta: {
        title: '分类管理',
        needAuth: true
      }
    },
    {
      path: ':categoryName',
      name: 'categoryDetail',
      component: () =>
        import(/* webpackChunkName: "r-category-detail" */ '@/views/category/detail.vue'),
      meta: {}
    }
  ]
}

export default categoryRouter
