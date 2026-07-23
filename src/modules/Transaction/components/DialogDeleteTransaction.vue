<template>
  <Dialog :open="open" class="max-w-lg">
    <DialogHeader>
      <h2 class="text-2xl">Delete transaction</h2>
    </DialogHeader>

    <form @submit.prevent="emit('submit')">
      <DialogContent>
        <p class="text-red-500 text-sm">Are you sure to delete this transaction !!!</p>
      </DialogContent>
      <DialogFooter>
        <Button @click="emit('close-dialog-delete')" class="w-fit border-neutral-400 border" type="button">Cancel</Button>
        <Button class="w-fit bg-red-400 text-white">Confirm</Button>
      </DialogFooter>
    </form>
  </Dialog>
</template>

<script setup>
import Button from "@/shared/ui/components/Button.vue";
import { Dialog, DialogContent, DialogFooter, DialogHeader } from "@/shared/ui/components/dialog";

defineProps({
  open: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["close-dialog-delete","submit"]);
</script>
