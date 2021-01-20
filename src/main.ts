import { createApp } from "vue";
import components from "./components";
import App from "./App.vue";
// import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import "./styles";

createApp(App)
  .use(store)
  .use(router)
  .use(components)
  .mount("#app");
