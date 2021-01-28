<!--
 - @author: Storm
 - @date: 2021/01/20
 - @email: wenyejie@foxmail.com
 -->
<template>
  <div class="article-edit">
    <h1 class="page-title">{{ articleForm._id ? '编辑' : '新增' }}文章</h1>

    <s-form ref="articleFormElem" name="articleForm" @submit="handleSubmit">
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
          required
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
        <s-button native-type="reset" @click="handleRest">重置</s-button>
        <s-button native-type="submit">提交</s-button>
      </s-form-item>
    </s-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, watch, ref } from 'vue'
import { useRoute } from 'vue-router'
import { addArticle, getArticleDetail } from '@/apis/article'
import fetchTagList from '@/composition/fetchTagList'
import fetchCategoryList from '@/composition/fetchCategoryList'
import { localArticleEdit } from '@/storages'
import SFormItem from '@/components/formItem/FormItem.vue'

export default defineComponent({
  name: 'ArticleEdit',
  components: { SFormItem },
  setup() {
    // 表单
    const articleForm = reactive({
      title: '',
      content: '',
      tags: [],
      category: null
    })

    const articleFormElem = ref()

    const route = useRoute()

    const tagList = fetchTagList()

    const categoryList = fetchCategoryList()

    const handleSubmit = () => {
      addArticle(articleForm).then(
        () => {
          alert('文章创建成功!')
          articleFormElem.value.reset()
        },
        err => {
          console.error(err)
        }
      )
    }

    const handleRest = () => {
      console.log('rest')
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
        console.log(articleForm)
      })
    }

    return {
      articleFormElem,
      articleForm,
      handleRest,
      handleSubmit,
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
