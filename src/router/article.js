import main from '@/views/main.vue'

const articleRouter = {
  path: '/article',
  name: 'article',
  component: main,
  meta: {
    title: '文章'
  },
  children: [
    {
      path: '',
      redirect: { name: 'articleEdit' }
    },
    {
      path: ':id',
      name: 'articleDetail',
      component: () => import(/* webpackChunkName: "r-article-detail" */ '@/views/article/detail'),
      meta: {}
    },
    {
      path: 'edit',
      name: 'articleEdit',
      component: () => import(/* webpackChunkName: "r-article-edit" */ '@/views/article/edit.vue'),
      meta: {
        title: '文章编辑',
        neeAuth: true
      }
    }
  ]
}

export default articleRouter
