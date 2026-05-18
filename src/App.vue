<script setup lang="ts">
import { provide } from 'vue'
import { useDashboard } from './composables/useDashboard'
import { dashboardKey } from './composables/dashboardContext'

const dashboard = useDashboard()
const { metrics, selectedMonth, setSelectedMonth } = dashboard

// Provide the dashboard instance to all child components
provide(dashboardKey, dashboard)

const handleMonthChange = (value: number | string | null) => {
  if (value === null) {
    setSelectedMonth(null)
    return
  }

  setSelectedMonth(Number(value))
}

const monthOptions = [
  { title: 'All Months', value: null },
  ...metrics.value.map((m) => ({ title: m.month, value: m.monthNumber })),
]
</script>

<template>
  <v-app style="background: #0b0e13; color: #f3f4f6">
    <v-app-bar color="#171a20" elevation="0" border="b thin rgba(107, 114, 128, 0.25)">
      <v-app-bar-title>Analytics Dashboard</v-app-bar-title>

      <v-spacer />

      <v-select
        :model-value="selectedMonth"
        :items="monthOptions"
        item-title="title"
        item-value="value"
        @update:model-value="handleMonthChange"
        label="Select Month"
        variant="outlined"
        density="compact"
        class="month-select"
        style="width: 200px"
      />
    </v-app-bar>

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<style scoped>
.month-select {
  margin-right: 16px;
}
</style>
