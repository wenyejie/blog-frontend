<template>
  <div class="tag">
    <h1 class="page-title">分类</h1>
    <form class="tag--add" @submit.prevent>
      <s-input class="tag--add--input" v-model.trim="newCategory" />
      <s-button native-type="submit" class="tag--add--btn" @click="handleAddTag">添加</s-button>
    </form>
    <form class="tag--form" @submit.stop>
      <ul class="tag--list">
        <li class="tag--item" v-for="(item, index) in categoryList" :key="item._id">
          <s-input v-model.trim="item.label" />
          <s-button @click="handleDeleteTag(item, index)">删除</s-button>
          <s-button @click="handleUpdateTag(item)">更新</s-button>
        </li>
      </ul>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'
import { getCategoryList, addCategory, updateCategory, deleteCategory } from '@/apis/category'
import { Category } from '@/statement'

export default defineComponent({
  name: 'Tag',
  setup() {
    const categoryList: Category[] = reactive([])

    const newCategory = ref('')

    getCategoryList().then((list: any) => {
      categoryList.push(...list)
    })

    // 添加分类
    const handleAddTag = () => {
      addCategory({ label: newCategory.value }).then((tag: any) => {
        alert('分类添加成功')
        categoryList.push(tag)
        newCategory.value = ''
      })
    }

    // 更新分类
    const handleUpdateTag = (item: Category) => {
      updateCategory(item).then(() => {
        alert('分类更新成功')
      })
    }

    // 删除分类
    const handleDeleteTag = (item: Category, index: number) => {
      deleteCategory(item).then(() => {
        alert('分类移除成功')
        categoryList.splice(index, 1)
      })
    }

    return {
      newCategory,
      categoryList,
      handleAddTag,
      handleUpdateTag,
      handleDeleteTag
    }
  }
})
</script>

<style lang="scss" scoped>
.page-title {
  font-size: 28px;
  font-weight: bold;
  margin: 25px 0;
}

.tag {
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
