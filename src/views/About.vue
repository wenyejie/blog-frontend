<template>
  <article class="about">
    <h1 class="about--title page-title">ABOUT ME</h1>

    <p>一个前端开发工程师</p>

    <p>
      会一点点 <code>HTML</code>, <code>CSS</code>, <code>JavaScript</code>, <code>VUE</code>,
      <code>NodeJS</code>, <code>And more......</code>
    </p>

    <p>Email: <a href="mailto:wenyejie@foxmail.com">wenyejie@foxmail.com</a></p>

    <p>
      <code>// TODO</code>
    </p>
  </article>
</template>

<style lang="scss" scoped>
.about {
  font-size: 18px;
  p {
    & + p {
      margin-top: 1em;
    }
  }
}
</style>
