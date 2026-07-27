import DefaultLayout from "@/layouts/DefaultLayout.vue";
import CategoryPage from "../views/CategoryPage.vue";
import { ROUTES } from "@/constants/routes.js";

export default [
  {
    path: ROUTES.CATEGORIES,
    name: "categories",
    component: CategoryPage,
  },
];
