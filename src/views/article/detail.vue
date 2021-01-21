<!--
 - @author: Storm
 - @date: 2021/01/20
 - @email: wenyejie@foxmail.com
 -->
<template>
  <div class="article-detail">
    article detail
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue'
export default defineComponent({
  name: 'ArticleDetail',
  setup() {
    const editorValue = ref('')

    return {
      editorValue
    }
  }
})
</script>

<style lang="scss">
.article-detail {
}
</style>
