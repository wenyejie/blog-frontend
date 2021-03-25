<template>
  <div class="s-chosen" :class="classes">
    <div class="s-chosen--view" @click="handleToggle">
      <ul class="s-chosen--tags" v-if="multiple">
        <template v-for="(item, index) in selectedList" :key="item.value">
          <li class="s-chosen--tag">
            {{ item.label
            }}<span class="s-chosen--close" @click="handleRemoveSelect(item, index)">×</span>
          </li>
        </template>
      </ul>
      <s-input
        class="s-chosen--input"
        :readonly="innerReadonly"
        v-model="innerInput"
        :placeholder="innerPlaceholder"
        @focusin="handleFocusin"
        @focusout="handleFocusout"
      />
    </div>
    <transition name="s-chosen--list">
      <ul class="s-chosen--list" v-show="visible" @click.stop>
        <s-chosen-item
          v-for="item in data"
          :key="item[valueKey]"
          :value="item[valueKey]"
          :label="item[labelKey]"
          :disabled="item[disabledKey]"
          :visible="item[visibleKey]"
          >{{ item[labelKey] }}</s-chosen-item
        >
        <slot />
      </ul>
    </transition>
  </div>
</template>

<script src="./chosen.js"></script>

<style lang="scss" src="./chosen.scss"></style>
