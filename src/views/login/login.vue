<template>
  <h1 class="page-title">Login</h1>
  <s-form ref="loginFormRef" name="loginForm" @submit="handleLoginSubmit">
    <s-form-item label="账号:">
      <s-input
        name="account"
        required
        minlength="4"
        maxlength="18"
        v-model="loginForm.account"
        placeholder="请输入登录账号"
      />
    </s-form-item>
    <s-form-item label="密码:">
      <s-input
        type="password"
        name="password"
        required
        minlength="6"
        maxlength="18"
        v-model="loginForm.password"
        placeholder="请输入登录密码"
      ></s-input>
    </s-form-item>
    <s-form-item labelWidth="2em">
      <s-button native-type="reset">重置</s-button>
      <s-button native-type="submit">登录</s-button>
    </s-form-item>
  </s-form>
</template>

<script lang="ts">
import { defineComponent, ref, reactive } from 'vue'
import { login } from '@/apis/user'
import { LoginParams } from '@/statement'
import encrypt from '@/core/encrypt'

const DEFAULT_LOGIN_FORM: LoginParams = {
  account: '',
  password: ''
}
export default defineComponent({
  name: 'Login',
  setup() {
    const logging = ref(false)
    const loginFormRef = reactive({})
    const loginForm = reactive(Object.assign({}, DEFAULT_LOGIN_FORM))

    const handleLoginSubmit = () => {
      const params = { ...loginForm }
      params.password = encrypt(params.password)
      console.log(params)
      login(loginForm).then(user => {
        console.log(user)
      })
    }

    return {
      logging,
      loginFormRef,
      loginForm,
      handleLoginSubmit
    }
  }
})
</script>

<style lang="scss" src="./login.scss"></style>
