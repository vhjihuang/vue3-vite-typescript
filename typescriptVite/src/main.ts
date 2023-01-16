import { createApp } from "vue";
import { createPinia } from "pinia";

// 引入初始化样式
import '@/styles/normalize.css'


import 'uno.css'

import App from "./App.vue";
import router from "./router";
import { getConfig } from "./config/config";

console.log(getConfig('appCode'), 'a');

const app = createApp(App);

app.use(createPinia());
app.use(router);

app.mount("#app");
