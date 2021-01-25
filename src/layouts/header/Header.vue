<!--
 - @author: Storm
 - @date: 2021/01/20
 - @email: wenyejie@foxmail.com
 -->
<template>
  <header class="s-header">
    <hgroup>
      <h1 class="s-header--title">{{ title }}</h1>
      <h2 class="s-header--subtitle">{{ subtitle }}</h2>
    </hgroup>

    <s-nav />
  </header>
</template>

<script>
import { defineComponent, ref } from 'vue'
import SNav from './nav'

export default defineComponent({
  name: 'SHeader',
  components: {
    SNav
  },
  setup() {
    const title = ref(process.env.VUE_APP_TITLE)
    const subtitle = ref(process.env.VUE_APP_SUBTITLE)
    return {
      title,
      subtitle
    }
  }
})
</script>

<style lang="scss" src="./Header.scss"></style>
