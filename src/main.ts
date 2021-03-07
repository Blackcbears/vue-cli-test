import { createApp, Directive } from "vue";
import App from "./App";
import router from "./router";
import store from "./store";
import ElementPlus from "element-plus";
import "./style/element-variables.scss";
import "./style/index.scss";
// permission control
import "./permission";
// directives
import * as directives from "@/directives";

const { mockXHR } = require("../mock");
mockXHR();

const app = createApp(App);

// 自定义指令
Object.keys(directives).forEach(key => {
  app.directive(key, (directives as { [key: string]: Directive })[key]);
});

app.use(store);
app.use(router);
app.use(ElementPlus);
app.mount("#app");
