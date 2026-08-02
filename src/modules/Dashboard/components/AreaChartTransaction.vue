<template>
  <div class="w-full">
    <apexchart type="area" height="300" :options="chartOptions" :series="props.series"></apexchart>
  </div>
</template>
<script setup>
import { ref } from 'vue';

const props = defineProps({
  series: {
    type: Array,
    required: true
  }
});
const chartOptions = ref({
  chart: {
    height: 300,
    type: "area",
    zoom: {
      enabled: false,
    },
    toolbar: {
      show: false,
    },
  },
  dataLabels: {
    enabled: false,
  },
  title: {
    text: "FinTrack Transaction",
    align: "left",
  },
  subtitle: {
    text: "Months in deficit draw in a different color",
    align: "left",
  },
  yaxis: {
    labels: {
      formatter: (val) => `$${val}k`,
    },
  },
  xaxis: {
    categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
  },
  stroke: {
    width: 0,
  },
  plotOptions: {
    line: {
      colors: {
        threshold: 0,
        colorAboveThreshold: "#00E396",
        colorBelowThreshold: "#FF4560",
      },
    },
  },
  responsive: [
    {
      breakpoint: 640,
      options: {
        chart: {
          height: 250,
        },
      },
    },
  ],
});
</script>
