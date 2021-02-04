import SButton from '@/components/button'
import SInput from '@/components/input'
import SArticle from '@/components/article'
import SEditor from '@/components/editor'
import SPagination from '@/components/pagination'
import SSelect from '@/components/select'
import SForm from '@/components/form'
import SFormItem from '@/components/formItem'
import SDialog from '@/components/dialog'
import SBackdrop from '@/components/backdrop'
import message, { SMessage } from '@/components/message'
import SIcon from '@/components/icon'
import { AnyObject } from '@/statement'

const components: AnyObject = {
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
  SIcon
}

export default {
  install: (app: AnyObject) => {
    for (const key in components) {
      app.component(key, components[key])
    }

    // message
    app.config.globalProperties.$message = message
    app.config.globalProperties.$success = message.success
    app.config.globalProperties.$info = message.info
    app.config.globalProperties.$danger = message.danger
    app.config.globalProperties.$warning = message.warning
  }
}
