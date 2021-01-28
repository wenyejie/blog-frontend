<template>
  <aside class="s-sidebar">
    <s-latest />
  </aside>
</template>

<script>
import { defineComponent } from 'vue'
import SLatest from '@/layout/sidebar/latest'
export default defineComponent({
  name: 'SSidebar',
  components: { SLatest }
})
</script>

<style lang="scss" src="./sidebar.scss"></style>
