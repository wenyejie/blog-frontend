<template>
  <div class="tag">
    <h1 class="page-title">标签管理</h1>
    <form class="tag--form" @submit.stop>
      <ul class="tag--list">
        <li class="tag--item" v-for="(item, index) in tagList" :key="item._id">
          <s-input v-model.trim="item.label" />
          <s-button @click="handleDeleteTag(item, index)">删除</s-button>
          <s-button @click="handleUpdateTag(item)">更新</s-button>
        </li>
      </ul>
    </form>
    <form class="tag--add" @submit.prevent>
      <s-input class="tag--add--input" v-model.trim="newTag" />
      <s-button native-type="submit" class="tag--add--btn" @click="handleAddTag">添加</s-button>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { addTag, updateTag, deleteTag } from '@/apis/tag'
import fetchTagList from '@/composition/fetchTagList'
import { Tag } from '@/statement'
import $message from '@/components/message'
import store from '@/store'

export default defineComponent({
  name: 'Tag',
  setup() {
    const tagList = fetchTagList()
    const newTag = ref('')

    const changeTagCount = () => {
      store.dispatch('getTagCount')
    }

    // 添加标签
    const handleAddTag = () => {
      addTag({ label: newTag.value }).then(tag => {
        $message.success('标签添加成功')
        tagList.push(tag as Tag)
        newTag.value = ''
        changeTagCount()
      })
    }

    // 更新标签
    const handleUpdateTag = (item: Tag) => {
      updateTag(item).then(() => {
        $message.success('标签更新成功')
        changeTagCount()
      })
    }

    // 删除标签
    const handleDeleteTag = (item: Tag, index: number) => {
      deleteTag(item).then(() => {
        $message.success('标签删除成功')
        tagList.splice(index, 1)
        changeTagCount()
      })
    }

    return {
      newTag,
      tagList,
      handleAddTag,
      handleUpdateTag,
      handleDeleteTag
    }
  }
})
</script>

<style lang="scss" scoped>
.tag {
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
