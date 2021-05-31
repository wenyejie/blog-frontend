<template>
  <div class="s-comment">
    <div class="s-comment--item" v-for="item in list" :key="item._id">
      <div class="s-comment--portrait">{{ firstLetter(item.nickname) }}</div>
      <div class="s-comment--c">
        <div class="s-comment--ct">
          <span class="s-comment--nickname">{{ item.nickname }}</span>
          <time class="s-comment--time">{{ handleDateTime(item.ctime) }}</time>
        </div>
        <div class="s-comment--content">{{ item.content }}</div>
      </div>
      <div class="s-comment--r" v-if="hasOperate">
        <s-button type="success" plain size="mini" block @click="handlePass(item)">通过</s-button>
        <s-button type="danger" plain size="mini" block @click="handleUnPass(item)"
          >不通过</s-button
        >
      </div>
    </div>

    <p v-if="loading !== 0" v-show="list.length === 0">
      {{ loading === 1 ? '正在加载中...' : '暂无数据' }}
    </p>

    <s-pagination
      class="s-comment--pagination"
      v-model="page"
      :pageSize="pageSize"
      :totalSize="totalSize"
      v-if="list.length"
      @change="handlePagination"
    />
  </div>
</template>

<script src="./comment.js"></script>

<style lang="scss" src="./comment.scss"></style>
