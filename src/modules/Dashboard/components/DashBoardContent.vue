<template>
  <h1 class="text-5xl font-semibold">Overview</h1>

  <p class="text-neutral mt-2">Welcome back, here's your financial summary.</p>

  <div class="grid grid-cols-3 gap-5 pt-5 pb-8">
    <Card class="p-3 relative overflow-hidden">
      <div class="flex justify-between pb-4">
        <p class="text-neutral font-semibold text-xl">Total Balance</p>
        <img :src="wallet" alt="" class="z-10" />
      </div>
      <span class="text-4xl font-extrabold z-10 flex gap-2"
        ><count-up :end-val="props.dashboards.balance"></count-up> $</span
      >
      <div class="w-32 h-32 rounded-full absolute bg-link top-5 -right-5"></div>
    </Card>
    <Card class="p-3 relative">
      <div class="flex justify-between pb-4">
        <p class="text-neutral font-semibold text-xl">Monthly Income</p>
        <div class="flex items-center gap-2 rounded-4xl bg-green-200 px-2">
          <img :src="trendingUp" alt="" />
          <span class="text-xs text-secondary font-semibold"
            > {{ calculatePercent(props.dashboards.totalIncome) }}%</span
          >
        </div>
      </div>
      <span class="text-4xl font-extrabold flex gap-2"
        ><count-up :end-val="props.dashboards.totalIncome"></count-up> $</span
      >
    </Card>
    <Card class="p-3 relative">
      <div class="flex justify-between pb-4">
        <p class="text-neutral font-semibold text-xl">Total Expense</p>
        <div class="flex items-center gap-2 rounded-4xl bg-red-200 px-2">
          <img :src="trendingDown" alt="" />
          <span class="text-xs text-red-400 font-semibold"
            > {{ calculatePercent(props.dashboards.totalExpense) }}%</span
          >
        </div>
      </div>
      <span class="text-4xl font-extrabold flex gap-2"
        ><count-up :end-val="props.dashboards.totalExpense"></count-up> $</span
      >
    </Card>
    <Card class="p-3 col-span-2">
      <div class="flex justify-between items-center">
        <p class="font-bold">Chart</p>
        <Select class="w-fit" v-model="model" @change="emit('filter-by-year')">
          <option v-for="year in years" :key="year" :value="year">
            {{ year }}
          </option>
        </Select>
      </div>
      <div>
        <slot name="Area" />
      </div>
    </Card>
    <Card class="p-3">
      <div class="flex flex-col gap-2 justify-center items-center">
        <p class="text-center font-bold">Spending Breakdown</p>
        <div class="">
          <slot name="Donut" />
        </div>
      </div>
    </Card>
  </div>
</template>

<script setup>
import Card from "@/shared/ui/components/Card.vue";
import wallet from "@/shared/assets/icons/wallet.svg";
import trendingUp from "@/shared/assets/icons/trending-up.svg";
import trendingDown from "@/shared/assets/icons/trending-down.svg";
import CountUp from "vue-countup-v3";
import Select from "@/shared/ui/components/Select.vue";

const props = defineProps({
  dashboards: {
    type: Object,
    default: () => {},
  },
});

const model = defineModel({
  type: Number,
  default: 0,
});

const currentYear = new Date().getFullYear();

const years = Array.from({ length: 11 }, (_, i) => 2020 + i);

const emit = defineEmits(["filter-by-year"]);

const calculatePercent = (value) => {
  if (props.dashboards.balance === 0) {
    return 0;
  }
  return ((value / props.dashboards.balance) * 100).toFixed(2);
};
</script>
