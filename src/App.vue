<template>
  <s-header />
  <main class="s-main"><router-view /></main>
  <s-sidebar />
  <s-footer />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import SHeader from '@/layout/header'
import SFooter from '@/layout/footer'
import SSidebar from '@/layout/sidebar'
// import SBody from '@/layout/body'

export default defineComponent({
  name: 'App',
  components: {
    // SBody,
    SSidebar,
    SHeader,
    SFooter
  }
})
</script>

<style lang="scss">
#app {
  background-color: var(--light-color);
  margin: 50px 25px;
  padding: 0 40px;
  box-shadow: 0 2px 6px rgba(100, 100, 100, 0.3);
  border-radius: var(--border-radius);
  min-width: 1200px;
  display: grid;
  grid-template-columns: repeat(24, 1fr);
  grid-column-gap: 30px;
}

.s-header {
  grid-column: 1 / 25;
}
.s-main {
  grid-column: 1 / 19;
}
.s-sidebar {
  grid-column: 19 / 25;
}
.s-footer {
  grid-column: 1 / 25;
}
</style>
