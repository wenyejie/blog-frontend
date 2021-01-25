import { RouteRecordRaw } from 'vue-router'

const tagRouter: RouteRecordRaw = {
  path: '/category',
  name: 'category',
  component: () => import(/* webpackChunkName: "r-category" */ '@/views/Category.vue'),
  meta: {
    title: '分类'
  }
}

export default tagRouter
