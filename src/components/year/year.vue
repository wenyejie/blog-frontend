<template>
  <div class="s-year s-datetime">
    <div class="s-datetime--tool">
      <s-icon type="doubleleft" @click="handleSwitch(-10)" />
      <span>{{ year }} 年 - {{ year + 9 }} 年</span>
      <s-icon type="doubleright" @click="handleSwitch(10)" />
    </div>
    <div class="s-datetime--body">
      <ol class="s-datetime--list">
        <li
          v-for="item in list"
          class="s-datetime--item"
          :class="{ 'is-active': item === innerYear }"
          :key="item"
          @click="handleClick(item)"
        >
          {{ item }}
        </li>
      </ol>
    </div>
  </div>
</template>

<script src="./year.js"></script>

<style lang="scss" src="../../styles/datetime.scss"></style>
<style lang="scss" src="./year.scss"></style>
