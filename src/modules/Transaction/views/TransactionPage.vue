<template>
  <section>
    <TransactionHead
      @open-dialog-create="openOrCloseDialogCreateEdit"
      @search-transaction="searchTransaction"
      v-model:filterValue="filterValue"
      v-model:filter="filter"
      v-model:to="to"
      v-model:from="from"
      :optionsType="optionsType"
      :optionsFilter="optionsFilter"
      :categories="categories"
    />

    <div class="pt-10">
      <ListTransaction
        :heads="heads"
        @open-dialog-delete="openDialogDelete"
        @open-dialog-edit="openDialogEdit"
        @change-page="changePage"
        :page="page"
        :totalPages="totalPages"
        :totalElements="totalElements"
        :transactions="transactionsFilter"
        :icons="CATEGORY_ICON"
      />
    </div>

    <DialogFormTransaction
      v-model="forms"
      :title="title"
      :open="isOpen"
      @close-dialog="openOrCloseDialogCreateEdit"
      @submit="handleTransaction"
      @clear-error="clearFieldError"
      :categories="categories"
      :loading="loading"
      :errors="errors"
    />
    <DialogDeleteTransaction
      :open="isOpenDelete"
      @close-dialog="closeDialogDelete"
      @submit="deleteTransaction"
      :loading="loading"
    />
  </section>
</template>

<script setup>
import { onMounted } from "vue";
import ListTransaction from "../components/ListTransaction.vue";
import DialogFormTransaction from "../components/DialogFormTransaction.vue";
import DialogDeleteTransaction from "../components/DialogDeleteTransaction.vue";
import TransactionHead from "../components/TransactionHead.vue";
import { CATEGORY_ICON } from "@/shared/utils/shareIcon.js";
import { useDialog } from "../composables/useDialog.js";
import { useFetch } from "../composables/useFetch.js";
import { useCRUD } from "../composables/useCRUD.js";
import { useFilter } from "../composables/useFilter.js";

const optionsType = [
  { label: "Income", value: "INCOME" },
  { label: "Expense", value: "EXPENSE" },
];

const optionsFilter = [
  { label: "Date", value: "date" },
  { label: "Type", value: "type" },
  { label: "Category", value: "categoryId" },
];

const heads = ["DATE", "DESCRIPTION", "CATEGORY", "AMOUNT", "TYPE"];

const { categories, fetchCategories } = useFetch();

const dialog = useDialog();
const {
  title,
  isOpen,
  isOpenDelete,
  loading,
  errors,
  forms,
  openOrCloseDialogCreateEdit,
  closeDialogDelete,
  openDialogDelete,
  openDialogEdit,
  clearFieldError,
} = dialog;

const filterState = useFilter();
const {
  filterValue,
  to,
  from,
  filter,
  transactionsFilter,
  page,
  totalPages,
  totalElements,
  changePage,
  searchTransaction,
  paginateTransaction,
} = filterState;

const { handleTransaction, deleteTransaction } = useCRUD(dialog, paginateTransaction);

onMounted(() => {
  fetchCategories();
  paginateTransaction();
});
</script>
