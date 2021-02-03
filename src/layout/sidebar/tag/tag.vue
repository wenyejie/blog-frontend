<template>
  <s-sidebar-item title="标签统计" class="s-tag">
    <ol class="s-tag--list">
      <li class="s-tag--item" v-for="item in tagList" :key="item._id">
        <router-link :to="`/tag/${item.label}`"
          >{{ item.label }}<span class="s-tag--count">{{ item.count }}</span></router-link
        >
      </li>
    </ol>
  </s-sidebar-item>
</template>

<script>
import { computed, defineComponent } from 'vue'
import { useStore } from 'vuex'
import SSidebarItem from '../sidebarItem'

export default defineComponent({
  name: 'STag',
  components: { SSidebarItem },
  setup() {
    const store = useStore()
    const tagList = computed(() => {
      return store.state.tag.countList
    })
    store.dispatch('getTagCount')

    return {
      tagList
    }
  }
})
</script>

<style lang="scss" src="./tag.scss"></style>
