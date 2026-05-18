<script setup lang="ts">
import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Filler,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  type ChartData,
  type ChartOptions,
} from 'chart.js'
import { Bar, Line } from 'vue-chartjs'
import { computed, inject } from 'vue'
import { dashboardKey } from '../composables/dashboardContext'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler,
)

// Inject the dashboard composable from App.vue
const dashboard = inject(dashboardKey)
if (!dashboard) {
  throw new Error('Dashboard context was not provided')
}
const { metrics, summary, selectedMonth, changeFromPrevious } = dashboard

const visitorsCardValue = computed(() => {
  if (selectedMonth.value === null) {
    return metrics.value.reduce((sum, m) => sum + m.visitors, 0)
  }
  return summary.value.avgVisitors ?? 0
})

// Format currency
const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value)
}

// Format percentage
const formatPercentage = (value: number) => {
  return value.toFixed(2) + '%'
}

// Determine arrow and color for change
const getChangeIndicator = (changePercent: number | string) => {
  const num = typeof changePercent === 'string' ? parseFloat(changePercent) : changePercent
  if (num > 0) {
    return { icon: 'mdi-arrow-up', color: 'success', text: `+${num}%` }
  } else if (num < 0) {
    return { icon: 'mdi-arrow-down', color: 'error', text: `${num}%` }
  } else {
    return { icon: 'mdi-minus', color: 'info', text: '0%' }
  }
}

// Revenue Chart Data
const revenueChartData = computed<ChartData<'bar'>>(() => {
  const labels = metrics.value.map((m) => m.month.substring(0, 3))
  const values = metrics.value.map((m) => m.revenue)
  const selectedIndex =
    selectedMonth.value === null
      ? -1
      : metrics.value.findIndex((m) => m.monthNumber === selectedMonth.value)

  return {
    labels,
    datasets: [
      {
        label: 'Revenue',
        data: values,
        backgroundColor: values.map((_, index) => {
          if (selectedIndex === -1) {
            return 'rgba(129, 140, 248, 0.78)'
          }
          return index === selectedIndex ? 'rgba(129, 140, 248, 0.95)' : 'rgba(107, 114, 128, 0.35)'
        }),
        borderColor: values.map((_, index) => {
          if (selectedIndex === -1) {
            return 'rgba(129, 140, 248, 1)'
          }
          return index === selectedIndex ? 'rgba(129, 140, 248, 1)' : 'rgba(107, 114, 128, 0.45)'
        }),
        borderWidth: 2,
      },
    ],
  }
})

const revenueChartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: true,
      labels: {
        color: '#e5e7eb',
      },
    },
    tooltip: {
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
      titleColor: '#fff',
      bodyColor: '#e5e7eb',
      callbacks: {
        label: function (context: any) {
          return formatCurrency(context.parsed.y)
        },
      },
    },
  },
  scales: {
    x: {
      ticks: {
        color: '#9ca3af',
      },
      grid: {
        color: 'rgba(75, 85, 99, 0.2)',
      },
    },
    y: {
      ticks: {
        color: '#9ca3af',
        callback: function (value: any) {
          return '$' + (value / 1000).toFixed(0) + 'k'
        },
      },
      grid: {
        color: 'rgba(75, 85, 99, 0.2)',
      },
    },
  },
} as ChartOptions<'bar'>

// Visitors Chart Data
const visitorsChartData = computed<ChartData<'line'>>(() => {
  const labels = metrics.value.map((m) => m.month.substring(0, 3))
  const values = metrics.value.map((m) => m.visitors)
  const selectedIndex =
    selectedMonth.value === null
      ? -1
      : metrics.value.findIndex((m) => m.monthNumber === selectedMonth.value)

  return {
    labels,
    datasets: [
      {
        label: 'Visitors',
        data: values,
        borderColor: 'rgba(63, 198, 183, 1)',
        backgroundColor: 'rgba(63, 198, 183, 0.12)',
        borderWidth: 3,
        fill: false,
        tension: 0.4,
        pointBackgroundColor: values.map((_, index) => {
          if (selectedIndex === -1) {
            return 'rgba(63, 198, 183, 0.95)'
          }
          return index === selectedIndex ? 'rgba(63, 198, 183, 1)' : 'rgba(63, 198, 183, 0.2)'
        }),
        pointBorderColor: values.map((_, index) => (selectedIndex !== -1 && index === selectedIndex ? '#d1fae5' : 'rgba(0,0,0,0)')),
        pointBorderWidth: values.map((_, index) => (selectedIndex !== -1 && index === selectedIndex ? 3 : 0)),
        pointRadius: values.map((_, index) => {
          if (selectedIndex === -1) {
            return 2
          }
          return index === selectedIndex ? 7 : 0
        }),
        pointHoverRadius: values.map((_, index) => (index === selectedIndex ? 8 : 4)),
      },
    ],
  }
})

const visitorsChartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: true,
      labels: {
        color: '#e5e7eb',
      },
    },
    tooltip: {
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
      titleColor: '#fff',
      bodyColor: '#e5e7eb',
    },
  },
  scales: {
    x: {
      ticks: {
        color: '#9ca3af',
      },
      grid: {
        color: 'rgba(75, 85, 99, 0.2)',
      },
    },
    y: {
      ticks: {
        color: '#9ca3af',
      },
      grid: {
        color: 'rgba(75, 85, 99, 0.2)',
      },
    },
  },
} as ChartOptions<'line'>

// Conversions Chart Data
const conversionsChartData = computed<ChartData<'line'>>(() => {
  const labels = metrics.value.map((m) => m.month.substring(0, 3))
  const values = metrics.value.map((m) => m.conversions)
  const selectedIndex =
    selectedMonth.value === null
      ? -1
      : metrics.value.findIndex((m) => m.monthNumber === selectedMonth.value)

  return {
    labels,
    datasets: [
      {
        label: 'Conversions %',
        data: values,
        borderColor: 'rgba(167, 139, 250, 0.95)',
        backgroundColor: 'rgba(167, 139, 250, 0.3)',
        borderWidth: 3,
        fill: true,
        tension: 0.4,
        pointBackgroundColor: values.map((_, index) => {
          if (selectedIndex === -1) {
            return 'rgba(167, 139, 250, 0.95)'
          }
          return index === selectedIndex ? 'rgba(167, 139, 250, 1)' : 'rgba(167, 139, 250, 0.28)'
        }),
        pointBorderColor: values.map((_, index) => (selectedIndex !== -1 && index === selectedIndex ? '#f5f3ff' : 'rgba(0,0,0,0)')),
        pointBorderWidth: values.map((_, index) => (selectedIndex !== -1 && index === selectedIndex ? 3 : 0)),
        pointRadius: values.map((_, index) => {
          if (selectedIndex === -1) {
            return 2
          }
          return index === selectedIndex ? 7 : 0
        }),
        pointHoverRadius: values.map((_, index) => (index === selectedIndex ? 8 : 4)),
      },
    ],
  }
})

const conversionsChartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: true,
      labels: {
        color: '#e5e7eb',
      },
    },
    tooltip: {
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
      titleColor: '#fff',
      bodyColor: '#e5e7eb',
      callbacks: {
        label: function (context: any) {
          return formatPercentage(context.parsed.y)
        },
      },
    },
  },
  scales: {
    x: {
      ticks: {
        color: '#9ca3af',
      },
      grid: {
        color: 'rgba(75, 85, 99, 0.2)',
      },
    },
    y: {
      ticks: {
        color: '#9ca3af',
        callback: function (value: any) {
          return (value as number).toFixed(1) + '%'
        },
      },
      grid: {
        color: 'rgba(75, 85, 99, 0.2)',
      },
    },
  },
} as ChartOptions<'line'>

const revenueChange = computed(() => {
  if (selectedMonth.value === null) {
    // When "All months" is selected, compare December to November
    const december = metrics.value.find((m) => m.monthNumber === 12)
    const november = metrics.value.find((m) => m.monthNumber === 11)
    if (december && november) {
      const change = (((december.revenue - november.revenue) / november.revenue) * 100).toFixed(1)
      return getChangeIndicator(change)
    }
  } else {
    const change = parseFloat(changeFromPrevious.value.revenue as string)
    return getChangeIndicator(change)
  }
  return { icon: 'mdi-minus', color: 'info', text: '0%' }
})

const visitorsChange = computed(() => {
  if (selectedMonth.value === null) {
    const december = metrics.value.find((m) => m.monthNumber === 12)
    const november = metrics.value.find((m) => m.monthNumber === 11)
    if (december && november) {
      const change = (((december.visitors - november.visitors) / november.visitors) * 100).toFixed(1)
      return getChangeIndicator(change)
    }
  } else {
    const change = parseFloat(changeFromPrevious.value.visitors as string)
    return getChangeIndicator(change)
  }
  return { icon: 'mdi-minus', color: 'info', text: '0%' }
})

const conversionsChange = computed(() => {
  if (selectedMonth.value === null) {
    const december = metrics.value.find((m) => m.monthNumber === 12)
    const november = metrics.value.find((m) => m.monthNumber === 11)
    if (december && november) {
      const change = (december.conversions - november.conversions).toFixed(2)
      return getChangeIndicator(change)
    }
  } else {
    const change = changeFromPrevious.value.conversions
    return getChangeIndicator(change)
  }
  return { icon: 'mdi-minus', color: 'info', text: '0%' }
})

