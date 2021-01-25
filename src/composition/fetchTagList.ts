import { reactive } from 'vue'
import { getTagList } from '@/apis/tag'

export default () => {
  const tagList: any = reactive([])

  const fetchTagList = () => {
    getTagList().then((list: any) => {
      tagList.push(...list)
    })
  }

  fetchTagList()

  return tagList
}
