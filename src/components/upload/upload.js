import { defineComponent, ref } from 'vue'
import { hasOwn } from 'wenyejie'
import http from '@/core/http'
import { uploadSingleAction } from '@/apis/upload'
export default defineComponent({
  name: 'SUpload',
  props: {
    multiple: Boolean,
    name: {
      type: String,
      default: 'files'
    },
    action: {
      type: String,
      default: uploadSingleAction
    },
    method: {
      type: String,
      default: 'post'
    },
    showFileList: Boolean,
    headers: {
      type: Object,
      default: () => ({})
    },
    accept: {
      type: String,
      default: ''
    },
    data: {
      type: Object,
      default: () => ({})
    },
    autoUpload: {
      type: Boolean,
      default: true
    },
    enctype: {
      type: String,
      default: 'multipart/form-data'
    }
  },
  emits: ['update:modelValue', 'change', 'before-upload', 'success'],
  setup(props, { emit }) {
    const refInput = ref()
    const files = ref([])
    const handleClick = () => {
      refInput.value.click()
    }

    // 上传
    const handleUpload = async () => {
      const formData = new FormData()
      const config = { headers: {} }
      if (props.multiple) {
        formData.append(props.name, files.value)
      } else {
        formData.append(props.name, files.value[0])
      }
      for (const key in props.data) {
        if (hasOwn(props.data, key)) {
          formData.append(key, props.data[key])
        }
      }
      for (const key in props.headers) {
        if (hasOwn(props.headers, key)) {
          config.headers[key] = props.headers[key]
        }
      }
      config.headers['Content-type'] = 'multiple/form-data'
      await emit('before-upload', { formData, config })
      return http[props.method](props.action, formData, config).then(response => {
        emit('success', response)
      })
    }

    const handleChange = $event => {
      files.value = $event.target.files
      emit('change', files.value)
      if (props.autoUpload) {
        handleUpload()
      }
    }

    return {
      refInput,
      files,
      handleClick,
      handleChange,
      handleUpload
    }
  }
})
