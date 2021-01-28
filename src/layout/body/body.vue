<template>
  <div class="s-body">
    <main class="s-main"><slot /></main>
    <s-sidebar />
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import SSidebar from '@/layout/sidebar'
export default defineComponent({
  name: 'SBody',
  components: { SSidebar }
})
</script>

<style lang="scss" src="./body.scss"></style>
