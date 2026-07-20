import DefaultLayout from "@/layouts/DefaultLayout.vue";
import { ROUTES } from "@/constants/routes.js";
import TransactionPage from "../views/TransactionPage.vue";

export default [
    {
        path: "/",
        component: DefaultLayout,
        children: [
            {
                path: ROUTES.TRANSACTIONS,
                name: "transactions",
                component: TransactionPage
            }
        ]
    }
]