<template>
  <s-form class="adc--form" name="adcForm" ref="refForm" @submit="submitComment">
    <s-form-item label="昵称">
      <s-input
        name="nickname"
        placeholder="请输入昵称"
        required
        minlength="2"
        maxlength="10"
        v-model.trim="form.nickname"
      />
    </s-form-item>
    <s-form-item label="邮箱">
      <s-input
        name="email"
        placeholder="请输入邮箱"
        v-model.trim="form.email"
        :pattern="regEmail"
      />
    </s-form-item>
    <s-form-item label="网址">
      <s-input name="website" placeholder="请输入网址" v-model.trim="form.website" />
    </s-form-item>
    <s-form-item label="内容">
      <s-textarea
        name="content"
        placeholder="请输入内容"
        required
        v-model.trim="form.content"
        block
        :rows="5"
      />
    </s-form-item>

    <s-form-item label="&emsp;&emsp;">
      <s-button native-type="submit">提交</s-button>
    </s-form-item>
  </s-form>
</template>

<script src="./comment.js"></script>

<style lang="scss" scoped>
.adc {
  &--form {
    max-width: 720px;
    margin-top: 5em;
    padding-top: 5em;
    border-top: 1px solid var(--border-color);
  }
}
</style>
