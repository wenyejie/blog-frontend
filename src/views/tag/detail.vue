<template>
  <h1 class="page-title">{{ $route.params.tagName }}</h1>
  <s-article-list :data="data" />
</template>

<script>
import { computed, defineComponent } from 'vue'
import { useRoute } from 'vue-router'
import { setPageTitle } from '@/utils'

export default defineComponent({
  name: 'TagDetail',
  setup() {
    const route = useRoute()
    const data = computed(() => {
      setPageTitle(route.params.tagName)
      return {
        tagName: route.params.tagName
      }
    })

    return {
      data
    }
  }
})
</script>
