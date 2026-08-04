<template>
  <div class="relative">
    <input
      v-bind="attrs"
      v-model="model"
      :class="twMerge('py-2 pr-3 pl-8 shadow-sm rounded-xl w-full border border-input text-sm bg-card',attrs.class)"
    />
    <img :src="search" alt="" class="absolute top-2 left-1.5"/>
  </div>
</template>

<script setup>
import search from "@/shared/assets/icons/search.svg";
import { twMerge } from "tailwind-merge";
import { useAttrs } from "vue";
defineOptions({
  inheritAttrs: false,
});

const model = defineModel({
  type: [String, Number],
  default: "",
});

const attrs = useAttrs();
</script>
