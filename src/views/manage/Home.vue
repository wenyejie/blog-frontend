<template>
  <div class="manage">
    <h1 class="page-title">管理</h1>
    <ul>
      <li><router-link to="/manage/tag">标签管理</router-link></li>
      <li><router-link to="/manage/category">分类管理</router-link></li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Manage'
})
</script>

<style lang="scss" scoped></style>
