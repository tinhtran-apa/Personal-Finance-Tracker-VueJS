<template>
  <Dialog :open="props.open" class="max-w-lg">
    <DialogHeader>
      <h2 class="text-2xl">Create Transaction</h2>
    </DialogHeader>

    <form @submit.prevent="emit('submit')">
      <DialogContent>
        <div class="flex flex-col gap-1.5 mb-4">
          <Label for="amount"> Amount</Label>

          <div class="relative">
            <Input
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
          <Label for="type"> Transaction Type </Label>

          <div class="flex rounded-md bg-link p-1 gap-2">
            <Button @click="forms.type = 'EXPENSE'" :class="checkClassExpense(forms.type)" type="button">
              Expense
            </Button>

            <Button @click="forms.type = 'INCOME'" :class="checkClassIncome(forms.type)" type="button"> Income </Button>
          </div>
        </div>
        <div class="flex gap-1.5 mb-4 justify-between">
          <div class="w-full">
            <Label for="transactionDate"> Date</Label>

            <Input
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
            <Label for="category"> Category</Label>

            <div class="relative">
              <Select
                v-model="forms.categoryId"
                id="categoryId"
                class="pl-8"
                @change="emit('clear-error', 'categoryId')"
              >
                <option disabled value="">Category</option>
                <option v-for="category in filterCategory(forms.type)" :value="category.id">
                  {{ category.name }}
                </option>
              </Select>
              <img :src="stack" alt="" class="absolute top-1.5 left-1.5" />
            </div>

            <span v-if="props.errors" class="text-red-500 text-xs leading-5 tracking-normal">{{
              props.errors.categoryId
            }}</span>
          </div>
        </div>
        <div class="mb-4">
          <Label for="description"> Description</Label>

          <div class="relative">
            <Textarea
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
        <Button @click="emit('close-dialog')" class="w-fit border-neutral-400 border" type="button">Cancel</Button>
        <Button :disabled="props.loading" class="w-fit bg-primary text-white">Confirm</Button>
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

const checkClassIncome = (field) => {
  return ["flex-1 rounded-md py-2 ", field === "INCOME" ? "bg-white shadow" : "bg-neutral-200"];
};

const checkClassExpense = (field) => {
  return ["flex-1 rounded-md py-2 ", field === "EXPENSE" ? "bg-white shadow" : "bg-neutral-200"];
};
const filterCategory = (field) => {
  return props.categories.filter((items) => items.type === field);
};
</script>
