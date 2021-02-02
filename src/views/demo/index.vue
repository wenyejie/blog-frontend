<template>
  <h1 class="page-title">DEMO</h1>
  <s-form ref="formRef">
    <s-input name="name" v-model="formData.name" />
  </s-form>
  <s-message message="文章提交成功!" />
  <s-icon type="info" />
</template>

<script>
import { defineComponent, reactive, ref } from 'vue'
import { $success } from '@/components/message'
export default defineComponent({
  name: 'demo',
  setup() {
    const formRef = ref(null)
    const formData = reactive({
      name: 'wneyejie'
    })

    // console.log(SMessage)
    $success('你好')

    setTimeout(() => {
      formRef.value.$el.reset()
    }, 1000)

    return {
      formRef,
      formData
    }
  }
})
</script>
