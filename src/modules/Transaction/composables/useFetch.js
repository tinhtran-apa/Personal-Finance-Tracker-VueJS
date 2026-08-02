import { ref } from "vue";
import { getCatagroies } from "@/modules/Category/services/api/category.service.js";

export const useFetch = () => {
  const categories = ref([]);

  const fetchCategories = async () => {
    try {
      const response = await getCatagroies();
      categories.value = response.data;
    } catch (error) {
      console.log(error);
    }
  };

  return {
    categories,
    fetchCategories,
  };
};
