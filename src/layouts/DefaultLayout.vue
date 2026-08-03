<template>
  <div class="flex min-h-screen">
    <Sidebar :mobile-open="isSidebarOpen" @close="closeSidebar" />

    <div v-if="isSidebarOpen" class="fixed inset-0 bg-black/50 z-40 lg:hidden" @click="closeSidebar" />

    <div class="flex flex-1 flex-col min-w-0">
      <Header @toggle-sidebar="toggleSidebar" @toggle-avatar="toggleMenuAvatar" @log-out="logOutUser" :open="open" :userName="authStore?.users?.fullName"/>

      <main class="flex-1 bg-gradient-surface overflow-auto p-4 md:p-6 lg:p-10">
        <RouterView v-slot="{ Component }">
          <Transition
            enter-active-class="transition-all duration-200 ease-out"
            enter-from-class="opacity-0 scale-95"
            enter-to-class="opacity-100 scale-100"
            leave-active-class="transition-all duration-200 ease-out"
            leave-from-class="opacity-100 scale-100"
            leave-to-class="opacity-0 scale-95"
            mode="out-in"
          >
            <component :is="Component" />
          </Transition>
        </RouterView>
      </main>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import Header from "./components/Header.vue";
import Sidebar from "./components/SideBar.vue";
import { ref } from "vue";
import { useAuthStore } from "@/modules/Auth/stores/auth.store.js";
import { toast } from "vue3-toastify";
import { ROUTES } from "@/constants/routes.js";

const isSidebarOpen = ref(false);
const open = ref(false);


const authStore = useAuthStore();

const router = useRouter();

const toggleMenuAvatar = () => {
  open.value = !open.value;
};

const toggleSidebar = () => {
  isSidebarOpen.value = !isSidebarOpen.value;
};

const closeSidebar = () => {
  isSidebarOpen.value = false;
};

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
