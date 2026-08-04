<template>
  <h1 class="text-3xl md:text-5xl font-semibold">Overview</h1>

  <p class="text-neutral mt-2">Welcome back, here's your financial summary.</p>

  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 pt-5 pb-8">
    <BaseCard class="p-3 relative overflow-hidden">
      <div class="relative z-10">
        <div class="flex justify-between pb-4">
          <p class="text-neutral font-semibold text-base md:text-lg lg:text-base xl:text-xl">Total Balance</p>
          <img :src="wallet" alt="" />
        </div>
        <span class="text-xl md:text-2xl lg:text-xl xl:text-4xl font-extrabold flex gap-2"
          ><count-up :end-val="props.dashboards.balance"></count-up> $</span
        >
      </div>
      <div class="w-24 h-24 md:w-32 md:h-32 rounded-full absolute bg-link top-5 -right-5"></div>
    </BaseCard>
    <BaseCard class="p-3 relative">
      <div class="flex justify-between pb-4">
        <p class="text-neutral font-semibold text-base md:text-lg lg:text-base xl:text-xl">Monthly Income</p>
        <div class="flex items-center gap-2 rounded-4xl bg-green-200 px-2">
          <img :src="trendingUp" alt="" />
          <span class="text-xs text-secondary font-semibold"
            > {{ calculatePercent(props.dashboards.totalIncome) }}%</span
          >
        </div>
      </div>
      <span class="text-xl md:text-2xl lg:text-xl xl:text-4xl font-extrabold flex gap-2"
        ><count-up :end-val="props.dashboards.totalIncome"></count-up> $</span
      >
    </BaseCard>
    <BaseCard class="p-3 relative md:col-span-2 lg:col-span-1">
      <div class="flex justify-between pb-4">
        <p class="text-neutral font-semibold text-base md:text-lg lg:text-base xl:text-xl">Total Expense</p>
        <div class="flex items-center gap-2 rounded-4xl bg-red-200 px-2">
          <img :src="trendingDown" alt="" />
          <span class="text-xs text-red-400 font-semibold"
            > {{ calculatePercent(props.dashboards.totalExpense) }}%</span
          >
        </div>
      </div>
      <span class="text-xl md:text-2xl lg:text-xl xl:text-4xl font-extrabold flex gap-2"
        ><count-up :end-val="props.dashboards.totalExpense"></count-up> $</span
      >
    </BaseCard>
    <BaseCard class="p-3 md:col-span-2">
      <div class="flex justify-between items-center flex-wrap gap-2">
        <p class="font-bold">Chart</p>
        <BaseSelect class="w-fit" v-model="model" :options="years" @change="emit('filter-by-year')" />
      </div>
      <div>
        <slot name="Area" />
      </div>
    </BaseCard>
    <BaseCard class="p-3 md:col-span-2 lg:col-span-1">
      <div class="flex flex-col gap-2 justify-center items-center">
        <p class="text-center font-bold">Spending Breakdown</p>
        <div class="w-full max-w-md mx-auto">
          <slot name="Donut" />
        </div>
      </div>
    </BaseCard>
  </div>
</template>

<script setup>

import { BaseCard, BaseSelect } from "@/shared/ui/components";
import wallet from "@/shared/assets/icons/wallet.svg";
import trendingUp from "@/shared/assets/icons/trending-up.svg";
import trendingDown from "@/shared/assets/icons/trending-down.svg";
import CountUp from "vue-countup-v3";


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

const years = Array.from({ length: 11 }, (_, i) => 2020 + i);

const emit = defineEmits(["filter-by-year"]);

const calculatePercent = (value) => {
  if (props.dashboards.balance === 0) {
    return 0;
  }
  return ((value / props.dashboards.balance) * 100).toFixed(2);
};
</script>
