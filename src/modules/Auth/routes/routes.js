import BlankLayout from "@/layouts/BlankLayout.vue";
import { ROUTES } from "../../../constants/routes";
import LoginPage from "../views/LoginPage.vue";
import RegisterPage from "../views/RegisterPage.vue";

export default [
  {
    path: ROUTES.LOGIN,
    name: "login",
    component: LoginPage,
  },
  {
    path: ROUTES.REGISTER,
    name: "register",
    component: RegisterPage,
  },
];
