import DefaultLayout from "@/layouts/DefaultLayout.vue";
import { PATH } from "@/shared/constants/path.constant.js";
import TransactionPage from "../views/TransactionPage.vue";

export default [
  {
    path: PATH.TRANSACTIONS.href,
    name: PATH.TRANSACTIONS.name,
    component: TransactionPage,
  },
];
