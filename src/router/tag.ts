import { RouteRecordRaw } from 'vue-router'

const tagRouter: RouteRecordRaw = {
  path: '/tag',
  name: 'tag',
  component: () => import(/* webpackChunkName: "r-tag" */ '@/views/Tag.vue'),
  meta: {
    title: '标签'
  }
}

export default tagRouter
