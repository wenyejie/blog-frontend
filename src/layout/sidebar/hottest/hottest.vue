<template>
  <s-sidebar-item title="热门文章">
    <ol class="s-sidebar--list">
      <li v-for="item in articleList" :key="item._id">
        <router-link :to="`/article/${item._id}`" :title="item.title">{{ item.title }}</router-link>
      </li>
    </ol>
  </s-sidebar-item>
</template>

<script>
import { defineComponent, ref } from 'vue'
import { getArticleHottest } from '@/apis/article'
import SSidebarItem from '../sidebarItem'
export default defineComponent({
  name: 'SHottest',
  components: { SSidebarItem },
  setup() {
    const articleList = ref([])
    getArticleHottest().then(response => {
      articleList.value = response.list
    })
    return {
      articleList
    }
  }
})
</script>
