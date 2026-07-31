import { createRouter, createWebHistory } from "vue-router";
import authRoutes from "@/modules/Auth/routes/routes.js";
import categoryRoutes from "@/modules/Category/routes/routes.js";
import transactionRoutes from "@/modules/Transaction/routes/routes.js";
import dashboardRoutes from "@/modules/Dashboard/routes/routes.js";
import DefaultLayout from "@/layouts/DefaultLayout.vue";
import BlankLayout from "@/layouts/BlankLayout.vue";
import { ROUTES } from "@/constants/routes";
import { useAuthStore } from "@/modules/Auth/stores/auth.store";
const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      redirect: ROUTES.LOGIN,
    },
    {
      path: "/",
      component: DefaultLayout,
      children: [...dashboardRoutes, ...categoryRoutes, ...transactionRoutes],
      meta: { requiresAuth: true },
    },
    {
      path: "/",
      component: BlankLayout,
      children: authRoutes,
      meta: { guestOnly: true },
    },
  ],
});

router.beforeEach((to) => {
  const userStore = useAuthStore();
  const isLoggedIn = !!userStore.accessToken;
  if (isLoggedIn && to.meta.guestOnly) {
    return { path: ROUTES.DASHBOARD };
  }
  if (!isLoggedIn && to.meta.requiresAuth) {
    return { path: ROUTES.LOGIN };
  }
});
export default router;
