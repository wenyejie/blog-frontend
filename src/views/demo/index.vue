<template>
  <h1 class="page-title">DEMO</h1>

  <s-day v-model="demo" />
  <s-year v-model="demo" />
  <s-month v-model="demo" />
  <div>{{ demo }}</div>

  <button type="button" @click="handleClick">Change Date</button>
</template>

<script>
import { defineComponent, ref } from 'vue'
import SDay from '@/components/day'
import SYear from '@/components/year'
import SMonth from '@/components/month'

export default defineComponent({
  name: 'demo',
  components: { SDay, SYear, SMonth },
  setup() {
    const demo = ref(new Date(2020, 3, 2))

    const handleClick = () => {
      demo.value = new Date()
    }

    return {
      demo,
      handleClick
    }
  }
})
</script>