const ordersChange = computed(() => {
  if (selectedMonth.value === null) {
    const december = metrics.value.find((m) => m.monthNumber === 12)
    const november = metrics.value.find((m) => m.monthNumber === 11)
    if (december && november) {
      const change = (((december.orders - november.orders) / november.orders) * 100).toFixed(1)
      return getChangeIndicator(change)
    }
  } else {
    const change = parseFloat(changeFromPrevious.value.orders as string)
    return getChangeIndicator(change)
  }
  return { icon: 'mdi-minus', color: 'info', text: '0%' }
})

const cardSubLabel = computed(() => (selectedMonth.value === null ? 'Full year' : 'vs prev month'))
</script>

<template>
  <v-container fluid class="dashboard-wrap py-8 px-4 px-md-10">
    <!-- Summary Cards Row -->
    <v-row class="summary-row">
      <!-- Revenue Card -->
      <v-col cols="12" sm="6" md="3">
        <v-card elevation="0" class="metric-card h-100">
          <v-card-text class="pa-5">
            <div class="d-flex align-start justify-space-between mb-2">
              <div class="text-overline font-weight-bold" style="color: #c9ced6; font-size: 0.75rem; letter-spacing: 0.14em">REVENUE</div>
              <div class="card-icon revenue-icon">
                <v-icon size="16">mdi-currency-usd</v-icon>
              </div>
            </div>
            <div class="text-h5 font-weight-bold mb-1" style="color: #f3f4f6">{{ formatCurrency(summary.totalRevenue) }}</div>
            <div v-if="selectedMonth === null" class="text-body-2" style="color: #d1d5db">{{ cardSubLabel }}</div>
            <div v-else class="d-flex align-center gap-1">
              <v-icon :color="revenueChange.color" size="small">{{ revenueChange.icon }}</v-icon>
              <span :class="`text-caption ${revenueChange.color}--text`" style="font-size: 0.8rem">{{ revenueChange.text }} {{ cardSubLabel }}</span>
            </div>
          </v-card-text>
        </v-card>
      </v-col>

      <!-- Visitors Card -->
      <v-col cols="12" sm="6" md="3">
        <v-card elevation="0" class="metric-card h-100">
          <v-card-text class="pa-5">
            <div class="d-flex align-start justify-space-between mb-2">
              <div class="text-overline font-weight-bold" style="color: #c9ced6; font-size: 0.75rem; letter-spacing: 0.14em">VISITORS</div>
              <div class="card-icon visitors-icon">
                <v-icon size="16">mdi-account-group</v-icon>
              </div>
            </div>
            <div class="text-h5 font-weight-bold mb-1" style="color: #f3f4f6">{{ visitorsCardValue.toLocaleString() }}</div>
            <div v-if="selectedMonth === null" class="text-body-2" style="color: #d1d5db">{{ cardSubLabel }}</div>
            <div v-else class="d-flex align-center gap-1">
              <v-icon :color="visitorsChange.color" size="small">{{ visitorsChange.icon }}</v-icon>
              <span :class="`text-caption ${visitorsChange.color}--text`" style="font-size: 0.8rem">{{ visitorsChange.text }} {{ cardSubLabel }}</span>
            </div>
          </v-card-text>
        </v-card>
      </v-col>

      <!-- Conversions Card -->
      <v-col cols="12" sm="6" md="3">
        <v-card elevation="0" class="metric-card h-100">
          <v-card-text class="pa-5">
            <div class="d-flex align-start justify-space-between mb-2">
              <div class="text-overline font-weight-bold" style="color: #c9ced6; font-size: 0.75rem; letter-spacing: 0.14em">CONVERSIONS</div>
              <div class="card-icon conversions-icon">
                <v-icon size="16">mdi-percent</v-icon>
              </div>
            </div>
            <div class="text-h5 font-weight-bold mb-1" style="color: #f3f4f6">{{ formatPercentage(summary.avgConversions) }}</div>
            <div v-if="selectedMonth === null" class="text-body-2" style="color: #d1d5db">{{ cardSubLabel }}</div>
            <div v-else class="d-flex align-center gap-1">
              <v-icon :color="conversionsChange.color" size="small">{{ conversionsChange.icon }}</v-icon>
              <span :class="`text-caption ${conversionsChange.color}--text`" style="font-size: 0.8rem">{{ conversionsChange.text }} {{ cardSubLabel }}</span>
            </div>
          </v-card-text>
        </v-card>
      </v-col>

      <!-- Orders Card -->
      <v-col cols="12" sm="6" md="3">
        <v-card elevation="0" class="metric-card h-100">
          <v-card-text class="pa-5">
            <div class="d-flex align-start justify-space-between mb-2">
              <div class="text-overline font-weight-bold" style="color: #c9ced6; font-size: 0.75rem; letter-spacing: 0.14em">ORDERS</div>
              <div class="card-icon orders-icon">
                <v-icon size="16">mdi-cart</v-icon>
              </div>
            </div>
            <div class="text-h5 font-weight-bold mb-1" style="color: #f3f4f6">{{ summary.totalOrders.toLocaleString() }}</div>
            <div v-if="selectedMonth === null" class="text-body-2" style="color: #d1d5db">{{ cardSubLabel }}</div>
            <div v-else class="d-flex align-center gap-1">
              <v-icon :color="ordersChange.color" size="small">{{ ordersChange.icon }}</v-icon>
              <span :class="`text-caption ${ordersChange.color}--text`" style="font-size: 0.8rem">{{ ordersChange.text }} {{ cardSubLabel }}</span>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <!-- Charts Row 1 -->
    <v-row class="chart-row">
      <!-- Revenue Bar Chart -->
      <v-col cols="12" md="6">
        <v-card elevation="0" class="chart-card pa-6 h-100">
          <v-card-title class="pb-4 text-h6" style="color: #f3f4f6; font-weight: 600">Monthly Revenue</v-card-title>
          <div style="height: 300px">
            <Bar :data="revenueChartData" :options="revenueChartOptions" />
          </div>
        </v-card>
      </v-col>

      <!-- Visitors Line Chart -->
      <v-col cols="12" md="6">
        <v-card elevation="0" class="chart-card pa-6 h-100">
          <v-card-title class="pb-4 text-h6" style="color: #f3f4f6; font-weight: 600">Visitors Over Time</v-card-title>
          <div style="height: 300px">
            <Line :data="visitorsChartData" :options="visitorsChartOptions" />
          </div>
        </v-card>
      </v-col>
    </v-row>

    <!-- Charts Row 2 -->
    <v-row class="chart-row">
      <!-- Conversions Area Chart -->
      <v-col cols="12">
        <v-card elevation="0" class="chart-card pa-6">
          <v-card-title class="pb-4 text-h6" style="color: #f3f4f6; font-weight: 600">Conversion Rate Trend</v-card-title>
          <div style="height: 300px">
            <Line :data="conversionsChartData" :options="conversionsChartOptions" />
          </div>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
