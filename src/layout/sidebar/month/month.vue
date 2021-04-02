<template>
  <s-sidebar-item title="每月统计">
    <ol class="s-sidebar--list">
      <li class="s-month--item" v-for="(item, index) in list" :key="index">
        <router-link :to="`/month/${item.year}-${item.month}`"
          >{{ item.year }}年{{ item.month }}月
          <span class="s-month--count">{{ item.count }}</span></router-link
        >
      </li>
    </ol>
  </s-sidebar-item>
</template>

<script>
import { defineComponent, ref } from 'vue'
import SSidebarItem from '../sidebarItem'
import { getArticleCountByMonth } from '@/apis/article'
export default defineComponent({
  name: 'SidebarMonth',
  components: { SSidebarItem },
  setup() {
    const list = ref([])

    getArticleCountByMonth().then(response => {
      list.value = response.list
    })

    return {
      list
    }
  }
})
</script>

<style lang="scss" src="./month.scss"></style>
