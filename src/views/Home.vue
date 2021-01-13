<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <!--<HelloWorld msg="Welcome to Your Vue.js + TypeScript App" />-->
    <!--<s-button round type="primary">测试组件</s-button>-->
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
// import HelloWorld from "@/components/HelloWorld.vue"; // @ is an alias to /src
// import SButton from "@/components/button";

export default defineComponent({
  name: "Home",
  components: {
    // HelloWorld,
    // SButton
  }
});
</script>
