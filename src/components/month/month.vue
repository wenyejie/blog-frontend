<template>
  <div class="s-month s-datetime">
    <div class="s-datetime--tool">
      <s-icon type="doubleleft" @click="handleSwitch(-1)" />
      <span>{{ innerYear }} 年</span>
      <s-icon type="doubleright" @click="handleSwitch(1)" />
    </div>
    <div class="s-datetime--body">
      <ol class="s-datetime--list">
        <li
          v-for="item in monthList"
          class="s-datetime--item"
          :class="{ 'is-active': viewYear === innerYear && item.month === innerMonth }"
          :key="item.month"
          @click="handleClick(item)"
        >
          {{ item.cn }}月
        </li>
      </ol>
    </div>
  </div>
</template>

<script src="./month.js"></script>

<style lang="scss" src="../../styles/datetime.scss"></style>
<style lang="scss" src="./month.scss"></style>
