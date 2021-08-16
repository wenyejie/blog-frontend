import { reactive } from 'vue'
import { getTagList } from '@/apis/tag'

export default () => {
  const tagList = reactive([])

  const fetchTagList = () => {
    getTagList().then(result => {
      tagList.push(...result.list)
    })
  }

  fetchTagList()

  return tagList
}
