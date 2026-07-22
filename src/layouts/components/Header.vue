<template>
  <header class="w-full bg-card h-12 border-b border-input sticky top-0 z-50 flex items-center justify-end gap-3 pr-3">
      <img :src="bell" alt="" class="p-2 hover:bg-link rounded-xl cursor-pointer transition-transform active:scale-75 duration-200"/>
      <img :src="avt" class="rounded-full w-8 h-8 border object-cover hover:bg-link cursor-pointer transition-transform active:scale-75 duration-200"/>
  </header>
</template>

<script setup>
import bell from "@/shared/assets/icons/bell.svg";
import avt from "@/shared/assets/icons/avt.jpg"
</script>
