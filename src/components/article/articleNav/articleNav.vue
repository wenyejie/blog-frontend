<template>
  <ul class="s-article-nav">
    <li v-for="(item, index) in data" :key="item.title" class="s-article-nav--item">
      <a
        :data-deep="`${parentIndex > 1 ? parentIndex + '.' : ''}${index + 1}`"
        :href="`#${item.id}`"
        >{{ item.title }}</a
      >
      <s-article-nav v-if="item.children" :data="item.children" :parentIndex="index + 1" />
    </li>
  </ul>
</template>

<script>
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'SArticleNav',
  props: {
    data: {
      type: Object,
      default: () => ({})
    },
    parentIndex: {
      type: Number,
      default: 1
    }
  }
})
</script>

<style lang="scss">
.s-article-nav {
  font-size: 16px;

  &::before {
    content: '目录';
    display: block;
    font-size: 1.285714286rem;
    line-height: 1.6;
    font-weight: bold;
  }

  &--item {
    margin-top: 0.5em;
    width: 100%;
    display: block;
    & > a {
      text-overflow: ellipsis;
      overflow: hidden;
      max-width: 100%;
      white-space: nowrap;
      display: block;
      &::before {
        content: attr(data-deep);
        display: inline-block;
        padding-right: 0.5em;
        min-width: 1em;
      }
    }

    .s-article-nav {
      padding-left: 1.1em;

      &::before {
        content: normal;
      }
    }
  }
}
</style>
