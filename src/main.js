import "@/shared/assets/css/style.css";

import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router/index.js";
import "vue3-toastify/dist/index.css";
import Vue3Toastify from "vue3-toastify";
import VueApexCharts from "vue3-apexcharts";

const app = createApp(App);
const pinia = createPinia();

app.use(pinia); 
app.use(router);
app.use(Vue3Toastify, {
  autoClose: 3000,
  newestOnTop: true,
  position: "top-right",
});
app.use(VueApexCharts);
app.mount("#app");
