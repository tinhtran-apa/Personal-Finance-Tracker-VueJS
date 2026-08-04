<template>
  <input
    v-model="model"
    :class="twMerge('py-2 px-3 shadow-sm rounded-xl w-full border border-input text-sm bg-card', props.class)"
  />
</template>

<script setup>
import { twMerge } from "tailwind-merge";

const model = defineModel({
  type: [String, Number],
  default: "",
});
const props = defineProps({
  class: String,
});
</script>
