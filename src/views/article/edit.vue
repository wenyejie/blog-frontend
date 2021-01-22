<!--
 - @author: Storm
 - @date: 2021/01/20
 - @email: wenyejie@foxmail.com
 -->
<template>
  <div class="article-edit">
    <fieldset>
      <legend>创建文章</legend>

      <form name="form" @submit.stop>
        <label>标题: <s-input v-model="form.title"/></label>

        <label>分类: <s-input v-model="form.category"/></label>

        <label>标签: <s-input v-model="form.tag"/></label>

        <s-editor v-model="form.content" />

        <s-button @click="submitArticle">提交</s-button>
      </form>
    </fieldset>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive } from 'vue'
import { addArticle } from '@/apis/article'

export default defineComponent({
  name: 'ArticleEdit',
  setup() {
    // 表单
    const form = reactive({
      title: '',
      content: '',
      tag: '',
      category: ''
    })

    const submitArticle = () => {
      console.log('提交文章', form)
      addArticle(form).then(
        () => {
          alert('文章创建成功!')
        },
        err => {
          console.error(err)
        }
      )
    }

    return {
      form,
      submitArticle
    }
  }
})
</script>

<style lang="scss">
.article-edit {
}
</style>
