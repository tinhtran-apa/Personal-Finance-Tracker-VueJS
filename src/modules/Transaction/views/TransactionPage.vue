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
      :categories="categories"
      :loading="loading"
    />
    <DialogDeleteTransaction
      :open="isOpenDelete"
      @close-dialog-delete="closeDialogDelete"
      @submit="deleteTransaction"
      :loading="loading"
    />
  </section>
</template>

<script setup>
import { onMounted, reactive, ref, watch } from "vue";
import ListTransaction from "../components/ListTransaction.vue";
import DialogFormTransaction from "../components/DialogFormTransaction.vue";
import DialogDeleteTransaction from "../components/DialogDeleteTransaction.vue";
import { getCatagroies } from "@/modules/Category/services/api/category.service.js";
import {
  createTransactions,
  deleteTransactions,
  getTransactions,
  updateTransactions,
} from "../services/api/transaction.service.js";
import { toast } from "vue3-toastify";
import TransactionHead from "../components/TransactionHead.vue";
import { CATEGORY_ICON } from "@/shared/utils/shareIcon.js";

const filterValue = ref("");
const to = ref("");
const from = ref("");
const filter = ref("");

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

const title = ref("Create category");
const categories = ref([]);
const transactions = ref([]);
const transactionsFilter = ref([]);
const isOpen = ref(false);
const isOpenDelete = ref(false);
const loading = ref(false);
const id = ref(null);
const forms = reactive({
  amount: "",
  type: "EXPENSE",
  transactionDate: "",
  categoryId: "",
  description: "",
});

const page = ref(0);
const size = ref(5);
const totalPages = ref(0);
const totalElements = ref(0);
const keyword = ref("");

const resetForm = () => {
  forms.amount = "";
  forms.type = "EXPENSE";
  forms.transactionDate = "";
  forms.categoryId = "";
  forms.description = "";
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

const openDialogDelete = (transactionId) => {
  id.value = transactionId;
  isOpenDelete.value = !isOpenDelete.value;
};

const openDialogEdit = (transaction) => {
  title.value = "Edit transaction";
  isOpen.value = true;
  id.value = transaction.id;
  forms.amount = transaction.amount;
  forms.type = transaction.type;
  forms.transactionDate = transaction.transactionDate;
  forms.categoryId = transaction.categoryId;
  forms.description = transaction.description;
};

const changePage = (newPage) => {
  if (newPage < 0 || newPage >= totalPages.value) return;

  page.value = newPage;
  paginateTransaction();
};

const fetchCategories = async () => {
  try {
    const response = await getCatagroies();
    categories.value = response.data;
  } catch (error) {
    console.log(error);
  }
};

const handleTransaction = async () => {
  try {
    loading.value = true;
    const payload = {
      amount: Number(forms.amount),
      type: forms.type,
      transactionDate: forms.transactionDate,
      categoryId: forms.categoryId,
      description: forms.description,
    };
    let response;
    if (id.value) {
      response = await updateTransactions(id.value, payload);
    } else {
      response = await createTransactions(payload);
    }
    toast.success(response.message);
    openOrCloseDialogCreateEdit();
    paginateTransaction();
  } catch (error) {
    toast.error(error.response.data.message);
  } finally {
    loading.value = false;
  }
};

const deleteTransaction = async () => {
  try {
    loading.value = true;
    const response = await deleteTransactions(id.value);
    toast.success(response.message);
    closeDialogDelete();
    paginateTransaction();
  } catch (error) {
    toast.error(error.response.data.message);
  } finally {
    loading.value = false;
  }
};

const searchTransaction = (value) => {
  keyword.value = value;
  page.value = 0;
  paginateTransaction();
};

const paginateTransaction = async () => {
  try {
    const pagination = {
      page: page.value,
      size: size.value,
      from: from.value,
      to: to.value,
      keyword: keyword.value,
    };
    if (filter.value === "type") {
      pagination.type = filterValue.value;
      pagination.searchBy = "category";
    }

    if (filter.value === "categoryId") {
      pagination.categoryId = filterValue.value;
      pagination.searchBy = "amount";
    }

    if (filter.value === "" || filter.value === "date") {
      pagination.searchBy = "category";
    }

    const response = await getTransactions(pagination);

    totalPages.value = response.data.totalPages;
    totalElements.value = response.data.totalElements;
    transactions.value = response.data.items;
    transactionsFilter.value = response.data.items;
  } catch (error) {
    console.log(error);
  }
};
onMounted(() => {
  fetchCategories();
  paginateTransaction();
});

watch([filterValue, to, filter], () => {
  page.value = 0;
  paginateTransaction();
});

watch(filter, () => {
  filterValue.value = "";
  from.value = "";
  filterValue.value = "";
  page.value = 0;
  paginateTransaction();
});
</script>
