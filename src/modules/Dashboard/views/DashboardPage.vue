<template>
  <section>
    <DashBoardContent @filter-by-year="fetchSummaryTransaction" v-model="yearChart" :dashboards="dashboards">
      <template #Area>
        <AreaChartTransaction :series="seriesArea" />
      </template>
      <template #Donut>
        <DonutChartTransaction :series="seriesDonut" />
      </template>
    </DashBoardContent>
    <RecentTransaction :heads="heads" :transactions="transactions" :icons="CATEGORY_ICON" />
  </section>
</template>

<script setup>
import { getTransactions } from "@/modules/Transaction/services/api/transaction.service.js";
import DashBoardContent from "../components/DashBoardContent.vue";
import RecentTransaction from "../components/RecentTransaction.vue";
import { onMounted, ref } from "vue";
import { CATEGORY_ICON } from "@/shared/utils/shareIcon.js";
import AreaChartTransaction from "../components/AreaChartTransaction.vue";
import DonutChartTransaction from "../components/DonutChartTransaction.vue";
import { getDashboard } from "../services/api/dashboard.service.js";

const heads = ["DATE", "DESCRIPTION", "CATEGORY", "AMOUNT"];
const transactions = ref([]);
const seriesArea = ref([]);
const seriesDonut = ref([]);
const yearChart = ref(new Date().getFullYear());
const dashboards = ref({
  totalIncome: 0,
  totalExpense: 0,
  balance: 0,
  categoryCount: 0,
  transactionCount: 0,
  monthlySummary: [],
});

const fetchTransaction = async () => {
  try {
    const response = await getTransactions({ size: 3 });
    transactions.value = response.data.items;
  } catch (error) {
    console.log(error);
  }
};

const fetchSummaryTransaction = async () => {
  try {
    const response = await getDashboard({ year: yearChart.value });
    dashboards.value = response.data;

    const income = Array(12).fill(0);
    const expense = Array(12).fill(0);

    dashboards.value.monthlySummary.forEach((item) => {
      if (item.type === "INCOME") {
        income[item.month - 1] = item.total;
      } else {
        expense[item.month - 1] = -item.total;
      }
    });
    seriesArea.value = [
      {
        name: "Income",
        data: income,
      },
      {
        name: "Expense",
        data: expense,
      },
    ];
    seriesDonut.value = [dashboards.value.categoryCount, dashboards.value.transactionCount];
  } catch (error) {
    console.log(error);
  }
};

onMounted(() => {
  fetchSummaryTransaction();
  fetchTransaction();
});
</script>
