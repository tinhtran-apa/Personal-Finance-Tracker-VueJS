<template>
  <button
    :class="
      twMerge(
        'flex gap-2 items-center justify-center transition-transform duration-200 shadow-sm font-medium text-sm py-2 px-6 border border-transparent rounded-xl w-full hover:scale-95 active:scale-75',
        props.class,
      )
    "
  >
    <slot />
  </button>
</template>

<script setup>
import { twMerge } from "tailwind-merge";

const props = defineProps({
  class: String,
});
</script>
