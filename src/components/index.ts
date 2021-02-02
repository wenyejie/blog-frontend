import { defineAsyncComponent, defineComponent } from 'vue'
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

const components: any = {
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

for (const key in components) {
  if (components[key].isSync) {
    components[key] = defineComponent(components[key])
  } else {
    components[key] = defineAsyncComponent(components[key])
  }
}

export default {
  install: (app: any) => {
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
