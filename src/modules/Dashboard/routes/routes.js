import DefaultLayout from "@/layouts/DefaultLayout.vue";
import { ROUTES } from "@/constants/routes.js";
import DashboardPage from "../views/DashboardPage.vue";

export default [
  {
    path: ROUTES.DASHBOARD,
    name: "dashboard",
    component: DashboardPage,
  },
];
