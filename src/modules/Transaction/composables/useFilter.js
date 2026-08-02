import { ref, watch } from "vue";
import { getTransactions } from "../services/api/transaction.service.js";

export const useFilter = () => {
  const filterValue = ref("");
  const to = ref("");
  const from = ref("");
  const filter = ref("");

  const transactions = ref([]);
  const transactionsFilter = ref([]);

  const page = ref(0);
  const size = ref(5);
  const totalPages = ref(0);
  const totalElements = ref(0);
  const keyword = ref("");

  const changePage = (newPage) => {
    if (newPage < 0 || newPage >= totalPages.value) return;

    page.value = newPage;
    paginateTransaction();
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
        sort: "transactionDate,desc"
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

  return {
    filterValue,
    to,
    from,
    filter,
    transactions,
    transactionsFilter,
    page,
    size,
    totalPages,
    totalElements,
    keyword,
    changePage,
    searchTransaction,
    paginateTransaction,
  };
};
