<template>
  <Table>
    <TableHeader>
      <TableRow>
        <TableCell :colspan="Number(props.heads.length / 2)"
          ><span class="font-bold text-lg">Recent transactions</span></TableCell
        >
        <TableCell :colspan="Number(props.heads.length / 2)" class="text-end"
          ><RouterLink class="hover:font-bold text-xs" :to="PATH.TRANSACTIONS.href">View All</RouterLink></TableCell
        >
      </TableRow>
    </TableHeader>
    <TableHeader>
      <TableRow>
        <TableHead v-for="head in props.heads">{{ head }}</TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      <TableRow v-for="transaction in props.transactions" :key="transaction.id">
        <TableCell
          ><div class="flex flex-col gap-1 italic font-semibold">
            <span>{{ formatDate(transaction.transactionDate) }}</span>
            <span class="text-neutral-400 text-xs">{{ formatTime(transaction.createdAt) }}</span>
          </div>
        </TableCell>

        <TableCell
          ><span class="break-words">{{ transaction.description }}</span></TableCell
        >

        <TableCell
          ><span class="bg-gray-200 px-2 py-1 rounded-full font-semibold flex gap-2 w-fit">
            <img :src="findIcon(transaction.categoryIcon)" alt="" class="h-5" />
            {{ transaction.categoryName }}
          </span></TableCell
        >

        <TableCell
          ><span :class="checkClassAmount(transaction.type)"
            >{{ checkCalAmount(transaction.type) + " " + formatMoney(transaction.amount) }} $</span
          ></TableCell
        >
      </TableRow>
    </TableBody>
  </Table>
</template>

<script setup>
import { PATH } from "@/shared/constants/path.constant.js";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/shared/ui/components/table";
import { formatDate } from "@/shared/utils/formatDate";
import { formatMoney } from "@/shared/utils/formatMoney";
import { formatTime } from "@/shared/utils/formatTime";
const props = defineProps({
  heads: {
    type: Array,
    default: () => [],
  },
  transactions: {
    type: Array,
    default: () => [],
  },
  icons: {
    type: Array,
    default: 0,
  },
});

const checkClassAmount = (field) => {
  return ["font-extrabold", field === "EXPENSE" ? "text-red-500" : "text-secondary"];
};

const checkCalAmount = (field) => {
  return field === "EXPENSE" ? "-" : "+";
};

const findIcon = (field) => {
  const item = props.icons.find((icon) => {
    return icon.label === field;
  });

  if (item) {
    return item.icon;
  }

  return "";
};
</script>
