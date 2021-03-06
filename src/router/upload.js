import main from '@/views/main.vue'

const uploadRouter = {
  path: '/upload',
  component: main,
  meta: {
    title: '上传'
  },
  children: [
    {
      path: '',
      name: 'upload',
      component: () => import(/* webpackChunkName: 'r-upload' */ '@/views/upload/index.vue'),
      meta: {
        title: '上传管理',
        needAuth: true
      }
    }
  ]
}

export default uploadRouter
