import { ref } from "vue";

export const useFilter = (categories, categoriesFilter) => {
  const type = ref("");

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

  return {
    type,
    searchCategory,
    filterCategoryType,
  };
};
