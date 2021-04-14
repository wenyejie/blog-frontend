<template>
  <div class="s-day s-datetime">
    <div class="s-datetime--tool">
      <s-icon type="doubleleft" @click="handleSwitch(-1)" />
      <s-icon type="left" @click="handleSwitch(0, -1)" />
      <span class="s-datetime--tool--btn" @click="handleSwitchYear">{{ year }}年</span>
      <span class="s-datetime--tool--btn" @click="handleSwitchMonth">{{ month + 1 }}月</span>
      <s-icon type="doubleright" @click="handleSwitch(1)" />
      <s-icon type="right" @click="handleSwitch(0, 1)" />
    </div>
    <div class="s-datetime--body">
      <table class="s-datetime--table">
        <tr class="s-day--header">
          <th v-for="item in weeks" :key="item.value">{{ item.label }}</th>
        </tr>
        <tr class="s-day--row" v-for="(item, index) in list" :key="index">
          <td
            class="s-day--cell"
            v-for="subitem in item"
            :class="{
              'is-current': subitem.current,
              'is-today': subitem.today,
              'is-active': subitem.active
            }"
            :key="subitem.day"
            @click="handleClick(subitem)"
          >
            <span>{{ subitem.day }}</span>
          </td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script src="./day.js"></script>

<style lang="scss" src="./day.scss"></style>
<style lang="scss" src="../../styles/datetime.scss"></style>
