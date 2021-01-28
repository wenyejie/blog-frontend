import { reactive } from 'vue'
import { getTagList } from '@/apis/tag'

export default () => {
  const tagList: any = reactive([])

  const fetchTagList = () => {
    getTagList().then((result: any) => {
      tagList.push(...result.list)
    })
  }

  fetchTagList()

  return tagList
}
