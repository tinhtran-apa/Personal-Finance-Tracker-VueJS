<template>
  <div class="grid grid-cols-3 gap-4">
    <Card v-for="category in props.categories" class="p-3 group">
      <div class="flex justify-between">
        <div class="rounded-full bg-link p-3">
          <img :src="food" alt="" />
        </div>
        <p :class="checkType(category.type)">12 Transactions</p>
      </div>
      <div class="flex justify-between">
        <div class="flex gap-2 flex-col">
          <h2 class="mt-2 font-semibold text-lg">{{ category.name }}</h2>

          <span class="text-neutral font-semibold">$10,0000</span>

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
import food from "@/shared/assets/icons/food.svg";
import trash from "@/shared/assets/icons/trash.svg";
import ellipis from "@/shared/assets/icons/ellipis.svg";
import { formatDate } from "@/shared/utils/formatDate";

const emit = defineEmits(["open-dialog-delete", "open-dialog-edit"]);

const props = defineProps({
  categories: {
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
</script>
