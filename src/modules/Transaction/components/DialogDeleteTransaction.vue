<template>
  <Dialog :open="props.open" class="max-w-lg">
    <DialogHeader>
      <h2 class="text-2xl">Delete transaction</h2>
    </DialogHeader>

    <form @submit.prevent="emit('submit')">
      <DialogContent>
        <p class="text-red-500 text-sm">Are you sure to delete this transaction !!!</p>
      </DialogContent>
      <DialogFooter>
        <BaseButton @click="emit('close-dialog')" class="w-fit border-neutral-400 border" type="button">Cancel</BaseButton>
        <BaseButton :disabled="props.loading" class="w-fit bg-red-400 text-white">Confirm</BaseButton>
      </DialogFooter>
    </form>
  </Dialog>
</template>

<script setup>

import { BaseButton } from "@/shared/ui/components";
import { Dialog, DialogContent, DialogFooter, DialogHeader } from "@/shared/ui/components/dialog";

const props = defineProps({
  open: {
    type: Boolean,
    default: false,
  },
  loading: {
    type: Boolean,
    default: false
  }
});

const emit = defineEmits(["close-dialog", "submit"]);
</script>
