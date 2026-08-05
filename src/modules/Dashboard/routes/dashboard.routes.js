import DefaultLayout from "@/layouts/DefaultLayout.vue";
import { PATH } from "@/shared/constants/path.constant.js";
import DashboardPage from "../views/DashboardPage.vue";

export default [
  {
    path: PATH.DASHBOARD.href,
    name: PATH.DASHBOARD.name,
    component: DashboardPage,
  },
];
