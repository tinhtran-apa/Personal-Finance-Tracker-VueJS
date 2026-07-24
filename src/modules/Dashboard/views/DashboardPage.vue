<template>
  <section>
    <DashBoardContent :totalIncome="totalIncome" :totalExpense="totalExpense" :balance="balance" />
    <RecentTransaction :heads="heads" :transactions="transactions" :icons="CATEGORY_ICON" />
  </section>
</template>

<script setup>
import { getTransactions, summaryTransaction } from "@/modules/Transaction/services/api/transaction.service.js";
import DashBoardContent from "../components/DashBoardContent.vue";
import RecentTransaction from "../components/RecentTransaction.vue";
import { onMounted, ref } from "vue";
import { CATEGORY_ICON } from "@/shared/utils/shareIcon.js";

const heads = ["DATE", "DESCRIPTION", "CATEGORY", "AMOUNT"];
const transactions = ref([]);
const totalIncome = ref(0);
const totalExpense = ref(0);
const balance = ref(0);

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
    const response = await summaryTransaction();
    totalIncome.value = response.data.totalIncome;
    totalExpense.value = response.data.totalExpense;
    balance.value = response.data.balance;
  } catch (error) {
    console.log(error);
  }
};

onMounted(() => {
  fetchSummaryTransaction();
  fetchTransaction();
});
</script>
