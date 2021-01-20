<!--
 - @author: Storm
 - @date: 2021/01/20
 - @email: wenyejie@foxmail.com
 -->
<template>
  <header class="s-header">
    <hgroup>
      <h1 class="s-header--title">小业业的博客</h1>
      <h2 class="s-header--subtitle">一个前端开发者的技术博客</h2>
    </hgroup>

    <s-nav />
  </header>
</template>

<script>
import { defineComponent } from "vue";
import SNav from "./nav";

export default defineComponent({
  name: "SHeader",
  components: {
    SNav
  },
  setup() {
    return {};
  }
});
</script>

<style lang="scss" src="./Header.scss"></style>
