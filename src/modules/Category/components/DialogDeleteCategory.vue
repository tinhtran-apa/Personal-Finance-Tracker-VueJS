<template>
  <Dialog :open="props.open" class="max-w-lg">
    <DialogHeader>
      <h2 class="text-2xl">Delete category</h2>
    </DialogHeader>

    <form @submit.prevent="emit('submit')">
      <DialogContent>
        <p class="text-red-500 text-sm">Are you sure to delete this category !!!</p>
      </DialogContent>
      <DialogFooter>
        <Button @click="emit('close-dialog')" class="w-fit border-neutral-400 border" type="button">Cancel</Button>
        <Button :disabled="props.loading" class="w-fit bg-red-400 text-white">Confirm</Button>
      </DialogFooter>
    </form>
  </Dialog>
</template>

<script setup>
import Button from "@/shared/ui/components/Button.vue";
import { Dialog, DialogContent, DialogFooter, DialogHeader } from "@/shared/ui/components/dialog";

const props = defineProps({
  open: {
    type: Boolean,
    default: false,
  },
  loading: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["close-dialog", "submit"]);
</script>
