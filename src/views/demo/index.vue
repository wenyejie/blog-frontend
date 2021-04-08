<template>
  <h1 class="page-title">DEMO</h1>

  <s-date v-model="demo" />
  <div>{{ demo }}</div>

  <s-upload>上传文件</s-upload>
</template>

<script>
import { defineComponent, ref } from 'vue'
import SDate from '@/components/date'
export default defineComponent({
  name: 'demo',
  components: { SDate },
  setup() {
    const demo = ref()

    return {
      demo
    }
  }
})
</script>
