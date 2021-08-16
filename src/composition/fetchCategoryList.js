import { reactive } from 'vue'
import { getCategoryList } from '@/apis/category'

export default () => {
  const categoryList = reactive([])

  const fetchTagList = () => {
    getCategoryList().then(result => {
      categoryList.push(...result.list)
    })
  }

  fetchTagList()

  return categoryList
}
