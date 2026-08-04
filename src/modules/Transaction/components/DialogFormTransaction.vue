<template>
  <Dialog :open="props.open" class="max-w-lg">
    <DialogHeader>
      <h2 class="text-2xl">Create Transaction</h2>
    </DialogHeader>

    <form @submit.prevent="emit('submit')">
      <DialogContent>
        <div class="flex flex-col gap-1.5 mb-4">
          <BaseLabel for="amount"> Amount</BaseLabel>

          <div class="relative">
            <BaseInput
              id="amount"
              type="number"
              class="h-20 text-neutral text-2xl font-semibold text-right pl-9"
              placeholder="00.0"
              v-model.number="forms.amount"
              @input="emit('clear-error', 'amount')"
            />

            <img :src="receipt" alt="" class="absolute top-6 left-1.5" />
          </div>

          <span v-if="props.errors" class="text-red-500 text-xs leading-5 tracking-normal">{{
            props.errors.amount
          }}</span>
        </div>
        <div class="flex flex-col gap-1.5 mb-4">
          <BaseLabel for="type"> Transaction Type </BaseLabel>

          <div class="flex rounded-md bg-link p-1 gap-2">
            <BaseButton @click="forms.type = 'EXPENSE'" variant="toggle" :active="forms.type === 'EXPENSE'" type="button">
              Expense
            </BaseButton>

            <BaseButton @click="forms.type = 'INCOME'" variant="toggle" :active="forms.type === 'INCOME'" type="button"> Income </BaseButton>
          </div>
        </div>
        <div class="flex gap-1.5 mb-4 justify-between">
          <div class="w-full">
            <BaseLabel for="transactionDate"> Date</BaseLabel>

            <BaseInput
              v-model="forms.transactionDate"
              id="transactionDate"
              type="date"
              :min="today"
              @input="emit('clear-error', 'transactionDate')"
            />

            <span v-if="props.errors" class="text-red-500 text-xs leading-5 tracking-normal">{{
              props.errors.transactionDate
            }}</span>
          </div>

          <div class="w-full">
            <BaseLabel for="category"> Category</BaseLabel>

            <div class="relative">
              <BaseSelect
                v-model="forms.categoryId"
                id="categoryId"
                class="pl-8"
                :options="filterCategory(forms.type)"
                option-label="name"
                option-value="id"
                placeholder="Category"
                placeholder-disabled
                @change="emit('clear-error', 'categoryId')"
              />
              <img :src="stack" alt="" class="absolute top-1.5 left-1.5" />
            </div>

            <span v-if="props.errors" class="text-red-500 text-xs leading-5 tracking-normal">{{
              props.errors.categoryId
            }}</span>
          </div>
        </div>
        <div class="mb-4">
          <BaseLabel for="description"> Description</BaseLabel>

          <div class="relative">
            <BaseTextarea
              v-model="forms.description"
              id="description"
              placeholder="Add details about this transaction..."
              class="pl-8"
              @input="emit('clear-error', 'description')"
            />
            <img :src="detail" alt="" class="absolute top-1.5 left-1.5" />
          </div>

          <span v-if="props.errors" class="text-red-500 text-xs leading-5 tracking-normal">{{
            props.errors.description
          }}</span>
        </div>
      </DialogContent>
      <DialogFooter>
        <BaseButton @click="emit('close-dialog')" variant="secondary" type="button">Cancel</BaseButton>
        <BaseButton :disabled="props.loading" variant="primary" type="submit">Confirm</BaseButton>
      </DialogFooter>
    </form>
  </Dialog>
</template>

<script setup>
import { BaseButton, BaseInput, BaseLabel, BaseSelect, BaseTextarea } from "@/shared/ui/components";
import { Dialog, DialogContent, DialogFooter, DialogHeader } from "@/shared/ui/components/dialog";
import receipt from "@/shared/assets/icons/receipt.svg";
import stack from "@/shared/assets/icons/stack.svg";
import detail from "@/shared/assets/icons/detail.svg";

const props = defineProps({
  open: {
    type: Boolean,
    default: false,
  },
  categories: {
    type: Array,
    default: false,
  },
  title: {
    type: String,
    default: "",
  },
  loading: {
    type: Boolean,
    default: false,
  },
  errors: {
    type: Object,
    default: () => {},
  },
});

const forms = defineModel({
  type: Object,
  default: () => {},
});
const today = new Date().toISOString().split("T")[0];

const emit = defineEmits(["close-dialog", "submit", "clear-error"]);

const filterCategory = (field) => {
  return props.categories.filter((items) => items.type === field);
};
</script>
