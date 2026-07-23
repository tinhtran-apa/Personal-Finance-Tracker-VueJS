<template>
  <select
    v-model="type"
    class="py-2 px-3 shadow-sm rounded-xl w-full border border-input outline-none text-sm bg-card cursor-pointer"
  >
    <slot />
  </select>
</template>

<script setup>
const type = defineModel({
  type: [String, Number],
  default: "",
});
</script>
