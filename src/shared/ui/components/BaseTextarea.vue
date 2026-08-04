<template>
  <textarea v-model="model" class="py-2 px-3 h-25 shadow-sm rounded-xl w-full border border-input text-sm bg-card"></textarea>
</template>

<script setup>
const model = defineModel({
  type: String,
  default: "",
});
</script>
