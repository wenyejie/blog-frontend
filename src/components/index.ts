/**
 * @author: Storm
 * @date: 2021/01/19
 * @email: wenyejie@foxmail.com
 */
import { defineAsyncComponent } from "vue";
import SButton from "@/components/button";
import SInput from "@/components/input";
import SArticle from "@/components/article";

const components: any = {
  SButton,
  SInput,
  SArticle
};

for (const key in components) {
  components[key] = defineAsyncComponent(components[key]);
}

export default {
  install: (app: any) => {
    for (const key in components) {
      app.component(key, components[key]);
    }
  }
};
