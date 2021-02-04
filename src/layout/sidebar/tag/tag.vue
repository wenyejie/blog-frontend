<template>
  <s-sidebar-item title="标签统计" class="s-tag">
    <ol class="s-tag--list">
      <li class="s-tag--item" v-for="item in tagCounts" :key="item._id">
        <router-link :to="`/tag/${item.label}`"
          >{{ item.label }}<span class="s-tag--count">{{ item.count }}</span></router-link
        >
      </li>
    </ol>
  </s-sidebar-item>
</template>

<script>
import { computed, defineComponent } from 'vue'
import store from '@/store'
import SSidebarItem from '../sidebarItem'

export default defineComponent({
  name: 'STag',
  components: { SSidebarItem },
  setup() {
    const tagCounts = computed(() => store.getters.tagCounts)
    store.dispatch('tagCounts')

    return {
      tagCounts
    }
  }
})
</script>

<style lang="scss" src="./tag.scss"></style>
