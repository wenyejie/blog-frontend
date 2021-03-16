<!--
 - @author: Storm
 - @date: 2021/01/20
 - @email: wenyejie@foxmail.com
 -->
<template>
  <header class="s-header">
    <div class="s-header--top">
      <hgroup>
        <h1 class="s-header--title">{{ title }}</h1>
        <h2 class="s-header--subtitle">{{ subtitle }}</h2>
      </hgroup>

      <s-input
        v-model="keyword"
        class="s-nav--search"
        @enter="handleSearch"
        suffix-icon="search"
        placeholder="请输入关键字"
      />
    </div>

    <s-nav />
  </header>
</template>

<script>
import { defineComponent, ref } from 'vue'
import SNav from './nav'
import router from '@/router'

export default defineComponent({
  name: 'SHeader',
  components: {
    SNav
  },
  setup() {
    const title = ref(process.env.VUE_APP_TITLE)
    const subtitle = ref(process.env.VUE_APP_SUBTITLE)
    const keyword = ref('')

    const handleSearch = () => {
      router.push({
        path: 'search',
        query: {
          keyword: keyword.value
        }
      })
    }

    return {
      title,
      subtitle,
      keyword,
      handleSearch
    }
  }
})
</script>

<style lang="scss" src="./Header.scss"></style>
