import { createApp } from "vue";
import App from "./App";
import router from "./router";
import store from "./store";
import ElementPlus from "element-plus";
import "./style/element-variables.module.scss";

const app = createApp(App);
app.use(store);
app.use(router);
app.use(ElementPlus);
app.mount("#app");
