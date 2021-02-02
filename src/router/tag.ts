import main from '@/views/main.vue'
import { RouteRecordRaw } from 'vue-router'

const tagRouter: RouteRecordRaw = {
  path: '/tag',
  component: main,
  meta: {
    title: '标签'
  },
  children: [
    {
      path: '',
      name: 'tag',
      component: () => import(/* webpackChunkName: 'r-tag' */ '@/views/tag/index.vue'),
      meta: {
        title: '标签管理'
      }
    },
    {
      path: ':tagName',
      name: 'tagDetail',
      component: () => import(/* webpackChunkName: "r-tag-detail" */ '@/views/tag/detail.vue'),
      meta: {
        title: '标签列表'
      }
    }
  ]
}

export default tagRouter
