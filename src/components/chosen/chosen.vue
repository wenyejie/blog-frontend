<template>
  <div class="s-chosen" :class="classes">
    <div class="s-chosen--view">
      <ul class="s-chosen--tags" v-if="multiple">
        <template v-for="item in innerData" :key="item.$value">
          <li class="s-chosen--tag" v-show="item.$selected">
            {{ item.$label }}<span class="s-chosen--close" @click="handleClose(item)">×</span>
          </li>
        </template>
      </ul>
      <s-input class="s-chosen--input" />
    </div>
    <ul class="s-chosen--list">
      <template v-for="item in innerData" :key="item.$value">
        <li class="s-chosen--item" v-show="item.$filtered">
          {{ item.$label }}
        </li>
      </template>
    </ul>
  </div>
</template>

<script src="./chosen.js"></script>

<style lang="scss" src="./chosen.scss"></style>
