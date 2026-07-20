<template>
  <Card class="py-8 px-10 flex flex-col max-w-[500px]">
    <AuthHeader :header="header" :icon="bank" />

    <AuthForm :forms="forms" submit="Sign in">
      <div class="flex gap-2 text-sm">
        <Checkbox />

        <span class="text-neutral">Remember me</span>
      </div>

      <RouterLink :to="ROUTES.FORGOT_PASSWORD" class="text-sm text-secondary"> Forgot your password? </RouterLink>
    </AuthForm>

    <span class="text-neutral self-center mt-3"
      >Dont't have an account?
      <RouterLink :to="ROUTES.REGISTER" class="text-primary font-semibold">Sign up</RouterLink></span
    >
  </Card>
</template>

<script setup>
import Card from "@/shared/ui/components/card.vue";
import { ref } from "vue";
import AuthForm from "../components/AuthForm.vue";
import Checkbox from "@/shared/ui/components/checkbox.vue";
import { ROUTES } from "../../../constants/routes.js";
import bank from "@/shared/assets/icons/bank.svg";
import AuthHeader from "../components/AuthHeader.vue";

const header = {
  title: "WELCOME BACK",
  des: "Sign in your account",
};
const forms = ref([
  {
    id: "email",
    title: "Email address",
    type: "Email",
    placeholder: "Enter your email",
  },
  {
    id: "password",
    title: "Password",
    type: "password",
    placeholder: "Enter your password",
  },
]);
</script>
