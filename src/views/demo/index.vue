<template>
  <h1 class="page-title">DEMO</h1>

  <s-date v-model="demo" />
  <s-year />
  <div>{{ demo }}</div>

  <s-upload>上传文件</s-upload>
</template>

<script>
import { defineComponent, ref } from 'vue'
import SDate from '@/components/date'
import SYear from '@/components/year'
export default defineComponent({
  name: 'demo',
  components: { SDate, SYear },
  setup() {
    const demo = ref()

    return {
      demo
    }
  }
})
</script>
