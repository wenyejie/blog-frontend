import main from '@/views/main.vue'

const tagRouter = {
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
        title: '标签管理',
        needAuth: true
      }
    },
    {
      path: ':tagName',
      name: 'tagDetail',
      component: () => import(/* webpackChunkName: "r-tag-detail" */ '@/views/tag/detail.vue'),
      meta: {}
    }
  ]
}

export default tagRouter
