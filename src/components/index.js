import SButton from '@/components/button'
import SInput from '@/components/input'
import SArticle from '@/components/article'
import SEditor from '@/components/editor'
import SPagination from '@/components/pagination'
import SSelect from '@/components/select'
import SForm from '@/components/form'
import SFormItem from '@/components/formItem'
import dialog, { SDialog } from '@/components/dialog'
import SBackdrop from '@/components/backdrop'
import message, { SMessage } from '@/components/message'
import SIcon from '@/components/icon'
import SCheckbox from '@/components/checkbox'
import SCheckboxGroup from '@/components/checkboxGroup'
// import SChosen from '@/components/chosen'
// import SChosenItem from '@/components/chosenItem'
import STag from '@/components/tag'
import SArticleList from '@/components/articleList'
import SUpload from '@/components/upload'
import STextarea from '@/components/textarea'
import SComment from '@/components/comment'

const components = {
  SButton,
  SInput,
  SArticle,
  SEditor,
  SPagination,
  SSelect,
  SForm,
  SFormItem,
  SDialog,
  SBackdrop,
  SMessage,
  SIcon,
  SCheckbox,
  SCheckboxGroup,
  // SChosen,
  // SChosenItem,
  STag,
  SArticleList,
  SUpload,
  STextarea,
  SComment
}

export default {
  install: app => {
    for (const key in components) {
      app.component(key, components[key])
    }

    // message
    app.config.globalProperties.$message = message

    // dialog
    app.config.globalProperties.$dialog = dialog
  }
}
