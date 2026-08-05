<template>
  <BaseCard class="py-6 px-5 md:py-8 md:px-10 flex flex-col max-w-[500px]">
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
        <BaseCheckBox />

        <span class="text-neutral">Remember me</span>
      </div>

      <RouterLink :to="PATH.FORGOT_PASSWORD.href" class="text-sm text-secondary"> Forgot your password? </RouterLink>
    </AuthForm>

    <span class="text-neutral self-center mt-3"
      >Don't have an account?
      <RouterLink :to="PATH.REGISTER.href" class="text-primary font-semibold">Sign up</RouterLink></span
    >
  </BaseCard>
</template>

<script setup>
import { BaseCard, BaseCheckBox } from "@/shared/ui/components";
import AuthForm from "../components/AuthForm.vue";

import { PATH } from "@/shared/constants/path.constant.js";
import bank from "@/shared/assets/icons/bank.svg";
import AuthHeader from "../components/AuthHeader.vue";
import { useLogin } from "../composables/useLogin.js";

const { header, forms, formSubmit, errors, userStore, handleSubmit, clearFieldError, togglePassword } = useLogin();
</script>
