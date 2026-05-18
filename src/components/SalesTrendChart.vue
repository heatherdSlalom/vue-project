<script setup lang="ts">
import {
  CategoryScale,
  Chart as ChartJS,
  Filler,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  Tooltip,
  type ChartData,
  type ChartOptions,
} from 'chart.js'
import { Line } from 'vue-chartjs'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend, Filler)

const chartData: ChartData<'line'> = {
  labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  datasets: [
    {
      label: 'Engagement',
      data: [22, 31, 29, 42, 38, 55, 61],
      borderColor: '#1d4ed8',
      backgroundColor: 'rgba(29, 78, 216, 0.18)',
      fill: true,
      tension: 0.35,
      pointBackgroundColor: '#1d4ed8',
      pointBorderColor: '#ffffff',
      pointBorderWidth: 2,
      pointRadius: 4,
    },
  ],
}

const chartOptions: ChartOptions<'line'> = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false,
    },
    tooltip: {
      intersect: false,
      mode: 'index',
    },
  },
  scales: {
    x: {
      grid: {
        display: false,
      },
    },
    y: {
      beginAtZero: true,
      grid: {
        color: 'rgba(15, 23, 42, 0.08)',
      },
    },
  },
}
</script>

<template>
  <div class="chart-shell">
    <Line :data="chartData" :options="chartOptions" />
  </div>
</template>

<style scoped>
.chart-shell {
  min-height: 320px;
}
</style>