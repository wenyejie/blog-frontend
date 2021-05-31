<template>
  <s-article v-if="article._id" class="article-detail" :plain="false" :data="article" />

  <h3 class="article-detail--comment-title">评论</h3>

  <s-comment :article-id="article._id" is-article />

  <article-detail-comment :article-id="article._id" />
</template>

<script src="./detail.js"></script>
<style lang="scss" src="./detail.scss"></style>
