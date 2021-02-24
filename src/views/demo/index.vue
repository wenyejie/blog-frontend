<template>
  <h1 class="page-title">DEMO</h1>

  <p>{{ demo }}</p>
  <s-checkbox v-model="demo" label="性别" :trueValue="1" :falseValue="2" />
  <p>{{ langs }}</p>
  <s-checkbox-group v-model="langs">
    <s-checkbox :value="1">HTML</s-checkbox>
    <s-checkbox :value="2">CSS</s-checkbox>
    <s-checkbox :value="3">JavaScript</s-checkbox>
  </s-checkbox-group>
</template>

<script>
import { defineComponent, reactive, ref } from 'vue'
import $dialog from '@/components/dialog'
export default defineComponent({
  name: 'demo',
  setup() {
    // const dialogVisible = ref(false)
    const demo = ref('')

    const langs = ref([])

    const handleClick = () => {
      // dialogVisible.value = !dialogVisible.value

      $dialog.alert('alert content', {
        title: 'alert title'
      })
    }
    // const dialogVisible = ref(false)

    const handleClick2 = () => {
      // dialogVisible.value = !dialogVisible.value

      $dialog.confirm('confirm content', {
        title: 'confirm title'
      })
    }

    return {
      demo,
      langs,
      handleClick,
      handleClick2
      // dialogVisible
    }
  }
})
</script>
