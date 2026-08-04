<template>
  <select
    v-model="model"
    class="py-2 px-3 shadow-sm rounded-xl w-full border border-input outline-none text-sm bg-card cursor-pointer disabled:bg-neutral-200 disabled:cursor-not-allowed"
  >
    <option v-if="placeholder" value="" :disabled="placeholderDisabled">{{ placeholder }}</option>
    <option
      v-for="option in normalizedOptions"
      :key="option.value"
      :value="option.value"
      :disabled="option.disabled"
    >
      {{ option.label }}
    </option>
  </select>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  options: {
    type: Array,
    default: () => [],
  },
  optionLabel: {
    type: String,
    default: "label",
  },
  optionValue: {
    type: String,
    default: "value",
  },
  placeholder: {
    type: String,
    default: "",
  },
  placeholderDisabled: {
    type: Boolean,
    default: false,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
});

const model = defineModel({
  type: [String, Number],
  default: "",
});

const normalizedOptions = computed(() => {
  return props.options.map((item) => {
    if (item && typeof item === "object") {
      return {
        label: item[props.optionLabel],
        value: item[props.optionValue],
        disabled: item.disabled || false,
      };
    }
    return { label: item, value: item, disabled: false };
  });
});
</script>
