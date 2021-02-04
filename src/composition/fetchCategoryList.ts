import { reactive } from 'vue'
import { getCategoryList } from '@/apis/category'
import { AnyObject, Category } from '@/statement'

export default () => {
  const categoryList: Category[] = reactive([])

  const fetchTagList = () => {
    getCategoryList().then((result: AnyObject) => {
      categoryList.push(...result.list)
    })
  }

  fetchTagList()

  return categoryList
}
