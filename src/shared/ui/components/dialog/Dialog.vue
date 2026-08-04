<template>
  <dialog
    v-bind="$attrs"
    ref="dialogRef"
    class="py-4 m-auto bg-card rounded-xl shadow-card w-[calc(100%-2rem)] max-w-lg sm:w-full"
  >
    <div class="flex flex-col">
      <slot />
    </div>
  </dialog>
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
