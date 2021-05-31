import { RouteRecordRaw } from 'vue-router'

const commentRouter: RouteRecordRaw = {
  path: '/comment',
  name: 'comment',
  component: () => import(/* webpackChunkName: 'r-comment' */ '@/views/comment'),
  meta: {
    title: '评论',
    needAuth: true
  }
}

export default commentRouter
