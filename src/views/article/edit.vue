<!--
 - @author: Storm
 - @date: 2021/01/20
 - @email: wenyejie@foxmail.com
 -->
<template>
  <div class="article-edit">
    <s-editor v-model="editorValue" />

    111: {{ editorValue }}

    <s-button @click="submitArticle">提交</s-button>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'ArticleEdit',
  setup() {
    const submitArticle = () => {
      console.log('提交')
    }
    const editorValue = ref('')
    return {
      editorValue,
      submitArticle
    }
  }
})
</script>

<style lang="scss">
.article-edit {
}
</style>
