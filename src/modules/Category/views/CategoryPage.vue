<template>
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
      @open-dialog-delete="openDialogDelete"
      @open-dialog-edit="openDialogEditCategory"
    />
  </div>

  <DialogFormCategory
    :title="title"
    :open="isOpen"
    @close-dialog="openOrCloseDialogCreateEdit"
    @submit="handleCategories"
    v-model="forms"
  />

  <DialogDeleteCategory :open="isOpenDelete" @close-dialog="closeDialogDelete" @submit="deleteCategory" />
</template>

<script setup>
import ListCategory from "../components/ListCategory.vue";
import DialogFormCategory from "../components/DialogFormCategory.vue";
import { onMounted, reactive, ref } from "vue";
import DialogDeleteCategory from "../components/DialogDeleteCategory.vue";
import { createCategories, deleteCategories, getCatagroies, updateCategories } from "../services/category.service.js";
import { getTransactions } from "@/modules/Transaction/services/api/transaction.service.js";
import { toast } from "vue3-toastify";
import CategoryHead from "../components/CategoryHead.vue";

const optionsType = [
  { label: "Income", value: "INCOME" },
  { label: "Expense", value: "EXPENSE" },
];

const type = ref("");
const title = ref("Create category");
const categories = ref([]);
const categoriesFilter = ref([]);
const transactions = ref([]);
const isOpen = ref(false);
const isOpenDelete = ref(false);
const loading = ref(false);
const id = ref(null);
const forms = reactive({
  name: "",
  type: "EXPENSE",
});

const resetForm = () => {
  forms.name = "";
  forms.type = "EXPENSE";
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
    const payload = {
      name: forms.name,
      type: forms.type,
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
    toast.error(error.response.data.message);
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

onMounted(() => {
  fetchCategories();
  fetchTransactions();
});
</script>
