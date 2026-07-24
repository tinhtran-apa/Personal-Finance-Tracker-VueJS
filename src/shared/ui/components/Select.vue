<template>
  <select
    v-model="type"
    :class="
      twMerge(
        'py-2 px-3 shadow-sm rounded-xl w-full border border-input outline-none text-sm bg-card cursor-pointer',
        props.class,
      )
    "
  >
    <slot />
  </select>
</template>

<script setup>
import { twMerge } from "tailwind-merge";

const type = defineModel({
  type: [String, Number],
  default: "",
});
const props = defineProps({
  class: String,
});
</script>
