<!--
 - @author: Storm
 - @date: 2021/01/20
 - @email: wenyejie@foxmail.com
 -->
<template>
  <article class="s-article">
    <header class="s-article--header">
      <h1 class="s-article--title">
        <router-link v-if="isLink" to="/">Worth A Thousand Words</router-link>
        <template v-else>Worth A Thousand Words</template>
      </h1>
      <dl class="s-article--meta">
        <dt class="s-article--dt">分类:</dt>
        <dd>
          <router-link class="s-article--meta-link" to="/">vue</router-link>
        </dd>
        <dt class="s-article--dt">标签:</dt>
        <dd>
          <router-link class="s-article--meta-link" to="/">vue</router-link>
          ,
          <router-link class="s-article--meta-link" to="/">bug</router-link>
        </dd>
        <dt class="s-article--dt">作者:</dt>
        <dd>@wenyejie</dd>
        <dt class="s-article--dt">日期:</dt>
        <dd>
          <router-link class="s-article--meta-link" to="/">
            <time datetime="2021-01-20 11:44:19">2021-01-20</time>
          </router-link>
        </dd>
      </dl>
    </header>
    <div class="s-article--body">
      <p>
        Lorem ipsum dolor sit amet, test link adipiscing elit. Nullam dignissim convallis est.
        Quisque aliquam. Donec faucibus. Nunc iaculis suscipit dui. Nam sit amet sem. Aliquam libero
        nisi, imperdiet at, tincidunt nec, gravida vehicula, nisl. Praesent mattis, massa quis
        luctus fermentum, turpis mi volutpat justo, eu volutpat enim diam eget metus. Maecenas
        ornare tortor. Donec sed tellus eget sapien fringilla nonummy. Mauris a ante. Suspendisse
        quam sem, consequat at, commodo vitae, feugiat in, nunc. Morbi imperdiet augue quis tellus.
      </p>

      <p>
        Lorem ipsum dolor sit amet, emphasis consectetuer adipiscing elit. Nullam dignissim
        convallis est. Quisque aliquam. Donec faucibus. Nunc iaculis suscipit dui. Nam sit amet sem.
        Aliquam libero nisi, imperdiet at, tincidunt nec, gravida vehicula, nisl. Praesent mattis,
        massa quis luctus fermentum, turpis mi volutpat justo, eu volutpat enim diam eget metus.
        Maecenas ornare tortor. Donec sed tellus eget sapien fringilla nonummy. Mauris a ante.
        Suspendisse quam sem, consequat at, commodo vitae, feugiat in, nunc. Morbi imperdiet augue
        quis tellus.
      </p>
    </div>
    <footer class="s-article--footer"></footer>
  </article>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'SArticle',
  props: {
    isLink: {
      type: Boolean,
      default: true
    }
  }
})
</script>

<style lang="scss" src="./Article.scss"></style>
