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
import { onMounted, reactive, ref } from "vue";
import DialogDeleteCategory from "../components/DialogDeleteCategory.vue";
import {
  createCategories,
  deleteCategories,
  getCatagroies,
  updateCategories,
} from "../services/api/category.service.js";
import { getTransactions, summaryByCategories } from "@/modules/Transaction/services/api/transaction.service.js";
import { toast } from "vue3-toastify";
import CategoryHead from "../components/CategoryHead.vue";
import { CATEGORY_ICON } from "@/shared/utils/shareIcon.js";
import { validateCreateOrEditCategory } from "../validators/category.validate.js";

const optionsType = [
  { label: "Income", value: "INCOME" },
  { label: "Expense", value: "EXPENSE" },
];

const type = ref("");
const title = ref("Create category");
const categories = ref([]);
const categoriesFilter = ref([]);
const transactions = ref([]);
const summaryAmount = ref([]);
const isOpen = ref(false);
const isOpenDelete = ref(false);
const loading = ref(false);
const id = ref(null);
const errors = ref({});
const forms = reactive({
  name: "",
  type: "EXPENSE",
  icon: "",
});

const resetForm = () => {
  forms.name = "";
  forms.type = "EXPENSE";
  forms.icon = "";
  id.value = null;
};

const openOrCloseDialogCreateEdit = () => {
  resetForm();
  isOpen.value = !isOpen.value;
};

const closeDialogDelete = () => {
  resetForm();
  isOpenDelete.value = !isOpenDelete.value;
};

const openDialogDelete = (categoryId) => {
  id.value = categoryId;
  isOpenDelete.value = !isOpenDelete.value;
};

const openDialogEditCategory = (category) => {
  title.value = "Edit category";
  isOpen.value = true;
  id.value = category.id;
  forms.name = category.name;
  forms.type = category.type;
  forms.icon = category.icon;
};

const deleteCategory = async () => {
  try {
    loading.value = true;
    const response = await deleteCategories(id.value);
    toast.success(response.message);
    closeDialogDelete();
    fetchCategories();
  } catch (error) {
    toast.error(error.response.data.message);
  } finally {
    loading.value = false;
  }
};

const handleCategories = async () => {
  try {
    loading.value = true;
    const result = validateCreateOrEditCategory(forms);
    errors.value = result || {};
    if (result) {
      return;
    }
    const payload = {
      name: forms.name,
      type: forms.type,
      icon: forms.icon,
    };
    let response;
    if (id.value) {
      response = await updateCategories(id.value, payload);
    } else {
      response = await createCategories(payload);
    }
    toast.success(response.message);
    openOrCloseDialogCreateEdit();
    fetchCategories();
  } catch (error) {
    toast.error(error.response?.data?.message);
  } finally {
    loading.value = false;
  }
};

const searchCategory = (event) => {
  if (event.target.value) {
    const newData = categories.value.filter((items) => {
      if (!type.value) {
        return items.name.toLowerCase().includes(event.target.value.toLowerCase());
      }
      return items.name.toLowerCase().includes(event.target.value.toLowerCase()) && items.type === type.value;
    });
    categoriesFilter.value = newData;
  } else {
    categoriesFilter.value = categories.value;
  }
};

const filterCategoryType = () => {
  if (!type.value) {
    categoriesFilter.value = categories.value;
    return;
  }
  categoriesFilter.value = categories.value.filter((items) => items.type === type.value);
};

const clearFieldError = (field) => {
  errors.value[field] = "";
};

const fetchCategories = async () => {
  try {
    const response = await getCatagroies();

    categories.value = response.data;
    categoriesFilter.value = response.data;
  } catch (error) {
    console.log(error);
  }
};

const fetchTransactions = async () => {
  try {
    const response = await getTransactions();
    transactions.value = response.data.items;
  } catch (error) {
    console.log(error);
  }
};

const fetchSummaryAmountTracsactions = async () => {
  try {
    const response = await summaryByCategories();
    summaryAmount.value = response.data;
  } catch (error) {
    console.log(error);
  }
};

onMounted(() => {
  fetchCategories();
  fetchTransactions();
  fetchSummaryAmountTracsactions();
});
</script>
