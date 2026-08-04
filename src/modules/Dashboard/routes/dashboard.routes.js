import DefaultLayout from "@/layouts/DefaultLayout.vue";
import { ROUTES } from "@/shared/constants/routes.contant.js";
import DashboardPage from "../views/DashboardPage.vue";

export default [
  {
    path: ROUTES.DASHBOARD,
    name: "dashboard",
    component: DashboardPage,
  },
];
