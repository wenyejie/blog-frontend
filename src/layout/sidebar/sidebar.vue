<template>
  <aside class="s-sidebar">
    <s-latest />
    <s-tag />
    <s-hottest />
  </aside>
</template>

<script>
import { defineComponent } from 'vue'
import SLatest from './latest'
import STag from './tag'
import SHottest from './hottest'
export default defineComponent({
  name: 'SSidebar',
  components: { SLatest, STag, SHottest }
})
</script>

<style lang="scss" src="./sidebar.scss"></style>
