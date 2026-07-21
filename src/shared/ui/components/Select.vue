<template>
  <select v-model="model" class="py-2 px-3 shadow-sm rounded-xl w-full border border-input outline-none text-sm bg-card">
    <option disabled value="">
        {{ title }}
    </option>
    <option v-for="option in options" :key="option" :value="option.value">
        {{ option.label }}
    </option>
  </select>
</template>

<script setup>
const model = defineModel({
  type: [String, Number],
  default: "",
});
defineProps({
  options: {
    type: Array,
    default: () => [],
  },
  title: {
    type: String,
    default: ""
  }
});
</script>
