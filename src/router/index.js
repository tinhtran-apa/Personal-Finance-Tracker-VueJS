import { createRouter, createWebHistory } from "vue-router";
import authRoutes from "@/modules/Auth/routes/routes.js";
import categoryRoutes from "@/modules/Category/routes/routes.js";
import transactionRoutes from "@/modules/Transaction/routes/routes.js";
import dashboardRoutes from "@/modules/Dashboard/routes/routes.js";
import DefaultLayout from "@/layouts/DefaultLayout.vue";
import BlankLayout from "@/layouts/BlankLayout.vue";
const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      redirect: "/login",
    },
    {
      path: "/",
      component: DefaultLayout,
      children: [
        ...dashboardRoutes,
        ...categoryRoutes,
        ...transactionRoutes,
      ],
    },
    {
      path: "/",
      component: BlankLayout,
      children: authRoutes,
    },
  ]
});
export default router;
