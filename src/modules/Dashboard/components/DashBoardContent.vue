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
        ><count-up :end-val="props.balance"></count-up> $</span
      >
      <div class="w-32 h-32 rounded-full absolute bg-link top-5 -right-5"></div>
    </Card>
    <Card class="p-3 relative">
      <div class="flex justify-between pb-4">
        <p class="text-neutral font-semibold text-xl">Monthly Income</p>
        <div class="flex items-center gap-2 rounded-4xl bg-green-200 px-2">
          <img :src="trendingUp" alt="" />
          <span class="text-xs text-secondary font-semibold">+ {{ calculatePercent(props.totalIncome) }}%</span>
        </div>
      </div>
      <span class="text-4xl font-extrabold flex gap-2"><count-up :end-val="props.totalIncome"></count-up> $</span>
    </Card>
    <Card class="p-3 relative">
      <div class="flex justify-between pb-4">
        <p class="text-neutral font-semibold text-xl">Total Expense</p>
        <div class="flex items-center gap-2 rounded-4xl bg-red-200 px-2">
          <img :src="trendingDown" alt="" />
          <span class="text-xs text-red-400 font-semibold">- {{ calculatePercent(props.totalExpense) }}%</span>
        </div>
      </div>
      <span class="text-4xl font-extrabold flex gap-2"><count-up :end-val="props.totalExpense"></count-up> $</span>
    </Card>
    <Card class="p-3 col-span-2">
      <div class="flex justify-between items-center">
        <p>Chart</p>
        <Select class="w-fit">
          <option disabled value="">Month</option>
        </Select>
      </div>
      <svg width="862" height="256" viewBox="0 0 590 256" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g clip-path="url(#clip0_6_80)">
          <rect width="589.333" height="256" rx="8" fill="#F8F9FF" />
          <g opacity="0.1">
            <rect x="32" y="16" width="1" height="224" fill="#76777D" />
            <rect x="136.866" y="16" width="1" height="224" fill="#76777D" />
            <rect x="241.732" y="16" width="1" height="224" fill="#76777D" />
            <rect x="346.598" y="16" width="1" height="224" fill="#76777D" />
            <rect x="451.464" y="16" width="1" height="224" fill="#76777D" />
            <rect x="556.33" y="16" width="1" height="224" fill="#76777D" />
          </g>
          <path
            d="M32 151.34C32 150.235 32.8954 149.34 34 149.34H110.89C111.995 149.34 112.89 150.235 112.89 151.34V224H32V151.34Z"
            fill="#6FFBBE"
          />
          <path
            d="M120.891 114C120.891 112.895 121.786 112 122.891 112H199.771C200.875 112 201.771 112.895 201.771 114V224H120.891V114Z"
            fill="#6FFBBE"
          />
          <path
            d="M209.771 136.41C209.771 135.305 210.667 134.41 211.771 134.41H288.661C289.766 134.41 290.661 135.305 290.661 136.41V224H209.771V136.41Z"
            fill="#6FFBBE"
          />
          <path
            d="M298.662 58C298.662 56.8954 299.557 56 300.662 56H377.552C378.657 56 379.552 56.8954 379.552 58V224H298.662V58Z"
            fill="#6FFBBE"
          />
          <path
            d="M387.553 91.61C387.553 90.5054 388.448 89.61 389.553 89.61H466.443C467.547 89.61 468.443 90.5054 468.443 91.61V224H387.553V91.61Z"
            fill="#6FFBBE"
          />
          <path
            d="M476.443 39.34C476.443 38.2354 477.339 37.34 478.443 37.34H555.333C556.438 37.34 557.333 38.2354 557.333 39.34V224H476.443V39.34Z"
            fill="#6FFBBE"
          />
          <g clip-path="url(#clip1_6_80)">
            <path
              d="M0 204.8C78.5773 170.667 157.155 162.133 235.732 179.2C314.309 196.267 353.598 170.667 353.598 102.4C353.598 34.1333 392.887 42.6667 471.464 128C550.041 213.333 589.33 187.733 589.33 51.2"
              stroke="#131B2E"
              stroke-width="8.4533"
            />
          </g>
        </g>
        <defs>
          <clipPath id="clip0_6_80">
            <rect width="589.333" height="256" rx="8" fill="white" />
          </clipPath>
          <clipPath id="clip1_6_80">
            <rect width="589.33" height="256" fill="white" />
          </clipPath>
        </defs>
      </svg>
    </Card>
    <Card class="p-3">
      <div class="flex flex-col gap-2 justify-center items-center">
        <p class="text-center">Spending Breakdown</p>
        <svg width="160" height="176" viewBox="0 0 160 176" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="8" y="8" width="144" height="144" rx="72" stroke="#D3E4FE" stroke-width="16" />
          <path
            d="M58.2221 88.8V71H59.7981V88.8H58.2221ZM59.1781 87.256C58.0261 87.256 57.0308 87.0527 56.1921 86.646C55.3534 86.2393 54.6954 85.6727 54.2181 84.946C53.7407 84.2193 53.4647 83.3733 53.3901 82.408L55.9741 82.264C56.0568 82.8613 56.2308 83.368 56.4961 83.784C56.7615 84.2 57.1188 84.5153 57.5681 84.73C58.0174 84.9446 58.5674 85.052 59.2181 85.052C59.7648 85.052 60.2307 84.9846 60.6161 84.85C61.0014 84.7153 61.2954 84.514 61.4981 84.246C61.7007 83.978 61.8021 83.648 61.8021 83.256C61.8021 82.8907 61.7167 82.5707 61.5461 82.296C61.3754 82.0213 61.0461 81.7693 60.5581 81.54C60.0701 81.3107 59.3528 81.0893 58.4061 80.876C57.2594 80.6014 56.3381 80.2967 55.6421 79.962C54.9461 79.6274 54.4441 79.2087 54.1361 78.706C53.8281 78.2033 53.6741 77.5733 53.6741 76.816C53.6741 76.0053 53.8741 75.2913 54.2741 74.674C54.6741 74.0567 55.2481 73.576 55.9961 73.232C56.7441 72.888 57.6408 72.716 58.6861 72.716C59.7901 72.716 60.7301 72.9127 61.5061 73.306C62.2821 73.6993 62.8921 74.2427 63.3361 74.936C63.7801 75.6293 64.0528 76.4267 64.1541 77.328L61.5741 77.456C61.5181 76.9547 61.3701 76.5107 61.1301 76.124C60.8901 75.7374 60.5627 75.4367 60.1481 75.222C59.7334 75.0074 59.2328 74.9 58.6461 74.9C57.9074 74.9 57.3261 75.0694 56.9021 75.408C56.4781 75.7467 56.2661 76.188 56.2661 76.732C56.2661 77.1053 56.3555 77.4167 56.5341 77.666C56.7128 77.9153 57.0295 78.1307 57.4841 78.312C57.9388 78.4933 58.5781 78.6773 59.4021 78.864C60.6474 79.136 61.6348 79.47 62.3641 79.866C63.0934 80.262 63.6141 80.73 63.9261 81.27C64.2381 81.81 64.3941 82.4267 64.3941 83.12C64.3941 83.9627 64.1774 84.694 63.7441 85.314C63.3108 85.934 62.7034 86.4127 61.9221 86.75C61.1408 87.0873 60.2261 87.256 59.1781 87.256ZM71.7381 87.32C70.5701 87.32 69.5867 87.066 68.7881 86.558C67.9894 86.05 67.3867 85.3107 66.9801 84.34C66.5734 83.3693 66.3701 82.2 66.3701 80.832C66.3701 79.648 66.4827 78.5493 66.7081 77.536C66.9334 76.5227 67.2814 75.6393 67.7521 74.886C68.2228 74.1327 68.8294 73.5433 69.5721 73.118C70.3148 72.6927 71.2048 72.48 72.2421 72.48C73.5834 72.48 74.6394 72.806 75.4101 73.458C76.1808 74.11 76.7008 74.984 76.9701 76.08L74.4981 76.272C74.3381 75.7867 74.0894 75.4054 73.7521 75.128C73.4147 74.8507 72.9087 74.712 72.2341 74.712C71.2208 74.712 70.4241 75.148 69.8441 76.02C69.2641 76.892 68.9488 78.232 68.8981 80.04L68.4981 79.96C68.6395 79.544 68.8788 79.1567 69.2161 78.798C69.5534 78.4393 69.9774 78.15 70.4881 77.93C70.9988 77.71 71.5914 77.6 72.2661 77.6C73.2208 77.6 74.0568 77.7947 74.7741 78.184C75.4914 78.5733 76.0481 79.122 76.4441 79.83C76.8401 80.538 77.0381 81.3653 77.0381 82.312C77.0381 83.3627 76.8141 84.262 76.3661 85.01C75.9181 85.758 75.2974 86.33 74.5041 86.726C73.7108 87.122 72.7888 87.32 71.7381 87.32ZM71.7381 85.144C72.5327 85.144 73.1787 84.8926 73.6761 84.39C74.1734 83.8873 74.4221 83.2 74.4221 82.328C74.4221 81.776 74.3141 81.2947 74.0981 80.884C73.8821 80.4734 73.5821 80.1554 73.1981 79.93C72.8141 79.7047 72.3647 79.592 71.8501 79.592C71.3061 79.592 70.8221 79.7047 70.3981 79.93C69.9741 80.1554 69.6408 80.4734 69.3981 80.884C69.1555 81.2947 69.0341 81.776 69.0341 82.328C69.0341 82.88 69.1441 83.368 69.3641 83.792C69.5841 84.216 69.8981 84.5473 70.3061 84.786C70.7141 85.0246 71.1914 85.144 71.7381 85.144ZM78.5341 87V84.204H81.4581V87H78.5341ZM89.8861 87V84.168H82.7701V82.04L89.462 72.8H92.4861V81.904H94.1821V84.168H92.4861V87H89.8861ZM85.6101 81.904H89.8861V76.176L85.6101 81.904ZM96.5181 87V72.8H99.0781V81.1479L103.454 76.32H106.606L102.434 80.764L106.746 87H103.874L100.758 82.28L99.0781 84.064V87H96.5181Z"
            fill="black"
          />
          <mask
            id="mask0_6_107"
            style="mask-type: alpha"
            maskUnits="userSpaceOnUse"
            x="16"
            y="16"
            width="128"
            height="128"
          >
            <path d="M80 80L144 16V144H16V16H80V80" fill="black" />
          </mask>
          <g mask="url(#mask0_6_107)">
            <rect x="24" y="24" width="112" height="112" rx="56" stroke="black" stroke-width="16" />
          </g>
        </svg>
      </div>
    </Card>
  </div>
</template>

<script setup>
import Card from "@/shared/ui/components/Card.vue";
import wallet from "@/shared/assets/icons/wallet.svg";
import trendingUp from "@/shared/assets/icons/trending-up.svg";
import trendingDown from "@/shared/assets/icons/trending-down.svg";
import Select from "@/shared/ui/components/Select.vue";
import CountUp from 'vue-countup-v3'

const props = defineProps({
  totalIncome: {
    type: Number,
    default: 0,
  },
  totalExpense: {
    type: Number,
    default: 0,
  },
  balance: {
    type: Number,
    default: 0,
  },
});

const calculatePercent = (value) => {
  return ((value / props.balance) * 100).toFixed(0);
};
</script>
