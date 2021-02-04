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
    <span class="s-nav--user" v-if="isLogin"
      >你好, {{ userInfo.account }}, <a href="javascript:;" @click="handleLogout">登出</a></span
    >
  </nav>
</template>

<script>
import { defineComponent, reactive, computed } from 'vue'
import { categoryList } from '@/datas'
import { useStore } from 'vuex'
import { logout } from '@/apis/user'
import $message from '@/components/message'
import { logoutAfter } from '@/utils'

export default defineComponent({
  name: 'SNav',
  setup() {
    const store = useStore()

    const userInfo = computed(() => store.getters.userInfo)

    const isLogin = computed(() => store.getters.isLogin)

    const handleLogout = () => {
      logout().then(() => {
        logoutAfter()
        $message.success('登出成功!')
      })
    }

    const navList = reactive([
      {
        label: 'home',
        to: '/'
      },
      ...categoryList.map(name => ({
        label: name,
        to: `/category/${name}`
      })),
      {
        label: 'about',
        to: '/about'
      }
    ])
    return {
      isLogin,
      userInfo,
      navList,
      handleLogout
    }
  }
})
</script>

<style lang="scss" src="./Nav.scss"></style>
