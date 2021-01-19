<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js + TypeScript App" />
    <s-input type="text" />
    <div>
      <s-button>测试组件</s-button>
      <s-button type="primary">测试组件</s-button>
      <s-button type="success">测试组件</s-button>
      <s-button type="danger">测试组件</s-button>
      <s-button type="warning">测试组件</s-button>
      <s-button type="info">测试组件</s-button>
    </div>
    <div>
      <s-button size="large">测试组件</s-button>
      <s-button type="primary">测试组件</s-button>
      <s-button size="small" type="success">测试组件</s-button>
      <s-button size="mini" type="danger">测试组件</s-button>
      <s-button type="warning">测试组件</s-button>
      <s-button type="info">测试组件</s-button>
    </div>
    <div>
      <s-button round size="large">测试组件</s-button>
      <s-button round type="primary">测试组件</s-button>
      <s-button round size="small" type="success">测试组件</s-button>
      <s-button round size="mini" type="danger">测试组件</s-button>
      <s-button round type="warning">测试组件</s-button>
      <s-button round type="info">测试组件</s-button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import HelloWorld from "@/components/HelloWorld.vue"; // @ is an alias to /src
import SInput from "@/components/input";
import SButton from "@/components/button";

export default defineComponent({
  name: "Home",
  components: {
    HelloWorld,
    SInput,
    SButton
  }
});
</script>
