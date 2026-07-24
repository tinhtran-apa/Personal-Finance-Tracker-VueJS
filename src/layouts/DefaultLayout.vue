<script setup>
import Header from "./components/Header.vue";
import Sidebar from "./components/SideBar.vue";
</script>

<template>
  <div class="flex min-h-screen">
    <Sidebar />

    <div class="flex flex-1 flex-col">
      <Header />

      <main class="flex-1 bg-gradient-surface overflow-auto p-10">
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
