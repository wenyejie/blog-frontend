<template>
  <div class="category">
    <h1 class="page-title">分类管理</h1>
    <form class="category--form" @submit.stop>
      <ul class="category--list">
        <li class="category--item" v-for="(item, index) in categoryList" :key="item._id">
          <s-input v-model.trim="item.label" />
          <s-button :disabled="item.disabled" @click="handleDeleteCategory(item, index)"
            >删除</s-button
          >
          <s-button :disabled="item.disabled" @click="handleUpdateCategory(item)">更新</s-button>
        </li>
      </ul>
    </form>
    <form class="category--add" @submit.prevent>
      <s-input class="category--add--input" v-model.trim="newCategory" />
      <s-button
        native-type="submit"
        class="category--add--btn"
        :disabled="adding"
        @click="handleAddCategory"
        >添加</s-button
      >
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { addCategory, updateCategory, deleteCategory } from '@/apis/category'
import { AnyObject, Category } from '@/statement'
import fetchCategoryList from '@/composition/fetchCategoryList'
import { $success } from '@/components/message'

export default defineComponent({
  name: 'Category',
  setup() {
    const categoryList = fetchCategoryList()

    const newCategory = ref('')
    const adding = ref(false)

    // 添加分类
    const handleAddCategory = () => {
      adding.value = true
      addCategory({ label: newCategory.value })
        .then((category: AnyObject) => {
          $success('添加成功')
          categoryList.push(category)
          newCategory.value = ''
        })
        .finally(() => {
          adding.value = false
        })
    }

    // 更新分类
    const handleUpdateCategory = (item: Category) => {
      item.updating = true
      updateCategory(item)
        .then(() => {
          $success('更新成功')
        })
        .finally(() => {
          item.updating = false
        })
    }

    // 删除分类
    const handleDeleteCategory = (item: Category, index: number, reconfirm = false) => {
      item.deleting = true
      deleteCategory({ _id: item._id, reconfirm }, { disabledTip: '005001' })
        .then(
          () => {
            categoryList.splice(index, 1)
            $success(`标签"${item.label}"删除成功`)
          },
          response => {
            // 如果分类下有文章并且确认删除
            if (response.code === '005001') {
              if (window.confirm(response.message)) {
                handleDeleteCategory(item, index, true)
              }
            }
          }
        )
        .finally(() => {
          item.deleting = false
        })
    }

    return {
      adding,
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
.category {
  &--list {
    margin: 0 -15px;
  }
  &--item {
    margin: 0 15px 15px;
  }

  &--list {
    display: flex;
    flex-wrap: wrap;
  }
}

.s-input {
  margin-right: 10px;
}
</style>
