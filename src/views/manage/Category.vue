<template>
  <div class="manage-category">
    <h1 class="page-title">分类管理</h1>
    <form class="manage-category--add" @submit.prevent>
      <s-input class="manage-category--add--input" v-model.trim="newCategory" />
      <s-button native-type="submit" class="category--add--btn" @click="handleAddCategory"
        >添加</s-button
      >
    </form>
    <form class="manage-category--form" @submit.stop>
      <ul class="manage-category--list">
        <li class="manage-category--item" v-for="(item, index) in categoryList" :key="item._id">
          <s-input v-model.trim="item.label" />
          <s-button @click="handleDeleteCategory(item, index)">删除</s-button>
          <s-button @click="handleUpdateCategory(item)">更新</s-button>
        </li>
      </ul>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { addCategory, updateCategory, deleteCategory } from '@/apis/category'
import { Category } from '@/statement'
import fetchCategoryList from '@/composition/fetchCategoryList'

export default defineComponent({
  name: 'ManageCategory',
  setup() {
    const categoryList = fetchCategoryList()

    const newCategory = ref('')

    // 添加分类
    const handleAddCategory = () => {
      addCategory({ label: newCategory.value }).then((category: any) => {
        categoryList.push(category)
        newCategory.value = ''
      })
    }

    // 更新分类
    const handleUpdateCategory = (item: Category) => {
      updateCategory(item)
    }

    // 删除分类
    const handleDeleteCategory = (item: Category, index: number) => {
      deleteCategory(item).then(() => {
        categoryList.splice(index, 1)
      })
    }

    return {
      newCategory,
      categoryList,
      handleAddCategory,
      handleUpdateCategory,
      handleDeleteCategory
    }
  }
})
</script>

<style lang="scss" scoped>
.manage-category {
  &--add,
  &--item {
    margin-bottom: 15px;
  }
}

::v-deep {
  .s-input {
    margin-right: 10px;
  }
}
</style>
