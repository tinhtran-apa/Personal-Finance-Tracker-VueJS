import DefaultLayout from "@/layouts/DefaultLayout.vue";
import CategoryPage from "../views/CategoryPage.vue";
import { ROUTES } from "@/shared/constants/routes.contant.js";

export default [
  {
    path: ROUTES.CATEGORIES,
    name: "categories",
    component: CategoryPage,
  },
];
