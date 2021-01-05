<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js + TypeScript App" />
    <button @click="open = !open">Button</button>
    <teleport to="body">
      <div class="dialog"></div>
    </teleport>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import HelloWorld from "@/components/HelloWorld.vue"; // @ is an alias to /src

@Options({
  components: {
    HelloWorld
  }
})
export default class Home extends Vue {
  open!: false;
}
</script>

<style scoped type="scss">
.dialog {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #fff;
  border: 1px solid #dcdcdc;
  width: 360px;
  height: 200px;
}
</style>
