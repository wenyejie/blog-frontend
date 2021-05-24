<template>
  <s-article v-if="article._id" class="article-detail" :plain="false" :data="article" />
  <article-detail-comment />
</template>

<script src="./detail.js"></script>
<style lang="scss" src="./detail.scss"></style>
