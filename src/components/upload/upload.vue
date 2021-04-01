<template>
  <div class="s-upload" @click="handleClick">
    <slot :files="files" />
    <input
      class="s-upload--inner"
      :accept="accept"
      :multiple="multiple"
      :name="name"
      :ref="el => (refInput = el)"
      type="file"
      @change="handleChange"
    />
  </div>
</template>

<script src="./upload.js"></script>

<style lang="scss" src="./upload.scss"></style>
