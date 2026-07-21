<script setup lang="ts">
import Header from "./components/Header.vue";
import Sidebar from "./components/SideBar.vue";
</script>

<template>
  <div class="flex min-h-screen">
    <Sidebar />

    <div class="flex flex-1 flex-col">
      <Header />

      <main class="flex-1 bg-gradient-surface overflow-auto p-10">
        <RouterView />
      </main>
    </div>
  </div>
</template>
