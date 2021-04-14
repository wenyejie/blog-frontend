<template>
  <div class="s-month s-datetime">
    <div class="s-datetime--tool">
      <s-icon type="doubleleft" @click="handleSwitch(-1)" />
      <span>{{ year }} 年</span>
      <s-icon type="doubleright" @click="handleSwitch(1)" />
    </div>
    <div class="s-datetime--body">
      <ol class="s-datetime--list">
        <li
          v-for="item in list"
          class="s-datetime--item"
          :class="{ 'is-active': year === innerYear && item === month }"
          :key="item"
          @click="handleClick(item)"
        >
          {{ monthCNs[item] }}月
        </li>
      </ol>
    </div>
  </div>
</template>

<script src="./month.js"></script>

<style lang="scss" src="./month.scss"></style>
<style lang="scss" src="../../styles/datetime.scss"></style>
