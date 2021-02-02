import { createApp } from 'vue'
import components from './components'
import App from './App.vue'
import router from './router'
// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
import store from './store'
import './styles'

createApp(App).use(store).use(router).use(components).mount('#app')
