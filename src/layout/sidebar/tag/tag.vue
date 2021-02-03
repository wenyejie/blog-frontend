<template>
  <s-sidebar-item title="标签统计" class="s-tag">
    <ol class="s-tag--list">
      <li class="s-tag--item">
        <router-link to="/tag/javascript">javascript</router-link>
      </li>
      <li class="s-tag--item">
        <router-link to="/tag/javascript">javascript</router-link>
      </li>
    </ol>
  </s-sidebar-item>
</template>

<script>
import { defineComponent } from 'vue'
import SSidebarItem from '../sidebarItem'

export default defineComponent({
  name: 'STag',
  components: { SSidebarItem }
})
</script>

<style lang="scss" src="./tag.scss"></style>
