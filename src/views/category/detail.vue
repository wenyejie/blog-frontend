<template>
  <h1 class="page-title">{{ $route.params.categoryName }}</h1>
  <s-article-list :data="data" />
</template>

<script>
import { computed, defineComponent } from 'vue'
import { useRoute } from 'vue-router'
import { setPageTitle } from '@/utils'

export default defineComponent({
  name: 'CategoryDetail',
  setup() {
    const route = useRoute()
    const data = computed(() => {
      setPageTitle(route.params.categoryName)
      return {
        categoryName: route.params.categoryName
      }
    })

    return {
      data
    }
  }
})
</script>
