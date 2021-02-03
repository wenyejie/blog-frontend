<template>
  <aside class="s-sidebar">
    <s-latest />
    <s-tag />
  </aside>
</template>

<script>
import { defineComponent } from 'vue'
import SLatest from './latest'
import STag from './tag'
export default defineComponent({
  name: 'SSidebar',
  components: { SLatest, STag }
})
</script>

<style lang="scss" src="./sidebar.scss"></style>
