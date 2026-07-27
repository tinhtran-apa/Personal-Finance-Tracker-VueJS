<template>
  <Card class="py-8 px-10 flex flex-col max-w-[500px]">
    <AuthHeader :header="header" :icon="bank" />

    <AuthForm
      :forms="forms"
      v-model="formSubmit"
      @submit="handleSubmit"
      :errors="errors"
      @clear-error="clearFieldError"
      @toggle-password="togglePassword"
      submit="Sign up"
    >
      <div class="flex gap-2 text-sm">
        <Checkbox v-model="formSubmit.policy" @change="clearFieldError('policy')" />

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
  </Card>
</template>

<script setup>
import Card from "@/shared/ui/components/Card.vue";
import AuthHeader from "../components/AuthHeader.vue";
import AuthForm from "../components/AuthForm.vue";
import Checkbox from "@/shared/ui/components/CheckBox.vue";
import { ROUTES } from "../../../constants/routes.js";
import bank from "@/shared/assets/icons/bank.svg";
import { computed, reactive, ref } from "vue";
import { validateRegister } from "../validators/auth.validate.js";
import { useRouter } from "vue-router";
import { toast } from "vue3-toastify";

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
    type: "email",
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
const errors = ref({});

const formSubmit = reactive({ fullName: "", email: "", password: "", confirmPassword: "", policy: false });

const router = useRouter();

const handleSubmit = () => {
  const result = validateRegister(formSubmit);
  errors.value = result || {};
  if (!result) {
    toast.success("Register successful !");
    router.push(ROUTES.LOGIN);
  }
};

const errorPolicy = computed(() => {
  return errors.value.policy ? "underline decoration-red-500" : "text-neutral";
});

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
