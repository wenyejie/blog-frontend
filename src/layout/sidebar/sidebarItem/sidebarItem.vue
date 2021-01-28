<template>
  <section class="s-sidebar-item">
    <h1 class="s-sidebar-item--title">{{ title }}</h1>
    <div class="s-sidebar-item--content"><slot /></div>
  </section>
</template>

<script>
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'SSidebarItem',
  props: {
    title: String
  }
})
</script>

<style lang="scss" src="./sidebarItem.scss"></style>
