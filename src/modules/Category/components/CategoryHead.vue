<template>
  <div class="border-b pb-10 border-input">
    <div class="flex flex-col md:flex-row justify-between gap-4">
      <div>
        <h1 class="text-3xl md:text-5xl font-semibold">Categories</h1>

        <p class="text-neutral mt-2">Manage and organize your spending categories.</p>
      </div>

      <div class="md:my-auto w-full md:w-fit">
        <BaseButton @click="emit('open-dialog-create')" variant="primary">
          <img :src="plus" alt="" />
          Create Category
        </BaseButton>
      </div>
    </div>
    <div class="flex flex-col md:flex-row gap-3 pt-4 justify-between">
      <BaseSearch @input="emit('search-category', $event)" class="w-full md:max-w-2xl" placeholder="Search categories..." />

      <div class="flex gap-2 items-center">
        <BaseLabel> Filter: </BaseLabel>
        <BaseSelect v-model="type" :options="optionsType" placeholder="All" @change="emit('filter-category-type')" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { BaseButton, BaseLabel, BaseSearch, BaseSelect } from "@/shared/ui/components";
import plus from "@/shared/assets/icons/plus.svg";





const emit = defineEmits(["open-dialog-create", "search-category", "filter-category-type"]);

const props = defineProps({
  optionsType: {
    type: Array,
    default: () => [],
  },
});
const type = defineModel({
  type: String,
  default: "",
});
</script>
