<template>
  <s-sidebar-item title="最新文章">
    <ol class="s-sidebar--list">
      <li v-for="item in articleList" :key="item._id">
        <router-link :to="`/article/${item._id}`" :title="item.title">{{ item.title }}</router-link>
      </li>
    </ol>
  </s-sidebar-item>
</template>

<script>
import { defineComponent, computed } from 'vue'
import store from '@/store'
import SSidebarItem from '../sidebarItem'

export default defineComponent({
  name: 'SLatest',
  components: { SSidebarItem },
  setup() {
    const articleList = computed(() => store.getters.articleLatest)
    store.dispatch('articleLatest')

    return {
      articleList
    }
  }
})
</script>
