import { reactive } from 'vue'
import { getCategoryList } from '@/apis/category'

export default () => {
  const categoryList: any = reactive([])

  const fetchTagList = () => {
    getCategoryList().then((list: any) => {
      categoryList.value = list
    })
  }

  fetchTagList()

  return categoryList
}
