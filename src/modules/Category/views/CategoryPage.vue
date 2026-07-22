<template>
  <div class="flex justify-between">
    <div>
      <h1 class="text-5xl font-semibold">Categories</h1>

      <p class="text-neutral mt-2">Manage and organize your spending categories.</p>
    </div>

    <div class="my-auto">
      <Button @click="openOrCloseDialogCreateEdit" class="w-fit bg-primary text-white">
        <img :src="plus" alt="" />
        Create Category
      </Button>
    </div>
  </div>
  <div class="flex gap-3 pt-4">
    <Search class="w-2xl" placeholder="Search transactions..." />

    <div class="flex gap-3">
      <Select title="Type" :options="optionsType" />
    </div>
  </div>

  <div class="pt-10">
    <ListCategory
      :categories="categories"
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
import plus from "@/shared/assets/icons/plus.svg";
import Button from "@/shared/ui/components/Button.vue";
import Search from "@/shared/ui/components/Search.vue";
import Select from "@/shared/ui/components/Select.vue";
import ListCategory from "../components/ListCategory.vue";
import DialogFormCategory from "../components/DialogFormCategory.vue";
import { onMounted, reactive, ref } from "vue";
import DialogDeleteCategory from "../components/DialogDeleteCategory.vue";
import { createCategories, deleteCategories, getCatagroies, updateCategories } from "../services/category.service.js";
import { getTransactions } from "@/modules/Transaction/services/api/transaction.service.js";
import { toast } from "vue3-toastify";

const optionsType = [
  { label: "Income", value: "INCOME" },
  { label: "Expense", value: "EXPENSE" },
];

const title = ref("Create category");
const categories = ref([]);
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

const fetchCategories = async () => {
  try {
    const response = await getCatagroies();

    categories.value = response.data;
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
