<template>
  <aside class="s-sidebar">
    <!--<s-info />-->
    <s-latest />
    <sidebar-tag />
    <s-hottest />
  </aside>
</template>

<script>
import { defineComponent } from 'vue'
import SLatest from './latest'
import SidebarTag from './tag'
import SHottest from './hottest'
// import SInfo from './info'
export default defineComponent({
  name: 'SSidebar',
  components: { SLatest, SidebarTag, SHottest }
})
</script>

<style lang="scss" src="./sidebar.scss"></style>
