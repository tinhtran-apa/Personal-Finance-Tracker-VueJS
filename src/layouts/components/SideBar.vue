<template>
  <aside class="min-h-screen w-full max-w-64 border-r border-input shadow-sm py-8 bg-card sticky top-0 shrink-0">
    <div class="px-2 mb-8 flex gap-4 items-center">
      <img :src="finTrack" alt="" />

      <div>
        <h1 class="text-2xl leading-7 font-semibold">FinTrack Pre</h1>

        <span class="text-xs ">Reliable Wealth Management</span>
      </div>
    </div>
    <div class="flex flex-col gap-2 px-2">
      <RouterLink :to="head.path" v-for="head in heads" :key="head" :class="checkPathDesktop(head.path)">
        <img :src="head.icon" alt="" />
        <span>{{ head.title }}</span>
      </RouterLink>
    </div>
  </aside>
</template>

<script setup>
import { ROUTES } from "@/constants/routes";
import transaction from "@/shared/assets/icons/transaction.svg";
import category from "@/shared/assets/icons/category.svg";
import dashboard from "@/shared/assets/icons/dashboard.svg";
import { useRoute } from "vue-router";
import finTrack from "@/shared/assets/icons/fintrack.svg";

const heads = [
  {
    title: "Dashboard",
    path: ROUTES.DASHBOARD,
    icon: dashboard,
  },
  {
    title: "Category",
    path: ROUTES.CATEGORIES,
    icon: category,
  },
  {
    title: "Transaction",
    path: ROUTES.TRANSACTIONS,
    icon: transaction,
  },
];

const route = useRoute();

const checkPathDesktop = (field) => {
  return [
    "text-sm py-3 px-4 duration-200 hover:bg-link active:font-normal rounded-lg hover:translate-x-1 flex gap-2",
    route.path == field ? "bg-link font-semibold border-r-4" : "",
  ];
};
</script>
