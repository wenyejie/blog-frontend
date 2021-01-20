<template>
  <s-header />
  <router-view />
  <s-footer />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import SHeader from "@/layouts/header";
import SFooter from "@/layouts/footer";

export default defineComponent({
  components: {
    SHeader,
    SFooter
  }
});
</script>

<style lang="scss">
#app {
  max-width: 1040px;
  min-width: 320px;
  background-color: #fff;
  margin: 50px auto;
  padding: 0 40px;
  box-shadow: 0 2px 6px rgba(100, 100, 100, 0.3);
  border-radius: var(--border-radius);
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
