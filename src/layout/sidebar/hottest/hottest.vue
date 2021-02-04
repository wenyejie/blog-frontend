<template>
  <s-sidebar-item class="s-hottest" title="热门文章">
    <ol class="s-hottest--list">
      <li class="s-hottest--item" v-for="item in articleList" :key="item._id">
        <router-link class="s-hottest--link" :to="`/article/${item._id}`" :title="item.title">{{
          item.title
        }}</router-link>
      </li>
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
