import { defineComponent, ref, computed, watch } from 'vue'
import store from '@/store'
import { getCommentList, updateComment } from '@/apis/comment'
import { toNumber, dateFormat, removeItemByProp } from 'wenyejie'
import $message from '@/components/message'

export default defineComponent({
  name: 'SComment',
  props: {
    articleId: Number,
    isArticle: Boolean
  },
  setup(props) {
    const list = ref([])
    const pageSize = ref(10)
    const page = ref(1)
    const totalSize = ref(0)
    const loading = ref(0)

    const hasOperate = computed(() => store.getters.isLogin && !props.isArticle)

    const firstLetter = string => {
      return string.charAt()
    }

    const handleDateTime = dateString => {
      return dateFormat(dateString, 'YYYY-MM-DD hh:mm:ss')
    }

    const handlePass = item => {
      updateComment({
        _id: item._id,
        state: 1
      }).then(() => {
        $message.success('评论通过成功!')
        list.value = removeItemByProp(list.value, '_id', item._id)
      })
    }

    const handleUnPass = item => {
      updateComment({
        _id: item._id,
        state: 2
      }).then(() => {
        $message.success('评论不通过成功!')
        removeItemByProp(list, '_id', item._id)
      })
    }

    const handlePagination = () => {
      const data = {
        page: page.value,
        pageSize: pageSize.value,
        state: 0
      }

      // 获取文章下的通过评论
      if (props.articleId) {
        data.articleId = props.articleId
        data.state = 1
      }

      loading.value = 1
      getCommentList(data).then(
        result => {
          loading.value = 2
          list.value = result.list
          pageSize.value = toNumber(result.pageSize)
          page.value = toNumber(result.page)
          totalSize.value = result.totalSize
        },
        () => {
          loading.value = 3
        }
      )
    }

    watch(() => props.articleId, handlePagination, {
      immediate: true
    })

    return {
      list,
      page,
      pageSize,
      totalSize,
      loading,
      hasOperate,
      handlePagination,
      firstLetter,
      handleDateTime,
      handlePass,
      handleUnPass
    }
  }
})
