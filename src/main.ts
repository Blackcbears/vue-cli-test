import { createApp } from "vue";
import App from "./App";
import router from "./router";
import store from "./store";
import ElementPlus from "element-plus";
import "./style/element-variables.scss";
import "./style/index.scss";

import "./permission"; // permission control

const { mockXHR } = require("../mock");
mockXHR();

const app = createApp(App);
app.use(store);
app.use(router);
app.use(ElementPlus);
app.mount("#app");
