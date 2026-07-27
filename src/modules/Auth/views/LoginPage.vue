<template>
  <Card class="py-8 px-10 flex flex-col max-w-[500px]">
    <AuthHeader :header="header" :icon="bank" />

    <AuthForm
      :forms="forms"
      v-model="formSubmit"
      :errors="errors"
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
      >Dont't have an account?
      <RouterLink :to="ROUTES.REGISTER" class="text-primary font-semibold">Sign up</RouterLink></span
    >
  </Card>
</template>

<script setup>
import Card from "@/shared/ui/components/Card.vue";
import { reactive, ref } from "vue";
import AuthForm from "../components/AuthForm.vue";
import Checkbox from "@/shared/ui/components/CheckBox.vue";
import { ROUTES } from "../../../constants/routes.js";
import bank from "@/shared/assets/icons/bank.svg";
import AuthHeader from "../components/AuthHeader.vue";
import { validateLogin } from "../validators/auth.validate.js";
import { useRouter } from "vue-router";
import { toast } from "vue3-toastify";

const header = {
  title: "WELCOME BACK",
  des: "Sign in your account",
};
const forms = ref([
  {
    id: "email",
    title: "Email address",
    type: "email",
    placeholder: "Enter your email",
  },
  {
    id: "password",
    title: "Password",
    type: "password",
    placeholder: "Enter your password",
  },
]);

const errors = ref({});

const formSubmit = reactive({ email: "", password: "" });

const router = useRouter();

const handleSubmit = () => {
  const result = validateLogin(formSubmit);
  errors.value = result || {};
  if (!result) {
    toast.success("Login successful !");
    router.push(ROUTES.DASHBOARD);
  }
};

const clearFieldError = (field) => {
  errors.value[field] = "";
};

const togglePassword = (field) => {
  const form = forms.value.find((f) => f.id === field);
  if (form) {
    form.type = form.type === "password" ? "text" : "password";
  }
};
</script>
