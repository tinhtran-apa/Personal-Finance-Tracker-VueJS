<template>
  <div class="flex justify-between">
    <div>
      <h1 class="text-5xl font-semibold">Categories</h1>

      <p class="text-neutral mt-2">Manage and organize your spending categories.</p>
    </div>

    <div class="my-auto">
      <Button class="w-fit bg-primary text-white">
        <img :src="plus" alt="" />
        Create Category
      </Button>
    </div>
  </div>
  <div class="flex gap-3 pt-4">
    <Search class="w-2xl" placeholder="Search transactions..." />

    <div class="flex gap-3">
      <Select v-model="type" title="Type" :options="optionsType" />
    </div>
  </div>
  
  <div class="pt-10">
    <ListCategory />
  </div>

  <DialogCreateCategory />
</template>

<script setup>
import plus from "@/shared/assets/icons/plus.svg";
import Button from "@/shared/ui/components/Button.vue";
import Search from "@/shared/ui/components/Search.vue";
import Select from "@/shared/ui/components/Select.vue";
import ListCategory from "../components/ListCategory.vue";
import DialogCreateCategory from "../components/DialogCreateCategory.vue";

const optionsType = [
  { label: "Income", value: "INCOME" },
  { label: "Expense", value: "EXPENSE" },
];
</script>
