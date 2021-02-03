<template>
  <div class="article-edit">
    <h1 class="page-title">{{ articleForm._id ? '编辑' : '新增' }}文章</h1>

    <s-form ref="articleFormRef" name="articleForm" @submit="handleSubmit" @reset="handleReset">
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
        <s-editor name="content" required v-model="articleForm.content" />
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

// 默认的文章表单
const DEFAULT_ARTICLE_FORM = {
  title: '',
  content: '',
  tags: [],
  category: 7
}

export default defineComponent({
  name: 'ArticleEdit',
  setup() {
    // 表单
    const articleForm = reactive(Object.assign({}, DEFAULT_ARTICLE_FORM))

    const articleFormRef = reactive()

    const route = useRoute()

    const tagList = fetchTagList()

    const categoryList = fetchCategoryList()

    const handleAddArticle = () => {
      addArticle(articleForm).then(
        () => {
          $message.success('文章发布成功!')
          localArticleEdit(null)
          articleFormRef.value.$el.reset()
        },
        err => {
          $message.success(err?.message)
        }
      )
    }

    const handleUpdateArticle = () => {
      updateArticle(articleForm).then(() => {
        $message.success('文章更新成功!')
        localArticleEdit(null)
        articleFormRef.value.$el.reset()
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
        result.category = result?.category?._id
        result.tags = result?.tags.map(tag => tag._id)
        Object.assign(articleForm, result)
      })
    }

    return {
      articleFormRef,
      articleForm,
      handleSubmit,
      handleReset,
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
    width: 300px;
  }
}
</style>
