<template>
  <button :disabled="disabled || loading" :type="type" :class="buttonClasses">
    <img v-if="loading" :src="loadingIcon" alt="" class="animate-spin w-5 h-5" />
    <slot />
  </button>
</template>

<script setup>
import { computed } from "vue";
import loadingIcon from "@/shared/assets/icons/loading.svg";

const props = defineProps({
  type: {
    type: String,
    default: "button",
  },
  variant: {
    type: String,
    default: "primary",
  },
  size: {
    type: String,
    default: "default",
  },
  loading: {
    type: Boolean,
    default: false,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  active: {
    type: Boolean,
    default: false,
  },
});

const variantClasses = {
  primary: "bg-primary text-white border border-transparent",
  secondary: "bg-transparent text-primary border border-neutral-400",
  danger: "bg-red-400 text-white border border-transparent",
  ghost: "bg-transparent text-primary border border-transparent",
  link: "bg-link text-primary border border-transparent",
  toggle: "flex-1 rounded-md border border-transparent",
  icon: "bg-transparent text-primary shadow-none border border-neutral hover:bg-link",
};

const sizeClasses = computed(() => {
  if (props.variant === "toggle") return "py-2";
  if (props.variant === "icon" || props.size === "icon") return "p-2";
  if (props.size === "sm") return "py-1 px-3 text-xs";
  return "py-2 px-6";
});

const activeClasses = computed(() => {
  if (props.variant === "toggle") {
    return props.active ? "bg-white shadow text-primary" : "bg-neutral-200 text-neutral";
  }
  if (props.variant === "icon") {
    return props.active ? "bg-link" : "";
  }
  return "";
});

const buttonClasses = computed(() => [
  "flex gap-2 items-center justify-center transition-transform duration-200 font-medium text-sm rounded-xl hover:scale-95 active:scale-75 disabled:opacity-50 disabled:cursor-not-allowed w-full",
  variantClasses[props.variant],
  sizeClasses.value,
  activeClasses.value,
]);
</script>
