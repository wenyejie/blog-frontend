<template>
  <s-sidebar-item class="s-latest" title="最新文章">
    <ol class="s-latest--list">
      <li class="s-latest--item" v-for="item in articleList" :key="item._id">
        <router-link class="s-latest--link" :to="`/article/${item._id}`" :title="item.title">{{
          item.title
        }}</router-link>
      </li>
    </ol>
  </s-sidebar-item>
</template>

<script>
import { defineComponent, reactive } from 'vue'
import SSidebarItem from '../sidebarItem'
import { getArticleLatest } from '@/apis/article'

export default defineComponent({
  name: 'SLatest',
  components: { SSidebarItem },
  setup() {
    const articleList = reactive([])

    getArticleLatest().then(list => {
      articleList.push(...list)
    })

    return {
      articleList
    }
  }
})
</script>

<style lang="scss" src="./latest.scss"></style>
