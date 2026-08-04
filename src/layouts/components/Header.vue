<template>
  <header
    class="w-full bg-card h-12 border-b border-input sticky top-0 z-50 flex items-center justify-between gap-3 pr-3 pl-3"
  >
    <div class="flex items-center gap-3">
      <BaseButton
        type="button"
        class="lg:hidden p-2 hover:bg-link rounded-xl transition-transform active:scale-75 duration-200 border-0 shadow-none"
        @click="emit('toggle-sidebar')"
        aria-label="Open menu"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </BaseButton>

      <h2 class="font-extrabold text-2xl italic shadow-sm border rounded-xl bg-link px-1">FINTRACK</h2>
    </div>
    <div class="flex gap-2 items-center relative">
      <img
        :src="bell"
        alt=""
        class="p-2 hover:bg-link rounded-xl cursor-pointer transition-transform active:scale-75 duration-200"
      />
      <img
        @click="emit('toggle-avatar')"
        :src="avt"
        class="rounded-full w-8 h-8 border object-cover hover:bg-link cursor-pointer transition-transform active:scale-75 duration-200"
      />
      <div :class="changeClassMenuAvatar">
        <span class="text-sm font-semibold">{{ props.userName }}</span>
        <BaseButton @click="emit('log-out')" class="text-xs bg-link">Log out</BaseButton>
      </div>
    </div>
  </header>
</template>

<script setup>
import { BaseButton } from "@/shared/ui/components";
import bell from "@/shared/assets/icons/bell.svg";
import avt from "@/shared/assets/icons/avt.jpg";

import { computed } from "vue";

const props = defineProps({
  open: {
    type: Boolean,
    default: false,
  },
  userName: {
    type: String,
    default: "",
  },
});

const emit = defineEmits(["toggle-avatar", "log-out", 'toggle-sidebar']);

const changeClassMenuAvatar = computed(() => {
  return [
    "w-40 absolute top-12 right-0 flex flex-col items-center gap-2 bg-card rounded-2xl p-2 border border-input transition-all duration-200 ease-in-out",
    props.open ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 -translate-y-2 pointer-events-none",
  ];
});
</script>
