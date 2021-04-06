<template>
  <h1 class="page-title">{{ $route.query.keyword }}</h1>
  <s-article-list :data="data" />
</template>

<script>
import { computed, defineComponent } from 'vue'
import { useRoute } from 'vue-router'
import { setPageTitle } from '@/utils'

export default defineComponent({
  name: 'Search',
  setup() {
    const route = useRoute()
    const data = computed(() => {
      setPageTitle(route.query.keyword)
      return {
        keyword: route.query.keyword
      }
    })

    return {
      data
    }
  }
})
</script>
