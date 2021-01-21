<!--
 - @author: Storm
 - @date: 2021/01/20
 - @email: wenyejie@foxmail.com
 -->
<template>
  <router-view />
</template>

<script>
import { defineComponent, ref } from 'vue'
export default defineComponent({
  name: 'Article',
  setup() {
    const editorValue = ref('')

    return {
      editorValue
    }
  }
})
</script>

<style lang="scss">
.article {
}
</style>
