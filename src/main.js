import "@/shared/assets/css/style.css";

import { createApp } from "vue";
import App from "./App.vue";
import router from "./router/index.js";
import "vue3-toastify/dist/index.css";
import Vue3Toastify from "vue3-toastify";
import VueApexCharts from "vue3-apexcharts";

createApp(App)
  .use(router)
  .use(Vue3Toastify, {
    autoClose: 3000,
    newestOnTop: true,
    position: "top-right",
  })
  .use(VueApexCharts)
  .component("apexcharts", VueApexCharts)
  .mount("#app");