.dashboard-wrap {
  max-width: 1320px;
  margin: 0 auto;
  --dashboard-gap: 20px;
}

.summary-row,
.chart-row {
  margin-left: calc(var(--dashboard-gap) * -0.5);
  margin-right: calc(var(--dashboard-gap) * -0.5);
  margin-bottom: 0;
}

.summary-row > .v-col,
.chart-row > .v-col {
  padding: calc(var(--dashboard-gap) * 0.5);
}

.metric-card {
  background-color: rgba(46, 50, 56, 0.92) !important;
  border: 1px solid rgba(107, 114, 128, 0.18);
  border-radius: 12px;
  min-height: 136px;
  transition: all 0.2s ease;
}

.metric-card:hover {
  background-color: rgba(52, 57, 64, 0.95) !important;
  border-color: rgba(107, 114, 128, 0.32);
}

.chart-card {
  background-color: rgba(46, 50, 56, 0.88) !important;
  border: 1px solid rgba(107, 114, 128, 0.2);
  border-radius: 12px;
}

.card-icon {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.revenue-icon {
  color: #a58dff;
  background: rgba(127, 86, 217, 0.18);
  box-shadow: 0 0 14px rgba(127, 86, 217, 0.28);
}

.visitors-icon {
  color: #43d7c4;
  background: rgba(32, 197, 175, 0.14);
  box-shadow: 0 0 14px rgba(32, 197, 175, 0.22);
}

.conversions-icon {
  color: #b792ff;
  background: rgba(139, 92, 246, 0.16);
  box-shadow: 0 0 14px rgba(139, 92, 246, 0.25);
}

.orders-icon {
  color: #ff8e61;
  background: rgba(249, 115, 22, 0.16);
  box-shadow: 0 0 14px rgba(249, 115, 22, 0.25);
}

:deep(.bg-surface-variant) {
  background-color: rgba(255, 255, 255, 0.05) !important;
}

@media (max-width: 960px) {
  .dashboard-wrap {
    max-width: 100%;
  }
}
</style>