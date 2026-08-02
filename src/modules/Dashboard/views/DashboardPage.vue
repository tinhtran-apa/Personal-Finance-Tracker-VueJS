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
import DashBoardContent from "../components/DashBoardContent.vue";
import RecentTransaction from "../components/RecentTransaction.vue";
import { onMounted } from "vue";
import { CATEGORY_ICON } from "@/shared/utils/shareIcon.js";
import AreaChartTransaction from "../components/AreaChartTransaction.vue";
import DonutChartTransaction from "../components/DonutChartTransaction.vue";
import { useFetch } from "../composables/useFetch.js";

const heads = ["DATE", "DESCRIPTION", "CATEGORY", "AMOUNT"];

const {
  transactions,
  seriesArea,
  seriesDonut,
  yearChart,
  dashboards,
  fetchTransaction,
  fetchSummaryTransaction,
} = useFetch();

onMounted(() => {
  fetchSummaryTransaction();
  fetchTransaction();
});
</script>
