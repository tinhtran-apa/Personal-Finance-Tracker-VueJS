<template>
  <button
    :disabled="disabled"
    :class="
      twMerge(
        'flex gap-2 items-center justify-center transition-transform duration-200 shadow-sm font-medium text-sm py-2 px-6 border border-transparent rounded-xl w-full hover:scale-95 active:scale-75 disabled:bg-gray-300',
        props.class,
      )
    "
  >
    <img v-if="disabled" :src="loading" alt="">
    <slot />
  </button>
</template>

<script setup>
import { twMerge } from "tailwind-merge";
import loading from "@/shared/assets/icons/loading.svg"
const props = defineProps({
  class: String,
  disabled: Boolean,
  default: false,
});
</script>
