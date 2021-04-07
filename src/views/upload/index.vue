<template>
  <h1 class="page-title">上传管理</h1>

  <s-upload><s-button>上传文件</s-button></s-upload>

  <ul class="upload--list">
    <li class="upload--item" v-for="item in list" :key="item._id">
      <a class="upload--img" :href="`/${item.path}`" target="_blank">
        <img :src="`/${item.path}`" :alt="item.alt" />
      </a>
      <div class="upload--op">
        <s-input readonly :modelValue="item.path" />
        <s-button class="upload--delete" type="danger" @click="handleDelete(item, index)"
          >删除</s-button
        >
      </div>
    </li>
  </ul>
</template>

<script>
import { defineComponent, ref } from 'vue'
import { getUploadList, deleteUpload } from '@/apis/upload'
import message from '@/components/message'
import dialog from '@/components/dialog'

export default defineComponent({
  name: 'Upload',
  setup() {
    const list = ref([])

    const getList = () => {
      getUploadList().then(response => {
        list.value = response.list
      })
    }

    const handleDelete = (item, index) => {
      dialog.confirm('确定要删除图片?').then(() => {
        deleteUpload({ _id: item._id }).then(() => {
          message.success('删除成功')
          list.value.splice(index, 1)
        })
      })
    }

    getList()

    return {
      list,
      handleDelete
    }
  }
})
</script>

<style lang="scss" scoped>
.upload {
  &--list {
    display: flex;
    flex-wrap: wrap;
    margin: 30px -15px -15px;
  }

  &--item {
    display: flex;
    align-items: center;
    margin: 15px;
  }
  &--img {
    width: 122px;
    height: 122px;
    background-color: #f9f9f9;
    border: 1px solid #e9e9e9;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: var(--border-radius);
    padding: 10px;

    & > img {
    }
  }

  &--op {
    margin-left: 10px;
    display: flex;
    flex-direction: column;
  }

  &--delete {
    margin-top: 20px;
  }
}
</style>
