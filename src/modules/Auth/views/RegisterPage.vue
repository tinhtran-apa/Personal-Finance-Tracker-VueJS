<template>
  <BaseCard class="py-6 px-5 md:py-8 md:px-10 flex flex-col max-w-[500px]">
    <AuthHeader :header="header" :icon="bank" />

    <AuthForm
      :forms="forms"
      v-model="formSubmit"
      :loading="loading"
      @submit="handleSubmit"
      :errors="errors"
      @clear-error="clearFieldError"
      @toggle-password="togglePassword"
      submit="Sign up"
    >
      <div class="flex gap-2 text-sm">
        <BaseCheckBox v-model="formSubmit.policy" @change="clearFieldError('policy')" />

        <span :class="errorPolicy"
          >I agreed to the <span class="text-primary font-bold">Terms of Service</span> and
          <span class="text-primary font-bold">Privacy Policy</span>
        </span>
      </div>
    </AuthForm>

    <span class="text-neutral self-center mt-3"
      >Already have an account?
      <RouterLink :to="ROUTES.LOGIN" class="text-primary font-semibold">Sign in</RouterLink></span
    >
  </BaseCard>
</template>

<script setup>
import { BaseCard, BaseCheckBox } from "@/shared/ui/components";
import AuthHeader from "../components/AuthHeader.vue";
import AuthForm from "../components/AuthForm.vue";

import { ROUTES } from "@/shared/constants/routes.contant.js";
import bank from "@/shared/assets/icons/bank.svg";
import { useRegister } from "../composables/useRegister.js";

const { header, forms, formSubmit, loading, errors, handleSubmit, errorPolicy, clearFieldError, togglePassword } =
  useRegister();
</script>
