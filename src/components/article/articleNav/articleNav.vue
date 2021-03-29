<template>
  <ul class="s-article-nav">
    <li v-for="(item, index) in data" :key="item.title" class="s-article-nav--item">
      <a :data-deep="`${deep > 1 ? deep + '.' : ''}${index + 1}`" :href="`#${item.id}`">{{
        item.title
      }}</a>
      <s-article-nav v-if="item.children" :data="item.children" :deep="deep + 1" />
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
    deep: {
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
    & > a::before {
      content: attr(data-deep);
      display: inline-block;
      padding-right: 0.5em;
      min-width: 1em;
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
