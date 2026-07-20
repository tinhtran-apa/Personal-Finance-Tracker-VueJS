<template>
  <div class="flex flex-col gap-2 items-center">
    <h1 class="text-4xl font-semibold">{{ header.title }}</h1>

    <span class="text-neutral">{{ header.des }}</span>

    <div class="p-3 bg-green-50 rounded-full">
      <img class="w-8 h-8" :src="icon" alt="" />
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  header: {
    type: Object,
    default: () => ({}),
  },
  icon: {
    type: String,
    default: "",
  },
});
</script>
