<template>
  <h1 class="page-title">DEMO</h1>
  <s-dialog v-model="dialogVisible" title="Dialog title" content="Dialog content" />
  <s-button @click="handleClick">Toggle Dialog</s-button>
</template>

<script>
import { defineComponent, ref } from 'vue'
export default defineComponent({
  name: 'demo',
  setup() {
    const dialogVisible = ref(false)

    const handleClick = () => {
      dialogVisible.value = !dialogVisible.value
    }

    return {
      handleClick,
      dialogVisible
    }
  }
})
</script>
