<template>
  <s-form class="adc--form" name="adcForm" ref="refForm">
    <s-form-item label="昵称">
      <s-input
        name="username"
        placeholder="请输入昵称"
        required
        minlength="2"
        maxlength="10"
        v-model.trim="form.username"
      />
    </s-form-item>
    <s-form-item label="邮箱">
      <s-input name="email" v-model.trim="form.email" :pattern="regEmail" />
    </s-form-item>
    <s-form-item label="网站">
      <s-input name="website" v-model.trim="form.website" />
    </s-form-item>
    <s-form-item label="内容">
      <s-textarea name="content" required v-model.trim="form.content" block :rows="5" />
    </s-form-item>

    <s-form-item label="&emsp;&emsp;">
      <s-button native-type="submit">提交</s-button>
    </s-form-item>
  </s-form>
</template>

<script>
import { defineComponent, reactive, ref } from 'vue'
import { rEmail } from 'wenyejie'

export default defineComponent({
  name: 'ArticleDetailComment',
  props: {},
  setup(props) {
    const refForm = ref()
    const regEmail = ref(rEmail)

    const form = reactive({
      username: '',
      email: '',
      website: '',
      content: ''
    })

    return {
      regEmail,
      refForm,
      form
    }
  }
})
</script>

<style lang="scss" scoped>
.adc {
  &--form {
    max-width: 720px;
  }
}
</style>
