import { defineComponent, reactive, ref } from 'vue'
import { rEmail } from 'wenyejie'
import { addComment } from '@/apis/comment'
import $message from '@/components/message'

export default defineComponent({
  name: 'ArticleDetailComment',
  props: {
    articleId: Number
  },
  setup(props) {
    const refForm = ref()
    const regEmail = ref(rEmail)

    const form = reactive({
      nickname: '',
      email: '',
      website: '',
      content: ''
    })

    const handleRest = () => {
      form.nickname = ''
      form.email = ''
      form.website = ''
      form.content = ''
    }

    const submitComment = () => {
      const data = { ...form }
      data.articleId = props.articleId

      addComment(data).then(() => {
        $message.success('评论添加成功!')
        refForm.value.reset()
        handleRest()
      })
    }

    return {
      regEmail,
      refForm,
      form,
      submitComment
    }
  }
})
