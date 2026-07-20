import { createRouter, createWebHistory } from "vue-router";
import authRoutes from "@/modules/Auth/routes/routes.js";
import categoryRoutes from "@/modules/Category/routes/routes.js";
import transactionRoutes from "@/modules/Transaction/routes/routes.js";
import dashboardRoutes from "@/modules/Dashboard/routes/routes.js";
const router = createRouter({
  history: createWebHistory(),
  routes: [...authRoutes, ...categoryRoutes, ...transactionRoutes, ...dashboardRoutes],
});
export default router;
