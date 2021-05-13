import { createApp } from 'vue'
import components from './components'
import App from './App.vue'
import router from './router'
import store from './store'
import './styles'
import './core/statistic.js'

createApp(App)
  .use(store)
  .use(router)
  .use(components)
  .mount('#app')
