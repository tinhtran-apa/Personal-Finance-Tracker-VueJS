<template>
  <div class="border-b pb-10 border-input">
    <div class="flex flex-col md:flex-row justify-between gap-4">
      <div>
        <h1 class="text-3xl md:text-5xl font-semibold">Categories</h1>

        <p class="text-neutral mt-2">Manage and organize your spending categories.</p>
      </div>

      <div class="md:my-auto">
        <Button @click="emit('open-dialog-create')" class="w-full md:w-fit bg-primary text-white">
          <img :src="plus" alt="" />
          Create Category
        </Button>
      </div>
    </div>
    <div class="flex flex-col md:flex-row gap-3 pt-4 justify-between">
      <Search @input="emit('search-category', $event)" class="w-full md:max-w-2xl" placeholder="Search categories..." />

      <div class="flex gap-2 items-center">
        <Label> Filter: </Label>
        <Select v-model="type" @change="emit('filter-category-type')">
          <option value="">All</option>
          <option v-for="option in optionsType" :key="option.value" :value="option.value">
            {{ option.label }}
          </option>
        </Select>
      </div>
    </div>
  </div>
</template>

<script setup>
import plus from "@/shared/assets/icons/plus.svg";
import Button from "@/shared/ui/components/Button.vue";
import Label from "@/shared/ui/components/Label.vue";
import Search from "@/shared/ui/components/Search.vue";
import Select from "@/shared/ui/components/Select.vue";

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
