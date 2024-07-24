import { createApp } from "vue";
import CKEditor from "@ckeditor/ckeditor5-vue";
import store from "./store";
import router from "./router";
import "./index.css";
import App from "./App.vue";
import currencyGBP from "./filters/currency";

const app = createApp(App);

app.use(store).use(router).use(CKEditor).mount("#app");

app.config.globalProperties.$filters = {
  currencyGBP,
};
