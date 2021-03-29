<!--
 - @author: Storm
 - @date: 2021/01/20
 - @email: wenyejie@foxmail.com
 -->
<template>
  <article class="s-article">
    <header class="s-article--header">
      <h1 class="s-article--title">
        <router-link v-if="plain" :to="`/article/${data._id}`">{{ data.title }}</router-link>
        <template v-else>{{ data.title }}</template>
      </h1>
      <dl class="s-article--meta">
        <dt class="s-article--dt">分类:</dt>
        <dd>
          <router-link
            class="s-article--meta-link s-article--category"
            :to="`/category/${data.category.label.toLocaleLowerCase()}`"
            >{{ data.category.label }}
          </router-link>
        </dd>
        <dt class="s-article--dt">标签:</dt>
        <dd>
          <template v-for="(item, index) in data.tags" :key="item._id">
            <router-link class="s-article--meta-link" :to="`/tag/${item.label.toLocaleLowerCase()}`"
              >{{ item.label }}
            </router-link>
            <template v-if="index < data.tags.length - 1">,&nbsp;</template>
          </template>
        </dd>
        <dt class="s-article--dt">浏览:</dt>
        <dd>{{ data.views }}</dd>
        <dt class="s-article--dt">作者:</dt>
        <dd>{{ data.author }}</dd>
        <dt class="s-article--dt">发布:</dt>
        <dd>
          <router-link class="s-article--meta-link" to="/">
            <time :datetime="createTime">{{ createTime }}</time>
          </router-link>
        </dd>
        <template v-if="updateTime">
          <dt class="s-article--dt">更新:</dt>
          <dd>
            <router-link class="s-article--meta-link" to="/">
              <time :datetime="updateTime">{{ updateTime }}</time>
            </router-link>
          </dd>
        </template>
        <template v-if="isLogin">
          <dt>操作:</dt>
          <dd>
            <router-link class="s-article--meta-link" :to="`/article/edit?id=${data._id}`"
              >编辑
            </router-link>
            <a class="s-article--meta-link" href="javascript:;" @click="handleDelete">删除</a>
          </dd>
        </template>
      </dl>
    </header>
    <div :ref="el => (refBody = el)" class="s-article--body" v-html="computedContent"></div>
    <footer class="s-article--footer" v-if="plain">
      <router-link v-if="plain" :to="`/article/${data._id}`">阅读更多&gt;&gt;</router-link>
    </footer>
    <s-article-nav class="s-article--nav" v-if="!plain && navList.length" :data="navList" />
  </article>
</template>

<script lang="ts">
import { defineComponent, computed, onMounted, reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import store from '@/store'
import { markdown2html } from '@/core/markdown2html'
import { dateFormat } from 'wenyejie'
import highlight from '@/core/highlight'
import { deleteArticle } from '@/apis/article'
import SArticleNav from './articleNav'
import generateNavByContent from './generateNavByContent'

export default defineComponent({
  name: 'SArticle',
  components: { SArticleNav },
  props: {
    plain: {
      type: Boolean,
      default: true
    },
    data: {
      type: Object,
      default: () => ({})
    }
  },
  setup(props) {
    const navList = ref([])
    const refBody = ref(null)

    const computedContent = computed(() => {
      let markdown = props.data.content
      if (props.plain) {
        markdown = markdown.substring(0, 300)
      }
      return markdown2html(markdown)
    })

    const isLogin = computed(() => store.getters.isLogin)

    const updateTime = computed(() => {
      return dateFormat(props.data.utime, 'YYYY-MM-DD')
    })

    const createTime = computed(() => {
      return dateFormat(props.data.ctime, 'YYYY-MM-DD')
    })

    // 删除文章
    const handleDelete = () => {
      deleteArticle({ _id: props.data._id }).then(() => {
        store.dispatch('articleLatest')
        useRouter().go(-1)
      })
    }

    onMounted(() => {
      highlight()
      if (!props.plain) {
        navList.value = generateNavByContent(refBody.value)
      }
    })

    return {
      isLogin,
      computedContent,
      updateTime,
      createTime,
      navList,
      refBody,
      handleDelete
    }
  }
})
</script>

<style lang="scss" src="./Article.scss"></style>
<style lang="scss" src="../../styles/article.scss"></style>
