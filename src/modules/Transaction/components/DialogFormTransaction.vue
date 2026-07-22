<template>
  <Dialog :open="open" class="max-w-lg">
    <DialogHeader>
      <h2 class="text-2xl">Create Transaction</h2>
    </DialogHeader>

    <form>
      <DialogContent>
        <div class="flex flex-col gap-1.5 mb-4">
          <div class="flex justify-between">
            <Label for="amount"> Amount</Label>
          </div>

          <div class="relative">
            <Input id="amount" class="h-20 text-neutral text-2xl font-semibold text-right pl-9" placeholder="00.0" />
            <img :src="receipt" alt="" class="absolute top-6 left-1.5" />
          </div>
        </div>
        <div class="flex flex-col gap-1.5 mb-4">
          <div class="flex justify-between">
            <Label for="type"> Transaction Type </Label>
          </div>

          <div class="flex rounded-md bg-link p-1 gap-2">
            <Button
              @click="type = 'expense'"
              :class="type === 'expense' ? 'bg-white shadow' : 'bg-neutral-200'"
              class="flex-1 rounded-md py-2"
              type="button"
            >
              Expense
            </Button>

            <Button
              @click="type = 'income'"
              :class="type === 'income' ? 'bg-white shadow' : 'bg-neutral-200'"
              class="flex-1 rounded-md py-2"
              type="button"
            >
              Income
            </Button>
          </div>
        </div>
        <div class="flex gap-1.5 mb-4 justify-between">
          <div class="w-full">
            <div class="flex justify-between">
              <Label for="transactionDate"> Date</Label>
            </div>

            <Input id="transactionDate" type="date" placeholder="20/12/2026" />
          </div>

          <div class="w-full">
            <div class="flex flex-col justify-between">
              <Label for="category"> Category</Label>
            </div>
            <div class="relative">
              <Select id="category" class="pl-8" />
              <img :src="stack" alt="" class="absolute top-1.5 left-1.5" />
            </div>
          </div>
        </div>
        <div class="lex gap-1.5 mb-4 justify-between">
          <div class="flex flex-col justify-between">
            <Label for="description"> Description</Label>
          </div>
          <div class="relative">
            <Textarea id="description" placeholder="Add details about this transaction..." class="pl-8"/>
            <img :src="detail" alt="" class="absolute top-1.5 left-1.5">
          </div>
        </div>
      </DialogContent>
      <DialogFooter>
        <Button @click="emit('close-dialog')" class="w-fit border-neutral-400 border" type="button">Cancel</Button>
        <Button class="w-fit bg-primary text-white">Confirm</Button>
      </DialogFooter>
    </form>
  </Dialog>
</template>

<script setup>
import Button from "@/shared/ui/components/Button.vue";
import { Dialog, DialogContent, DialogFooter, DialogHeader } from "@/shared/ui/components/dialog";
import Input from "@/shared/ui/components/Input.vue";
import Label from "@/shared/ui/components/Label.vue";
import Select from "@/shared/ui/components/Select.vue";
import Textarea from "@/shared/ui/components/Textarea.vue";
import { ref } from "vue";
import receipt from "@/shared/assets/icons/receipt.svg";
import stack from "@/shared/assets/icons/stack.svg";
import detail from "@/shared/assets/icons/detail.svg";

defineProps({
  open: {
    type: Boolean,
    default: false,
  },
});

const type = ref("expense");

const emit = defineEmits(["close-dialog"]);
</script>
