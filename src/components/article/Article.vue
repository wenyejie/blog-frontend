<!--
 - @author: Storm
 - @date: 2021/01/20
 - @email: wenyejie@foxmail.com
 -->
<template>
  <article class="s-article">
    <header class="s-article--header">
      <h1 class="s-article--title">
        <router-link v-if="isLink" to="/">{{ data.title }}</router-link>
        <template v-else>{{ data.title }}</template>
      </h1>
      <dl class="s-article--meta">
        <dt class="s-article--dt">分类:</dt>
        <dd>
          <router-link class="s-article--meta-link" to="/">{{ data.category }}</router-link>
        </dd>
        <dt class="s-article--dt">标签:</dt>
        <dd>
          <router-link class="s-article--meta-link" to="/">{{ data.tag }}</router-link>
        </dd>
        <dt class="s-article--dt">作者:</dt>
        <dd>@{{ data.author }}</dd>
        <dt class="s-article--dt">创建日期:</dt>
        <dd>
          <router-link class="s-article--meta-link" to="/">
            <time datetime="2021-01-20 11:44:19">{{ createTime }}</time>
          </router-link>
        </dd>
        <dt class="s-article--dt">更新日期:</dt>
        <dd>
          <router-link class="s-article--meta-link" to="/">
            <time datetime="2021-01-20 11:44:19">{{ updateTime }}</time>
          </router-link>
        </dd>
      </dl>
    </header>
    <div class="s-article--body" v-html="computedContent"></div>
    <footer class="s-article--footer"></footer>
  </article>
</template>

<script>
import { defineComponent, computed } from 'vue'
import { markdown2html } from '@/cores/markdown2html'
import { dateFormat } from 'wenyejie'
import highlight from '@/cores/highlight'

export default defineComponent({
  name: 'SArticle',
  props: {
    isLink: {
      type: Boolean,
      default: true
    },
    data: {
      type: Object,
      default: () => ({})
    }
  },
  setup(props) {
    const computedContent = computed(() => {
      highlight()
      return markdown2html(props.data.content)
    })

    const updateTime = computed(() => {
      return dateFormat(props.data.utime)
    })

    const createTime = computed(() => {
      return dateFormat(props.data.ctime)
    })

    return {
      computedContent,
      updateTime,
      createTime
    }
  }
})
</script>

<style lang="scss" src="./Article.scss"></style>
<style lang="scss" src="../../styles/article.scss"></style>
