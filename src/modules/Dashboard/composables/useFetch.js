import { ref } from "vue";
import { getTransactions } from "@/modules/Transaction/services/api/transaction.service.js";
import { getDashboard } from "../services/api/dashboard.service.js";

export const useFetch = () => {
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
      const params = {
        size: 3,
        sort: "transactionDate,desc"
      }
      const response = await getTransactions( params );
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

  return {
    transactions,
    seriesArea,
    seriesDonut,
    yearChart,
    dashboards,
    fetchTransaction,
    fetchSummaryTransaction,
  };
};
