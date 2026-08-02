import { ref } from "vue";
import { getCatagroies } from "../services/api/category.service.js";
import { summaryByCategories } from "@/modules/Transaction/services/api/transaction.service.js";

export const useFetch = () => {
  const categories = ref([]);
  const categoriesFilter = ref([]);
  const summaryAmount = ref([]);

  const fetchCategories = async () => {
    try {
      const response = await getCatagroies();

      categories.value = response.data;
      categoriesFilter.value = response.data;
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

  return {
    categories,
    categoriesFilter,
    summaryAmount,
    fetchCategories,
    fetchSummaryAmountTracsactions,
  };
};
