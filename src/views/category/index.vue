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
import { $success } from '@/components/message'

export default defineComponent({
  name: 'Category',
  setup() {
    const categoryList = fetchCategoryList()

    const newCategory = ref('')

    // 添加分类
    const handleAddCategory = () => {
      addCategory({ label: newCategory.value }).then((category: any) => {
        $success('添加成功')
        categoryList.push(category)
        newCategory.value = ''
      })
    }

    // 更新分类
    const handleUpdateCategory = (item: Category) => {
      updateCategory(item).then(() => {
        $success('更新成功')
      })
    }

    // 删除分类
    const handleDeleteCategory = (item: Category, index: number, reconfirm = false) => {
      deleteCategory({ _id: item._id, reconfirm }).then(
        () => {
          categoryList.splice(index, 1)
          $success('删除成功')
        },
        response => {
          // 如果分类下有文章并且确认删除
          if (response?.code === '005001') {
            if (window.confirm(response?.message)) {
              handleDeleteCategory(item, index, true)
            }
          }
        }
      )
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

.s-input {
  margin-right: 10px;
}
</style>
