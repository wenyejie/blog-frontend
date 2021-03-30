<template>
  <div class="s-date">
    <div class="s-date--top">
      <s-icon type="doubleleft" @click="handleSwitch(-1)" />
      <s-icon type="left" @click="handleSwitch(0, -1)" />
      <span>{{ innerYear }}年</span>
      <span>{{ innerMonth + 1 }}月</span>
      <s-icon type="doubleright" @click="handleSwitch(1)" />
      <s-icon type="right" @click="handleSwitch(0, 1)" />
    </div>
    <div class="s-date--body">
      <table class="s-date--table">
        <tr>
          <th v-for="item in weeks" :key="item.value">{{ item.label }}</th>
        </tr>
        <tr v-for="(item, index) in days" :key="index">
          <td
            v-for="subitem in item"
            :class="{
              'is-prev': subitem.prev,
              'is-next': subitem.next,
              'is-current': subitem.current,
              'is-today': subitem.value === view,
              'is-selected': subitem.selected
            }"
            :key="subitem.value"
            @click="handleClickDay(subitem)"
          >
            {{ subitem.value }}
          </td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script src="./date.js"></script>

<style lang="scss" src="./date.scss"></style>
