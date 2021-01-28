<template>
  <h1 class="page-title">DEMO</h1>
  <s-form ref="formRef">
    <s-input name="name" v-model="formData.name" />
  </s-form>
</template>

<script>
import { defineComponent, reactive, ref } from 'vue'
export default defineComponent({
  name: 'demo',
  setup() {
    const formRef = ref(null)
    const formData = reactive({
      name: 'wneyejie'
    })

    setTimeout(() => {
      console.log(formRef, formRef.value)
      formRef.value.$el.reset()
    }, 1000)

    return {
      formRef,
      formData
    }
  }
})
</script>
