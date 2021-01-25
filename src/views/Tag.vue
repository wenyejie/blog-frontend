<template>
  <div class="tag">
    <h1 class="page-title">标签</h1>
    <form class="tag--add" @submit.prevent>
      <s-input class="tag--add--input" v-model.trim="newTag" />
      <s-button native-type="submit" class="tag--add--btn" @click="handleAddTag">添加</s-button>
    </form>
    <form class="tag--form" @submit.stop>
      <ul class="tag--list">
        <li class="tag--item" v-for="(item, index) in tagList" :key="item._id">
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
import { getTagList, addTag, updateTag, deleteTag } from '@/apis/tag'
import { Tag } from '@/statement'

export default defineComponent({
  name: 'Tag',
  setup() {
    const tagList: Tag[] = reactive([])

    const newTag = ref('')

    getTagList().then((list: any) => {
      tagList.push(...list)
    })

    // 提交变更
    const submitChange = () => {
      console.log('submit')
    }

    // 添加标签
    const handleAddTag = () => {
      addTag({ label: newTag.value }).then((tag: any) => {
        alert('标签添加成功')
        tagList.push(tag)
        newTag.value = ''
      })
    }

    // 更新标签
    const handleUpdateTag = (item: Tag) => {
      updateTag(item).then(() => {
        alert('标签更新成功')
      })
    }

    // 删除标签
    const handleDeleteTag = (item: Tag, index: number) => {
      deleteTag(item).then(() => {
        alert('标签移除成功')
        tagList.splice(index, 1)
      })
    }

    return {
      newTag,
      tagList,
      submitChange,
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
