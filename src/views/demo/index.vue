<template>
  <h1 class="page-title">DEMO</h1>
  <!--<s-message message="文章提交成功!" />-->
  <s-dialog v-model="dialogVisible" title="Dialog title" content="Dialog content" />
  <s-icon type="info" />
</template>

<script>
import { defineComponent, ref } from 'vue'
export default defineComponent({
  name: 'demo',
  setup() {
    const dialogVisible = ref(true)

    return {
      dialogVisible
    }
  }
})
</script>
