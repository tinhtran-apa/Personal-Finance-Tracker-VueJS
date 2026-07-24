<template>
  <header class="w-full bg-card h-12 border-b border-input sticky top-0 z-50 flex items-center justify-between gap-3 pr-3 pl-3">
    <h2 class="font-extrabold text-2xl italic shadow-sm border rounded-xl bg-link px-1">
      FINTRACK
    </h2>
    <div class=" flex gap-2 items-center">
      <img
        :src="bell"
        alt=""
        class="p-2 hover:bg-link rounded-xl cursor-pointer transition-transform active:scale-75 duration-200"
      />
      <img
        :src="avt"
        class="rounded-full w-8 h-8 border object-cover hover:bg-link cursor-pointer transition-transform active:scale-75 duration-200"
      />
    </div>
  </header>
</template>

<script setup>
import bell from "@/shared/assets/icons/bell.svg";
import avt from "@/shared/assets/icons/avt.jpg";
</script>
