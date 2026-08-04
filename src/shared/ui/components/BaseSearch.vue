<template>
  <div class="relative">
    <input
      v-bind="inputAttrs.rest"
      v-model="model"
      :class="[
        'py-2 pr-3 pl-8 shadow-sm rounded-xl w-full border border-input text-sm bg-card disabled:bg-neutral-200 disabled:cursor-not-allowed',
        inputAttrs.classes,
      ]"
    />
    <img :src="search" alt="" class="absolute top-2 left-1.5"/>
  </div>
</template>

<script setup>
import { computed } from "vue";
import search from "@/shared/assets/icons/search.svg";
import { useAttrs } from "vue";

defineOptions({
  inheritAttrs: false,
});

const model = defineModel({
  type: [String, Number],
  default: "",
});

const attrs = useAttrs();

const inputAttrs = computed(() => {
  const { class: classes, ...rest } = attrs;
  return { classes, rest };
});
</script>
