<!--
 - @author: Storm
 - @date: 2021/01/20
 - @email: wenyejie@foxmail.com
 -->
<template>
  <div class="s-editor">
    <textarea
      class="s-editor--input"
      v-model="editorValue"
      @input="handleInput"
      @change="handleChange"
      :name="name"
      :placeholder="placeholder"
      :disabled="disabled"
      :required="required"
      :readonly="readonly"
      :autocomplete="autocomplete"
    ></textarea>
    <div class="s-editor--preview" v-html="compiledMarkdown"></div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref, watch } from 'vue'
import markdown2html, { markdownClean } from '@/cores/markdown2html.ts'
import highlight from '@/cores/highlight'
import { formEleDefProps } from '@/composition/formElement'

export default defineComponent({
  name: 'SEditor',
  emits: ['update:modelValue', 'input', 'change'],
  props: {
    modelValue: {
      type: String,
      default: ''
    },
    ...formEleDefProps
  },
  setup(props, { emit }) {
    const editorValue = ref('')

    watch(
      () => props.modelValue,
      (value: string) => {
        editorValue.value = value
      }
    )

    const compiledMarkdown = computed(() => {
      highlight()
      return markdown2html(editorValue.value)
    })

    const handleInput = () => {
      emit('update:modelValue', markdownClean(editorValue.value))
    }

    const handleChange = () => {
      emit('update:modelValue', markdownClean(editorValue.value))
    }

    return {
      handleInput,
      handleChange,
      compiledMarkdown,
      editorValue
    }
  }
})
</script>

<style lang="scss" src="./Editor.scss"></style>
<style lang="scss" src="../../styles/article.scss"></style>
