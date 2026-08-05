import DefaultLayout from "@/layouts/DefaultLayout.vue";
import CategoryPage from "../views/CategoryPage.vue";
import { PATH } from "@/shared/constants/path.constant.js";

export default [
  {
    path: PATH.CATEGORIES.href,
    name: PATH.CATEGORIES.name,
    component: CategoryPage,
  },
];
