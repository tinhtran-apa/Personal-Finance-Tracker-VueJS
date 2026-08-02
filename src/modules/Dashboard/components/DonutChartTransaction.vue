<template>
  <div class="w-full flex justify-center">
    <apexchart :key="series.join('-')" type="donut" width="100%" :options="chartOptions" :series="props.series" />
  </div>
</template>

<script setup>
const props = defineProps({
  series: {
    type: Array,
    default: () => [],
  },
});

const chartOptions = {
  chart: {
    type: "donut",
  },

  plotOptions: {
    pie: {
      startAngle: -90,
      endAngle: 270,
    },
  },

  labels: ["Category", "Transaction"],

  dataLabels: {
    enabled: false,
  },

  fill: {
    type: "gradient",
  },

  legend: {
    formatter: (val, opts) => {
      return val + ": " + opts.w.globals.series[opts.seriesIndex];
    },
    position: "bottom",
  },
  responsive: [
    {
      breakpoint: 640,
      options: {
        plotOptions: {
          pie: {
            donut: {
              size: "65%",
            },
          },
        },
        legend: {
          position: "bottom",
        },
      },
    },
  ],
};
</script>

<style scoped>
.apexcharts-legend-text tspan:nth-child(1) {
  font-weight: lighter;
  fill: #999;
}

.apexcharts-legend-text tspan:nth-child(3) {
  font-weight: bold;
}
</style>
