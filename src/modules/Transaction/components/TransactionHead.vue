<template>
  <div class="flex justify-between">
    <div>
      <h1 class="text-5xl font-semibold">Transactions</h1>

      <p class="text-neutral mt-2">Review and manage your financial activity.</p>
    </div>

    <div class="my-auto">
      <Button @click="emit('open-dialog-create')" class="w-fit bg-primary text-white">
        <img :src="plus" alt="" />

        Create Transaction
      </Button>
    </div>
  </div>

  <div class="flex justify-between gap-3 pt-4">
    <Search @input="emit('search-transaction', $event)" class="w-2xl" placeholder="Search transactions..." />

    <div class="flex gap-3">
      <div v-if="filter !== 'date'" class="flex items-center gap-2">
        <Label>Choose: </Label>

        <Select v-model="filterValue" :disabled="checkChoose" :class="{ 'bg-neutral-200': checkChoose }">
          <option value="">All</option>

          <option v-if="filter === 'type'" v-for="option in optionsType" :key="option" :value="option.value">
            {{ option.label }}
          </option>

          <option v-if="filter === 'categoryId'" v-for="category in categories" :key="category" :value="category.id">
            {{ category.name }}
          </option>
        </Select>
      </div>
      <div v-else class="flex gap-2 items-center">
        <div class="flex gap-2 items-center">
          <Label for="from">From:</Label>

          <Input v-model="from" id="from" type="date" />
        </div>
        <div class="flex gap-2 items-center">
          <Label for="to">To:</Label>

          <Input v-model="to" id="to" type="date" />
        </div>
      </div>

      <div class="flex items-center gap-2">
        <Label>Filter: </Label>

        <Select v-model="filter">
          <option value="">All</option>

          <option v-for="option in optionsFilter" :value="option.value">
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
import Input from "@/shared/ui/components/Input.vue";
import Label from "@/shared/ui/components/Label.vue";
import Search from "@/shared/ui/components/Search.vue";
import Select from "@/shared/ui/components/Select.vue";
import { computed, watch } from "vue";

const emit = defineEmits(["open-dialog-create", "search-transaction"]);

const props = defineProps({
  optionsType: {
    type: Array,
    default: () => [],
  },
  optionsFilter: {
    type: Array,
    default: () => [],
  },
  categories: {
    type: Array,
    default: () => [],
  },
});
const filterValue = defineModel("filterValue", {
  type: String,
  default: "",
});

const filter = defineModel("filter", {
  type: String,
  default: "",
});

const to = defineModel("to", {
  type: String,
  default: "",
});

const from = defineModel("from", {
  type: String,
  default: "",
});

const checkChoose = computed(() => {
  return !filter.value ? true : false;
});
</script>
