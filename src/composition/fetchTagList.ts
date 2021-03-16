import { reactive } from 'vue'
import { getTagList } from '@/apis/tag'
import { AnyObject, Tag } from '@/statement'

export default () => {
  const tagList: Tag[] = reactive([])

  const fetchTagList = () => {
    getTagList().then((result: AnyObject) => {
      tagList.push(...result.list)
    })
  }

  fetchTagList()

  return tagList
}
