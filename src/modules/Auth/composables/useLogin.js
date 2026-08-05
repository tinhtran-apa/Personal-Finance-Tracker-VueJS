import { reactive, ref } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "../stores/auth.store.js";
import { validateLogin } from "../validators/auth.validate.js";
import { toast } from "vue3-toastify";
import { PATH } from "@/shared/constants/path.constant.js";

export const useLogin = () => {
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
  const userStore = useAuthStore();

  const handleSubmit = async () => {
    try {
      const result = validateLogin(formSubmit);
      errors.value = result || {};
      if (result) {
        return;
      }
      const payload = {
        email: formSubmit.email,
        password: formSubmit.password,
      };
      const response = await userStore.loginUser(payload);
      toast.success(response);
      router.push(PATH.DASHBOARD.href);
    } catch (error) {
      toast.error(error.response?.data?.message);
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

  return {
    header,
    forms,
    errors,
    formSubmit,
    userStore,
    handleSubmit,
    clearFieldError,
    togglePassword,
  };
};
