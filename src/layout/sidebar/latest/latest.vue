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
import { defineComponent, computed } from 'vue'
import { useStore } from 'vuex'
import SSidebarItem from '../sidebarItem'

export default defineComponent({
  name: 'SLatest',
  components: { SSidebarItem },
  setup() {
    const store = useStore()
    const articleList = computed(() => store.getters.articleLatest)
    store.dispatch('articleLatest')

    return {
      articleList
    }
  }
})
</script>

<style lang="scss" src="./latest.scss"></style>
