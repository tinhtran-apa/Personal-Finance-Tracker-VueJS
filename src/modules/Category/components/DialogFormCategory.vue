<template>
  <Dialog :open="props.open" class="max-w-lg">
    <DialogHeader>
      <h2 class="text-2xl">{{ props.title }}</h2>
    </DialogHeader>

    <form @submit.prevent="emit('submit')">
      <DialogContent>
        <div class="flex flex-col gap-1.5 mb-4">
          <Label for="name"> Category name </Label>

          <div class="relative">
            <Input
              v-model="forms.name"
              id="name"
              placeholder="Add name category"
              :class="focusError(props.errors?.name)"
              @input="emit('clear-error', 'name')"
            />

            <img :src="stack" alt="" class="absolute top-1.5 left-1.5" />
          </div>

          <span v-if="props.errors" class="text-red-500 text-xs leading-5 tracking-normal">{{
            props.errors.name
          }}</span>
        </div>
        <div class="flex flex-col gap-1.5 mb-4">
          <Label for="name"> Icon </Label>

          <div class="flex gap-2">
            <Button
              @click="selectIcon(ic.label)"
              v-for="ic in icons"
              :key="ic"
              :class="checkClassIcon(forms.icon, ic.label)"
              type="button"
            >
              <img :src="ic.icon" alt="" />
            </Button>
          </div>
          <span v-if="props.errors" class="text-red-500 text-xs leading-5 tracking-normal">{{
            props.errors.icon
          }}</span>
        </div>
        <div class="flex flex-col gap-1.5 mb-4">
          <Label for="type"> Type </Label>

          <div class="flex rounded-md bg-link p-1 gap-2">
            <Button @click="forms.type = 'EXPENSE'" :class="checkClassExpense(forms.type)" type="button">
              Expense
            </Button>

            <Button @click="forms.type = 'INCOME'" :class="checkClassIncome(forms.type)" type="button"> Income </Button>
          </div>
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
import stack from "@/shared/assets/icons/stack.svg";

const props = defineProps({
  open: {
    type: Boolean,
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
  icons: {
    type: Array,
    default: () => [],
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

const emit = defineEmits(["close-dialog", "submit", "clear-error"]);

const checkClassIncome = (field) => {
  return ["flex-1 rounded-md py-2 ", field === "INCOME" ? "bg-white shadow" : "bg-neutral-200"];
};

const checkClassExpense = (field) => {
  return ["flex-1 rounded-md py-2 ", field === "EXPENSE" ? "bg-white shadow" : "bg-neutral-200"];
};

const checkClassIcon = (selectedIcon, icon) => {
  return ["p-2 shadow-none border border-neutral hover:bg-link", selectedIcon === icon ? "bg-link" : ""];
};

const focusError = (field) => {
  return ["pr-3 pl-8", field ? "border-red-500 focus:border-red-500 focus:outline-none" : ""];
};

const selectIcon = (icon) => {
  forms.value.icon = icon;
  emit("clear-error", "icon");
};
</script>
