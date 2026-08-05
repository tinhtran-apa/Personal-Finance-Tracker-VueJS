import BlankLayout from "@/layouts/BlankLayout.vue";
import { PATH } from "@/shared/constants/path.constant.js";
import LoginPage from "../views/LoginPage.vue";
import RegisterPage from "../views/RegisterPage.vue";

export default [
  {
    path: PATH.LOGIN.href,
    name: PATH.LOGIN.name,
    component: LoginPage,
  },
  {
    path: PATH.REGISTER.href,
    name: PATH.REGISTER.name,
    component: RegisterPage,
  },
];
