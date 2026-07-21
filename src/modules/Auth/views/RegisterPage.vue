<template>
  <Card class="py-8 px-10 flex flex-col max-w-[500px]">
    <AuthHeader :header="header" :icon="bank" />

    <AuthForm :forms="forms" submit="Sign up">
      <div class="flex gap-2 text-sm">
        <Checkbox />

        <span class="text-neutral"
          >I agreed to the <span class="text-primary font-bold">Terms of Service</span> and
          <span class="text-primary font-bold">Privacy Policy</span>
        </span>
      </div>
    </AuthForm>

    <span class="text-neutral self-center mt-3"
      >Already have an account?
      <RouterLink :to="ROUTES.LOGIN" class="text-primary font-semibold">Sign in</RouterLink></span
    >
  </Card>
</template>

<script setup>
import Card from "@/shared/ui/components/Card.vue";
import AuthHeader from "../components/AuthHeader.vue";
import AuthForm from "../components/AuthForm.vue";
import Checkbox from "@/shared/ui/components/CheckBox.vue";
import { ROUTES } from "../../../constants/routes.js";
import bank from "@/shared/assets/icons/bank.svg";
import { ref } from "vue";

const header = {
  title: "JOIN FINTRACK",
  des: "Create your account to secure your financial future.",
};

const forms = ref([
  {
    id: "fullName",
    title: "Full name",
    type: "text",
    placeholder: "Enter your full name",
  },
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
  {
    id: "confirmPassword",
    title: "Confirm password",
    type: "password",
    placeholder: "Re-enter your password",
  },
]);
</script>
