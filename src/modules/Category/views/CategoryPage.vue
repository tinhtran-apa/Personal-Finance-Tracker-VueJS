<template>
  <section>
    <CategoryHead
      @open-dialog-create="openOrCloseDialogCreateEdit"
      @search-category="searchCategory"
      @filter-category-type="filterCategoryType"
      :optionsType="optionsType"
      v-model="type"
    />

    <div class="pt-10">
      <ListCategory
        :categories="categoriesFilter"
        :summaryAmount="summaryAmount"
        :icons="CATEGORY_ICON"
        @open-dialog-delete="openDialogDelete"
        @open-dialog-edit="openDialogEditCategory"
      />
    </div>

    <DialogFormCategory
      :title="title"
      :open="isOpen"
      @close-dialog="openOrCloseDialogCreateEdit"
      @submit="handleCategories"
      @clear-error="clearFieldError"
      v-model="forms"
      :loading="loading"
      :icons="CATEGORY_ICON"
      :errors="errors"
    />

    <DialogDeleteCategory
      :open="isOpenDelete"
      @close-dialog="closeDialogDelete"
      @submit="deleteCategory"
      :loading="loading"
    />
  </section>
</template>

<script setup>
import ListCategory from "../components/ListCategory.vue";
import DialogFormCategory from "../components/DialogFormCategory.vue";
import { onMounted } from "vue";
import DialogDeleteCategory from "../components/DialogDeleteCategory.vue";
import { toast } from "vue3-toastify";
import CategoryHead from "../components/CategoryHead.vue";
import { CATEGORY_ICON } from "@/shared/utils/shareIcon.js";
import { useDialog } from "../composables/useDialog.js";
import { useFetch } from "../composables/useFetch.js";
import { useCRUD } from "../composables/useCRUD.js";
import { useFilter } from "../composables/useFilter.js";

const optionsType = [
  { label: "Income", value: "INCOME" },
  { label: "Expense", value: "EXPENSE" },
];

const { categories, categoriesFilter, summaryAmount, fetchCategories, fetchSummaryAmountTracsactions } = useFetch();

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
  openDialogEditCategory,
  clearFieldError,
} = dialog;

const { handleCategories, deleteCategory } = useCRUD(dialog, fetchCategories);

const { type, searchCategory, filterCategoryType } = useFilter(categories, categoriesFilter);

onMounted(() => {
  fetchCategories();
  fetchSummaryAmountTracsactions();
});
</script>
