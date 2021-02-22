<template>
  <s-sidebar-item class="s-info" title="个人信息">
    <table class="s-info--table">
      <tr>
        <th>姓名:</th>
        <td>温业杰</td>
      </tr>
      <tr>
        <th>出生:</th>
        <td>1990-04-07</td>
      </tr>
      <tr>
        <th>籍贯:</th>
        <td>广东省梅州市</td>
      </tr>
      <tr>
        <th>职业:</th>
        <td>WEB前端开发工程师</td>
      </tr>
      <tr>
        <th>爱好:</th>
        <td>写写代码, 玩玩游戏</td>
      </tr>
      <!--<tr>
        <th>格言:</th>
        <td>代码即世界. 世界亦代码.</td>
      </tr>-->
    </table>
  </s-sidebar-item>
</template>

<script>
import { defineComponent } from 'vue'
import SSidebarItem from '../sidebarItem'
export default defineComponent({
  name: 'SInfo',
  components: { SSidebarItem }
})
</script>

<style lang="scss" src="./info.scss"></style>
