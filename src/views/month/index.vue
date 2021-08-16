<template>
  <h1 class="page-title">{{ $route.params.year }}年{{ $route.params.month }}月</h1>
  <s-article-list :data="data" />
</template>

<script>
import { defineComponent, computed } from 'vue'
import { useRoute } from 'vue-router'
import { setPageTitle } from '@/utils'

export default defineComponent({
  name: 'Month',
  setup() {
    const route = useRoute()
    const data = computed(() => {
      setPageTitle(`${route.params.year}年${route.params.month}月`)
      return {
        year: +route.params.year,
        month: +route.params.month
      }
    })

    return {
      data
    }
  }
})
</script>
