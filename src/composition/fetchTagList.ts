import { reactive } from 'vue'
import { getTagList } from '@/apis/tag'
import { Tag } from '@/statement'

export default () => {
  const tagList: Tag[] = reactive([])

  const fetchTagList = () => {
    getTagList().then((result: any) => {
      tagList.push(...result.list)
    })
  }

  fetchTagList()

  return tagList
}
