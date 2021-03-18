<template>
  <div :class="classes" v-if="totalSize !== 0 || totalPage !== 0" class="s-pagination">
    <ul>
      <li v-if="hasInfo" class="s-pagination--info">
        <template v-if="totalSize">共{{ totalSize }}条;&nbsp;</template>
        <template v-if="innerPageSize">每页{{ innerPageSize }}条;&nbsp;</template>
        第{{ current }}页; 共{{ innerTotalPage }}页;
      </li>
      <li v-if="hasFirst" :class="{ 'is-disabled': current === 1 }" class="s-pagination--item">
        <a @click.prevent="togglePage(1)" :href="generatePath(1)">{{ firstText }}</a>
      </li>
      <li v-if="hasPrev" :class="{ 'is-disabled': current === 1 }" class="s-pagination--item">
        <a @click.prevent="togglePage(current - 1)" :href="generatePath(current - 1)">{{
          prevText
        }}</a>
      </li>
      <li
        v-if="hasPrevSizer"
        class="s-pagination--sizer s-pagination--item"
        @click="handleSizer(1)"
      >
        &hellip;
      </li>
      <template v-if="hasItem">
        <li
          v-for="item in list"
          :class="{ 'is-disabled': current === item, 'is-active': current === item }"
          :key="item"
          class="s-pagination--item"
        >
          <a @click.prevent="togglePage(item)" :href="generatePath(item)">{{ item }}</a>
        </li>
      </template>
      <li v-if="hasNextSizer" class="s-pagination--sizer s-pagination--item">
        <a @click.prevent="handleSizer(2)" :href="generatePath(2)">&hellip;</a>
      </li>
      <li
        v-if="hasNext"
        :class="{ 'is-disabled': current === innerTotalPage }"
        class="s-pagination--item"
      >
        <a @click.prevent="togglePage(current + 1)" :href="generatePath(current + 1)">{{
          nextText
        }}</a>
      </li>
      <li
        v-if="hasLast"
        :class="{ 'is-disabled': current === innerTotalPage }"
        class="s-pagination--item"
      >
        <a @click.prevent="togglePage(innerTotalPage)" :href="generatePath(innerTotalPage)">{{
          lastText
        }}</a>
      </li>
      <li v-if="hasPageSize" class="s-pagination--size">
        <select :size="size" v-model="innerPageSize" @change="handlePageSize">
          <option :value="10">10 条/页</option>
          <option :value="20">20 条/页</option>
          <option :value="30">30 条/页</option>
          <option :value="50">50 条/页</option>
          <option :value="100">100 条/页</option>
          <option :value="200">200 条/页</option>
        </select>
      </li>
      <li v-if="hasElevator" class="s-pagination--elevator">
        跳至
        <input
          :max="innerTotalPage"
          :min="1"
          :step="1"
          v-model.number="tier"
          type="number"
          @keyup.enter="startElevator"
          @change="startElevator"
        />页
      </li>
    </ul>
  </div>
</template>

<script src="./Pagination.js"></script>

<style lang="scss" src="./Pagination.scss"></style>
