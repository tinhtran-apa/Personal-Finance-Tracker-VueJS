<template>
  <div class="flex justify-between">
    <div>
      <h1 class="text-5xl font-semibold">Transactions</h1>

      <p class="text-neutral mt-2">Review and manage your financial activity.</p>
    </div>

    <div class="my-auto">
      <Button @click="handleDialog" class="w-fit bg-primary text-white">
        <img :src="plus" alt="" />
        Create Transaction
      </Button>
    </div>
  </div>

  <div class="flex gap-3 pt-4">
    <Search class="w-2xl" placeholder="Search transactions..." />

    <div class="flex gap-3">
      <Select v-model="type" title="Type" :options="optionsType" />

      <Select v-model="filter" title="Filter" :options="optionsFilter" />
    </div>
  </div>

  <div class="pt-10">
    <ListTransaction :heads="heads" @open-dialog="handleDialogDelete"/>
  </div>
  
  <DialogFormTransaction :open="isOpen" @close-dialog="handleDialog"/>
  <DialogDeleteTransaction :open="isOpenDelete" @close-dialog="handleDialogDelete"/>

</template>

<script setup>
import Select from "@/shared/ui/components/Select.vue";
import { ref } from "vue";
import ListTransaction from "../components/ListTransaction.vue";
import Button from "@/shared/ui/components/Button.vue";
import plus from "@/shared/assets/icons/plus.svg";
import Search from "@/shared/ui/components/Search.vue";
import DialogFormTransaction from "../components/DialogFormTransaction.vue";
import DialogDeleteTransaction from "../components/DialogDeleteTransaction.vue";

const type = ref("");
const filter = ref("");

const optionsType = [
  { label: "Income", value: "INCOME" },
  { label: "Expense", value: "EXPENSE" },
];

const optionsFilter = [
  { label: "Date", value: "DATE" },
  { label: "Type", value: "TYPE" },
  { label: "Category", value: "categoryId" },
];

const heads = ["DATE", "DESCRIPTION", "CATEGORY", "AMOUNT", "TYPE"];

const isOpen = ref(false);
const isOpenDelete = ref(false);

const handleDialog = () => {
  isOpen.value = !isOpen.value;
};

const handleDialogDelete = () => {
  isOpenDelete.value = !isOpenDelete.value;
};
</script>
