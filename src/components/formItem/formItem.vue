<template>
  <div class="s-form-item" :class="classes">
    <div v-if="innerHasLabel" class="s-form-item--label" :style="labelStyles">
      <slot name="label">{{ label }}</slot>
    </div>
    <div class="s-form-item--content">
      <slot />
      <div class="s-form-item--message" v-if="innerShowMessage">
        <slot name="message">{{ innerMessage }}</slot>
      </div>
    </div>
  </div>
</template>

<script src="./formItem.js"></script>

<style lang="scss" src="./formItem.scss"></style>
