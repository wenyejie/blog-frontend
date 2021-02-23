<template>
  <h1 class="page-title">DEMO</h1>
  <!--<s-dialog v-model="dialogVisible" title="Dialog title" content="Dialog content" />-->
  <s-button @click="handleClick">Toggle Dialog</s-button>
  <s-button @click="handleClick2">Toggle Dialog</s-button>

  <s-select :data="langs" />
  <s-select :data="langs" />
</template>

<script>
import { defineComponent, reactive } from 'vue'
import $dialog from '@/components/dialog'
export default defineComponent({
  name: 'demo',
  setup() {
    // const dialogVisible = ref(false)

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
      langs,
      handleClick,
      handleClick2
      // dialogVisible
    }
  }
})
</script>
