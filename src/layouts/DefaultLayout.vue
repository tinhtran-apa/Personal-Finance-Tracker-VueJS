<script setup lang="ts">
import Header from "./components/header.vue";
import Sidebar from "./components/sidebar.vue";
</script>

<template>
  <div class="flex min-h-screen">
    <Sidebar />

    <div class="flex flex-1 flex-col">
      <Header />

      <main class="flex-1 bg-gradient-surface overflow-auto">
        <RouterView />
      </main>
    </div>
  </div>
</template>
