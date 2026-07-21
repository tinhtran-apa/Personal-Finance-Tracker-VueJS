<script setup>
import Card from "@/shared/ui/components/Card.vue";
import food from "@/shared/assets/icons/food.svg";
</script>

<template>
  <div class="grid grid-cols-[0.75fr 0.25fr] gap-4">
    <Card class="p-3">
      <div class="flex justify-between">
        <div class="rounded-full bg-link p-3">
          <img :src="food" alt="" />
        </div>
        <p class="text-secondary text-xs font-semibold bg-green-100 p-2 rounded-2xl h-fit">12 Transactions</p>
      </div>
      <div class="flex gap-2 flex-col">
        <h2 class="mt-2 font-semibold text-lg">Food & Dining</h2>
        <span class="text-neutral ">$10,0000</span>
        <span class="text-neutral-400 text-xs">This month</span>
      </div>
    </Card>
    <Card class="p-3 ">
      <div class="flex justify-between">
        <div class="rounded-full bg-link p-3">
          <img :src="food" alt="" />
        </div>
        <p class="text-secondary text-xs font-semibold bg-green-100 p-2 rounded-2xl h-fit">12 Transactions</p>
      </div>
      <div class="flex gap-2 flex-col">
        <h2 class="mt-2 font-semibold text-lg">Food & Dining</h2>
        <span class="text-neutral ">$10,0000</span>
        <span class="text-neutral-400 text-xs">This month</span>
      </div>
    </Card>
  </div>
</template>
