import { reactive } from 'vue'
import { getCategoryList } from '@/apis/category'

export default () => {
  const categoryList: any = reactive([])

  const fetchTagList = () => {
    getCategoryList().then((result: any) => {
      categoryList.push(...result.list)
    })
  }

  fetchTagList()

  return categoryList
}
