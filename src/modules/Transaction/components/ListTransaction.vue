<template>
  <Table>
    <TableHeader>
      <TableRow>
        <TableHead v-for="head in heads">{{ head }}</TableHead>
        <TableHead></TableHead>
      </TableRow>
    </TableHeader>

    <TableBody>
      <TableRow v-for="transaction in props.transactions" :key="transaction.id" class="group">
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
            <img :src="findIcon(transaction.categoryIcon)" alt="" class="h-5">
            {{ transaction.categoryName }}
          </span></TableCell
        >

        <TableCell
          ><span :class="checkClassAmount(transaction.type)"
            >{{ checkCalAmount(transaction.type) + " " + formatMoney(transaction.amount) }} $</span
          ></TableCell
        >

        <TableCell>
          <div :class="checkClassType(transaction.type)">
            <img :src="checkIconType(transaction.type)" alt="" />

            <span>{{ transaction.type }}</span>
          </div>
        </TableCell>

        <TableCell>
          <div class="flex items-center gap-2">
            <img
              @click="emit('open-dialog-edit', transaction)"
              class="opacity-0 group-hover:opacity-100 duration-200 p-2 rounded-full hover:bg-neutral-50 transition-all active:scale-75 cursor-pointer"
              :src="ellipis"
              alt=""
            />
            <img
              @click="emit('open-dialog-delete', transaction.id)"
              class="opacity-0 group-hover:opacity-100 duration-200 p-2 rounded-full hover:bg-red-50 transition-all active:scale-75 cursor-pointer"
              :src="trash"
              alt=""
            />
          </div>
        </TableCell>
      </TableRow>
    </TableBody>
    <TableFooter>
      <TableRow>
        <TableCell colspan="6">
          <div class="flex justify-between">
            <p class="text-neutral text-xs flex items-center">
              Showing {{ props.page + 1 }} to {{ props.totalPages }} of {{ props.totalElements }} result
            </p>

            <div class="flex gap-1">
              <Button
                @click="emit('change-page', props.page - 1)"
                class="py-2 px-2 bg-transparent shadow-none rounded-xl hover:bg-link"
                ><img :src="chevronLeft" alt=""
              /></Button>

              <!-- <Button class="py-2 px-2 shadow-none rounded-xl hover:bg-link bg-primary text-white">1</Button> -->

              <Button
                v-for="i in totalPages"
                :key="i"
                @click="emit('change-page', i - 1)"
                class="py-2 px-2 bg-transparent shadow-none rounded-xl hover:bg-link"
              >
                {{ i }}</Button
              >

              <!-- <Button class="py-2 px-2 bg-transparent shadow-none rounded-xl hover:bg-link">3</Button> -->

              <!-- <span class="flex items-center">...</span> -->

              <Button
                @click="emit('change-page', props.page + 1)"
                class="py-2 px-2 bg-transparent shadow-none rounded-xl hover:bg-link"
                ><img :src="chevronRight" alt=""
              /></Button>
            </div>
          </div>
        </TableCell>
      </TableRow>
    </TableFooter>
  </Table>
</template>

<script setup>
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/ui/components/table/index";
import arrowDown from "@/shared/assets/icons/arrow-down.svg";
import arrowUp from "@/shared/assets/icons/arrow-up.svg";
import ellipis from "@/shared/assets/icons/ellipis.svg";
import trash from "@/shared/assets/icons/trash.svg";
import chevronLeft from "@/shared/assets/icons/chevron-left.svg";
import chevronRight from "@/shared/assets/icons/chevron-right.svg";
import Button from "@/shared/ui/components/Button.vue";
import { formatDate } from "@/shared/utils/formatDate";
import { formatTime } from "@/shared/utils/formatTime";
import { formatMoney } from "@/shared/utils/formatMoney";
const props = defineProps({
  heads: {
    type: Array,
    default: () => [],
  },
  transactions: {
    type: Array,
    default: () => [],
  },
  page: {
    type: Number,
    default: 0,
  },
  totalPages: {
    type: Number,
    default: 0,
  },
  totalElements: {
    type: Number,
    default: 0,
  },
  icons: {
    type: Array,
    default: 0,
  },
});
const emit = defineEmits(["open-dialog-edit", "open-dialog-delete", "change-page"]);

const checkIconType = (field) => {
  return field === "EXPENSE" ? arrowUp : arrowDown;
};

const checkClassType = (field) => {
  return [
    "flex justify-between rounded-full py-1 px-2 font-semibold w-fit",
    field === "EXPENSE" ? "text-red-400 bg-red-100" : "text-secondary bg-green-100",
  ];
};

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
