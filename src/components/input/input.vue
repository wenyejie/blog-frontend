<!--
 - @author: Storm
 - @date: 2021/01/13
 - @email: wenyejie@foxmail.com
 -->
<template>
  <div :class="classes">
    <slot name="prefix"></slot>
    <input
      ref="refInput"
      :name="name"
      :title="title"
      v-model="innerValue"
      @input="handleInput"
      @change="handleChange"
      @keydown.enter="handleEnter"
      :class="`${CLS_NAME}--inner`"
      :placeholder="placeholder"
      :disabled="disabled"
      :readonly="readonly"
      :required="required"
      :autocomplete="autocomplete"
      :autofocus="autofocus"
      :minlength="minlength"
      :maxlength="maxlength"
      :pattern="innerPattern"
      :type="type"
    />
    <span @click="handleSuffixClick" class="s-input--suffix" v-if="$slots.suffix || suffixIcon">
      <slot name="suffix">
        <s-icon v-if="suffixIcon" :type="suffixIcon" class="s-input--icon s-input--suffix-icon" />
      </slot>
    </span>
  </div>
</template>

<script src="./input.js"></script>

<style lang="scss" src="./input.scss"></style>
