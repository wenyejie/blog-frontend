declare module '*.vue' {
  // eslint-disable-next-line prettier/prettier
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, never>
  export default component
}
