<template>
  <h1 class="page-title">DEMO</h1>

  <!--<s-chosen v-model="demo" filter placeholder="请选择语言">
    <s-chosen-item value="HTML">HTML</s-chosen-item>
    <s-chosen-item value="CSS">CSS</s-chosen-item>
    <s-chosen-item value="JavaScript">JavaScript</s-chosen-item>
  </s-chosen>-->

  <div>{{ demo }}</div>

  <!--<s-input />-->
  <!--<s-tag label="css" />-->
</template>

<script>
import { defineComponent, reactive, ref } from 'vue'
import $dialog from '@/components/dialog'
export default defineComponent({
  name: 'demo',
  setup() {
    // const dialogVisible = ref(false)
    const demo = ref('')

    const langs = reactive([
      {
        label: 'HTML',
        value: 'HTML'
      },
      {
        label: 'CSS',
        value: 'CSS'
      },
      {
        label: 'JavaScript',
        value: 'JavaScript'
      }
    ])

    const handleClick = () => {
      // dialogVisible.value = !dialogVisible.value

      $dialog.alert('alert content', {
        title: 'alert title'
      })
    }
    // const dialogVisible = ref(false)

    const handleClick2 = () => {
      // dialogVisible.value = !dialogVisible.value

      $dialog.confirm('confirm content', {
        title: 'confirm title'
      })
    }

    return {
      demo,
      langs,
      handleClick,
      handleClick2
      // dialogVisible
    }
  }
})
</script>
