<template>
  <div class="article-edit">
    <h1 class="page-title">{{ articleForm._id ? '编辑' : '新增' }}文章</h1>

    <s-form name="articleForm" @submit="handleSubmit" @reset="handleReset">
      <s-form-item label="标题:">
        <s-input name="title" required v-model.trim="articleForm.title" />
      </s-form-item>
      <s-form-item label="分类:">
        <s-select
          name="category"
          required
          v-model="articleForm.category"
          :data="categoryList"
          placeholder="请选择分类"
        />
      </s-form-item>

      <s-form-item label="标签:">
        <s-select
          name="tag"
          v-model="articleForm.tags"
          multiple
          :data="tagList"
          :nativeSize="tagList.length"
        />
      </s-form-item>

      <s-form-item label="内容:">
        <s-editor name="content" required @input="contentChange" v-model="articleForm.content" />
      </s-form-item>

      <s-form-item label="状态:">
        <s-select
          name="state"
          placeholder="请选择文章状态"
          v-model="articleForm.state"
          :data="articleStates"
          valueKey="value"
          required
        >
        </s-select>
      </s-form-item>

      <s-form-item label-width="2em">
        <s-button native-type="reset">重置</s-button>
        <s-button native-type="submit">提交</s-button>
      </s-form-item>
    </s-form>
  </div>
</template>

<script>
import { defineComponent, reactive, watch } from 'vue'
import { useRoute } from 'vue-router'
import { addArticle, getArticleDetail, updateArticle } from '@/apis/article'
import fetchTagList from '@/composition/fetchTagList'
import fetchCategoryList from '@/composition/fetchCategoryList'
import { localArticleEdit } from '@/storages'
import $message from '@/components/message'
import { articleStates } from '@/datas'
import router from '@/router'

// 默认的文章表单
const DEFAULT_ARTICLE_FORM = {
  _id: 0,
  title: '',
  content: '',
  tags: [],
  state: 1,
  category: 7
}

export default defineComponent({
  name: 'ArticleEdit',
  data() {
    return {
      articleStates
    }
  },
  setup() {
    // 表单
    const articleForm = reactive(Object.assign({}, DEFAULT_ARTICLE_FORM))

    const route = useRoute()

    const tagList = fetchTagList()

    const categoryList = fetchCategoryList()

    const handleAddArticle = () => {
      addArticle(articleForm).then(
        article => {
          $message.success('文章发布成功!')
          localArticleEdit(null)
          router.push(`/article/${article._id}`)
        },
        err => {
          $message.success(err.message)
        }
      )
    }

    const handleUpdateArticle = () => {
      updateArticle(articleForm).then(() => {
        $message.success('文章更新成功!')
        localArticleEdit(null)
        router.push(`/article/${articleForm._id}`)
      })
    }

    const handleSubmit = () => {
      if (articleForm._id) {
        handleUpdateArticle()
      } else {
        handleAddArticle()
      }
    }

    const handleReset = () => {
      Object.assign(articleForm, DEFAULT_ARTICLE_FORM)
    }

    // 内容发生变更时, 自动提取标题
    const contentChange = () => {
      if (articleForm.title) {
        return
      }
      const regExec = /#\s+.+(?!=\n)/.exec(articleForm.content)
      if (regExec) {
        articleForm.title = regExec[0].replace(/^[\n\r]*#\s+/, '')
      } else {
        return
      }
      articleForm.content = articleForm.content.replace(/[\n\r]*#\s+.+(?!=\n)[\n\r]*/, '')
    }

    // 自动存储当前文章
    watch(
      () => articleForm,
      () => {
        localArticleEdit(articleForm)
      },
      {
        deep: true
      }
    )

    // 当本地存在缓存数据时, 载入当前缓存
    const localArticleForm = localArticleEdit()
    if (localArticleForm && localArticleForm._id === route.query.id) {
      Object.assign(articleForm, localArticleForm)
    }

    if (route.query.id) {
      getArticleDetail({ _id: Number.parseInt(route.query.id) }).then(result => {
        result.category = result.category._id
        result.tags = result.tags.map(tag => tag._id)
        Object.assign(articleForm, result)
      })
    }

    return {
      articleForm,
      handleSubmit,
      handleReset,
      contentChange,
      tagList,
      categoryList
    }
  }
})
</script>

<style lang="scss">
.article-edit {
  .s-input,
  .s-select {
    width: 360px;
  }
}
</style>
