import { computed, reactive, ref } from "vue";
import { useRouter } from "vue-router";
import { register } from "../services/api/auth.service.js";
import { validateRegister } from "../validators/auth.validate.js";
import { toast } from "vue3-toastify";
import { ROUTES } from "@/shared/constants/routes.contant.js";

export const useRegister = () => {
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
  const loading = ref(false);

  const handleSubmit = async () => {
    try {
      loading.value = true;
      const result = validateRegister(formSubmit);
      errors.value = result || {};
      if (result) {
        return;
      }
      const payload = {
        fullName: formSubmit.fullName,
        email: formSubmit.email,
        password: formSubmit.password,
      };
      const response = await register(payload);
      toast.success(response.message);
      router.push(ROUTES.LOGIN);
    } catch (error) {
      toast.error(error.response?.data?.message);
    } finally {
      loading.value = false;
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

  return {
    header,
    forms,
    errors,
    formSubmit,
    loading,
    handleSubmit,
    errorPolicy,
    clearFieldError,
    togglePassword,
  };
};
