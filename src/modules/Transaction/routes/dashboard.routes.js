import DefaultLayout from "@/layouts/DefaultLayout.vue";
import { ROUTES } from "@/shared/constants/routes.contant.js";
import TransactionPage from "../views/TransactionPage.vue";

export default [
  {
    path: ROUTES.TRANSACTIONS,
    name: "transactions",
    component: TransactionPage,
  },
];
