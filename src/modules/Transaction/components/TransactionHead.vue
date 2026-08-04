<template>
  <div class="border-b pb-10 border-input">
    <div class="flex flex-col md:flex-row justify-between gap-4">
      <div>
        <h1 class="text-3xl md:text-5xl font-semibold">Transactions</h1>

        <p class="text-neutral mt-2">Review and manage your financial activity.</p>
      </div>

      <div class="md:my-auto w-full md:w-fit">
        <BaseButton @click="emit('open-dialog-create')" variant="primary">
          <img :src="plus" alt="" />

          Create Transaction
        </BaseButton>
      </div>
    </div>

    <div class="flex flex-col lg:flex-row justify-between gap-3 pt-4">
      <div class="w-full lg:max-w-2xl">
        <BaseSearch
          :disabled="allowInput"
          @input="emit('search-transaction', $event.target.value)"
          placeholder="Search transactions..."
        />
      </div>

      <div class="flex flex-col sm:flex-row gap-3">
        <div v-if="filter !== 'date'" class="flex items-center gap-2">
          <BaseLabel>Choose: </BaseLabel>

          <BaseSelect v-model="filterValue" :disabled="checkChoose" :options="chooseOptions" placeholder="All" />
        </div>
        <div v-else class="flex flex-col sm:flex-row gap-2 items-start sm:items-center">
          <div class="flex gap-2 items-center">
            <BaseLabel for="from">From:</BaseLabel>

            <BaseInput v-model="from" id="from" type="date" />
          </div>
          <div class="flex gap-2 items-center">
            <BaseLabel for="to">To:</BaseLabel>

            <BaseInput v-model="to" id="to" type="date" />
          </div>
        </div>

        <div class="flex items-center gap-2">
          <BaseLabel>Filter: </BaseLabel>

          <BaseSelect v-model="filter" :options="optionsFilter" placeholder="All" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { BaseButton, BaseInput, BaseLabel, BaseSearch, BaseSelect } from "@/shared/ui/components";
import plus from "@/shared/assets/icons/plus.svg";





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

const chooseOptions = computed(() => {
  if (filter.value === "type") return props.optionsType;
  if (filter.value === "categoryId") {
    return props.categories.map((category) => ({ label: category.name, value: category.id }));
  }
  return [];
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

const allowInput = computed(() => {
  return filter.value === "date" ? true : false;
});
</script>
