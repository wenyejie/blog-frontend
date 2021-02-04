<template>
  <s-sidebar-item title="热门文章">
    <ol>
      <li>热门文章</li>
    </ol>
  </s-sidebar-item>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { getArticleHottest } from '@/apis/article'
import { AnyObject } from '@/statement'
import SSidebarItem from '../sidebarItem'
export default defineComponent({
  name: 'SHottest',
  components: { SSidebarItem },
  setup() {
    const articleList = ref([])
    getArticleHottest().then((response: AnyObject) => {
      articleList.value = response.list
    })
    return {
      articleList
    }
  }
})
</script>

<style lang="scss" src="./hottest.scss"></style>
