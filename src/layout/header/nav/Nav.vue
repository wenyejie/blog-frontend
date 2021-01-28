<!--
 - @author: Storm
 - @date: 2021/01/20
 - @email: wenyejie@foxmail.com
 -->
<template>
  <nav class="s-nav">
    <ul class="s-nav--list">
      <li class="s-nav--item" v-for="item in navList" :key="item.to">
        <router-link class="s-nav--link" :to="item.to">{{ item.label }}</router-link>
      </li>
    </ul>
  </nav>
</template>

<script>
import { defineComponent, reactive } from 'vue'
import { categoryList } from '@/datas'

export default defineComponent({
  name: 'SNav',
  setup() {
    const navList = reactive([
      {
        label: '首页',
        to: '/'
      },
      ...categoryList.map(name => ({
        label: name,
        to: `/category/${name}`
      })),
      {
        label: '关于',
        to: '/about'
      }
    ])
    return {
      navList
    }
  }
})
</script>

<style lang="scss" src="./Nav.scss"></style>
