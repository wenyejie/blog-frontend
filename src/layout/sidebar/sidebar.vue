<template>
  <aside class="s-sidebar">
    <s-info />
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
import SInfo from './info'
export default defineComponent({
  name: 'SSidebar',
  components: { SLatest, STag, SHottest, SInfo }
})
</script>

<style lang="scss" src="./sidebar.scss"></style>
