<template>
  <Card class="py-6 px-5 md:py-8 md:px-10 flex flex-col max-w-[500px]">
    <AuthHeader :header="header" :icon="bank" />

    <AuthForm
      :forms="forms"
      v-model="formSubmit"
      :errors="errors"
      :loading="userStore.loading"
      @submit="handleSubmit"
      @clear-error="clearFieldError"
      @toggle-password="togglePassword"
      submit="Sign in"
    >
      <div class="flex gap-2 text-sm">
        <Checkbox />

        <span class="text-neutral">Remember me</span>
      </div>

      <RouterLink :to="ROUTES.FORGOT_PASSWORD" class="text-sm text-secondary"> Forgot your password? </RouterLink>
    </AuthForm>

    <span class="text-neutral self-center mt-3"
      >Don't have an account?
      <RouterLink :to="ROUTES.REGISTER" class="text-primary font-semibold">Sign up</RouterLink></span
    >
  </Card>
</template>

<script setup>
import Card from "@/shared/ui/components/Card.vue";
import AuthForm from "../components/AuthForm.vue";
import Checkbox from "@/shared/ui/components/CheckBox.vue";
import { ROUTES } from "../../../constants/routes.js";
import bank from "@/shared/assets/icons/bank.svg";
import AuthHeader from "../components/AuthHeader.vue";
import { useLogin } from "../composables/useLogin.js";

const { header, forms, formSubmit, errors, userStore, handleSubmit, clearFieldError, togglePassword } = useLogin();
</script>
