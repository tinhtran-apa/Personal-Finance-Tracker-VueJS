<template>
  <header
    class="w-full bg-card h-12 border-b border-input sticky top-0 z-50 flex items-center justify-between gap-3 pr-3 pl-3"
  >
    <h2 class="font-extrabold text-2xl italic shadow-sm border rounded-xl bg-link px-1">FINTRACK</h2>
    <div class="flex gap-2 items-center relative">
      <img
        :src="bell"
        alt=""
        class="p-2 hover:bg-link rounded-xl cursor-pointer transition-transform active:scale-75 duration-200"
      />
      <img
        @click="handleMenuAvatar"
        :src="avt"
        class="rounded-full w-8 h-8 border object-cover hover:bg-link cursor-pointer transition-transform active:scale-75 duration-200"
      />
      <div :class="changeClassMenuAvatar">
        <span class="text-sm font-semibold">{{ authStore.users.fullName }}</span>
        <Button @click="logOutUser" class="text-xs bg-link">Log out</Button>
      </div>
    </div>
  </header>
</template>

<script setup>
import bell from "@/shared/assets/icons/bell.svg";
import avt from "@/shared/assets/icons/avt.jpg";
import Button from "@/shared/ui/components/Button.vue";
import { computed, ref } from "vue";
import { useAuthStore } from "@/modules/Auth/stores/auth.store";
import { toast } from "vue3-toastify";
import { useRouter } from "vue-router";
import { ROUTES } from "@/constants/routes";

const open = ref(false);

const handleMenuAvatar = () => {
  open.value = !open.value;
};

const authStore = useAuthStore();

const router = useRouter();

const changeClassMenuAvatar = computed(() => {
  return [
    "w-40 absolute top-12 right-0 flex flex-col items-center gap-2 bg-card rounded-2xl p-2 border border-input transition-all duration-200 ease-in-out",
    open.value ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 -translate-y-2 pointer-events-none",
  ];
});

const logOutUser = async () => {
  try {
    const response = await authStore.logOutUser();
    toast.success(response);
    router.push(ROUTES.LOGIN);
  } catch (error) {
    toast.error(error.response?.data?.message);
  }
};
</script>
