<template>
  <s-day
    v-if="innerMode === 'day'"
    v-model="innerDate"
    :view-value="viewDate"
    @change="handleChange"
    @switch="handleSwitch"
  />
  <s-year
    v-if="innerMode === 'year'"
    v-model="innerDate"
    :view-value="viewDate"
    @change="handleChange"
    @switch="handleSwitch"
  />
  <s-month
    v-if="innerMode === 'month'"
    v-model="innerDate"
    :view-value="viewDate"
    @change="handleChange"
    @switch="handleSwitch"
  />
</template>

<script src="./date.js"></script>

<style lang="scss" src="./date.scss"></style>
