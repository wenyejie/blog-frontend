<template>
  <div class="s-textarea" :class="classes">
    <textarea
      class="s-textarea--inner"
      ref="refTextarea"
      v-model="innerValue"
      :name="name"
      :disabled="disabled"
      :readonly="readonly"
      :required="required"
      :minlength="minlength"
      :maxlength="minlength"
      :placeholder="placeholder"
      :style="textareaStyles"
      :rows="rows"
      :cols="cols"
      @change="handleChange"
      @input="handleInput"
    />
  </div>
</template>

<script src="./textarea.js"></script>

<style lang="scss" src="./textarea.scss"></style>
