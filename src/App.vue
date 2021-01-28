<template>
  <s-header />
  <router-view class="s-body" />
  <s-footer />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import SHeader from '@/layout/header'
import SFooter from '@/layout/footer'

export default defineComponent({
  name: 'App',
  components: {
    SHeader,
    SFooter
  }
})
</script>

<style lang="scss">
#app {
  background-color: #fff;
  margin: 50px 25px;
  padding: 0 40px;
  box-shadow: 0 2px 6px rgba(100, 100, 100, 0.3);
  border-radius: var(--border-radius);
}
</style>
