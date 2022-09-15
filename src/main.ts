import { createApp } from "vue";
import App from "./App.vue";
import router from "./router/index";
import store from "./store";
import "./assets/css/index.css";
import { setupStore } from "./store/index";

const app = createApp(App);

//每次刷新执行的函数
setupStore();

app.use(store).use(router).mount("#app");
