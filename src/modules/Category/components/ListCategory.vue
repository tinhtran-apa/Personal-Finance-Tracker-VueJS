<template>
  <div class="grid grid-cols-3 gap-4">
    <Card v-for="category in props.categories" class="p-3 group hover:scale-95 duration-200 cursor-pointer">
      <div class="flex justify-between">
        <div class="rounded-full bg-link p-3">
          <img :src="findIcon(category.icon)" alt="" />
        </div>
        <p :class="checkType(category.type)">12 Transactions</p>
      </div>
      <div class="flex justify-between">
        <div class="flex gap-2 flex-col">
          <h2 class="mt-2 font-bold text-lg">{{ category.name }}</h2>

          <span :class="checkClassAmount(category.type)">$ {{ formatMoney(checkAmount(category.id)) }}</span>

          <span class="text-neutral-400 text-xs">{{ formatDate(category.createdAt) }}</span>
        </div>

        <div class="flex flex-col items-center gap-2">
          <img
            class="opacity-0 group-hover:opacity-100 duration-200 p-2 rounded-full hover:bg-neutral-50 transition-all active:scale-75 cursor-pointer"
            :src="ellipis"
            alt=""
            @click="emit('open-dialog-edit', category)"
          />

          <img
            class="opacity-0 group-hover:opacity-100 duration-200 p-2 rounded-full hover:bg-red-50 transition-all active:scale-75 cursor-pointer"
            :src="trash"
            alt=""
            @click="emit('open-dialog-delete', category.id)"
          />
        </div>
      </div>
    </Card>
  </div>
</template>

<script setup>
import Card from "@/shared/ui/components/Card.vue";
import food from "@/shared/assets/icons/categories/food.svg";
import trash from "@/shared/assets/icons/trash.svg";
import ellipis from "@/shared/assets/icons/ellipis.svg";
import { formatDate } from "@/shared/utils/formatDate";
import { formatMoney } from "@/shared/utils/formatMoney";

const emit = defineEmits(["open-dialog-delete", "open-dialog-edit"]);

const props = defineProps({
  categories: {
    type: Array,
    default: () => [],
  },
  summaryAmount: {
    type: Array,
    default: () => [],
  },
  icons: {
    type: Array,
    default: () => [],
  },
});

const checkType = (field) => {
  return [
    "text-xs font-semibold bg-green-100 p-2 rounded-2xl h-fit",
    field === "INCOME" ? "text-secondary bg-green-100" : "text-red-400 bg-red-100",
  ];
};

const checkAmount = (field) => {
  const item = props.summaryAmount.find((item) => item.categoryId === field);

  return item ? item.total : 0;
};

const checkClassAmount = (field) => {
  return ["font-extrabold", field === "EXPENSE" ? "text-red-500" : "text-secondary"];
};

const findIcon = (field) => {
  const item = props.icons.find((icon) => {
    return icon.label === field;
  });

  if (item) {
    return item.icon;
  }

  return "";
};
</script>
