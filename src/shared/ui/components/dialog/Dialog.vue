<template>
  <Transition
    enter-active-class="transition-all duration-200 ease-out"
    enter-from-class="opacity-0 scale-95"
    enter-to-class="opacity-100 scale-100"
    leave-active-class="transition-all duration-200 ease-out"
    leave-from-class="opacity-100 scale-100"
    leave-to-class="opacity-0 scale-95"
    mode="out-in"
  >
    <dialog v-bind="$attrs" ref="dialogRef" class="py-4 m-auto bg-card rounded-xl shadow-card w-full">
      <div class="flex flex-col">
        <slot />
      </div></dialog
  ></Transition>
</template>

<script setup>
import { ref, watch } from "vue";

const props = defineProps({
  open: {
    type: Boolean,
    default: false,
  },
});

defineOptions({
  inheritAttrs: false,
});

const dialogRef = ref();

watch(
  () => props.open,
  (value) => {
    if (value) {
      dialogRef.value.showModal();
    } else {
      dialogRef.value.close();
    }
  },
);
</script>
