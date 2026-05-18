import { computed, ref } from 'vue'
import metricsData from '../data/metrics.json'

export interface MetricRow {
  month: string
  monthNumber: number
  revenue: number
  visitors: number
  conversions: number
  orders: number
}

export function useDashboard() {
  const selectedMonth = ref<number | null>(null) // null = "All"
  const metrics = ref<MetricRow[]>(metricsData)

  const filteredData = computed(() => {
    if (selectedMonth.value === null) {
      return metrics.value
    }
    return metrics.value.filter((m) => m.monthNumber === selectedMonth.value)
  })

  const summary = computed(() => {
    if (selectedMonth.value === null) {
      // Yearly totals/averages
      return {
        totalRevenue: metrics.value.reduce((sum, m) => sum + m.revenue, 0),
        avgVisitors: Math.round(metrics.value.reduce((sum, m) => sum + m.visitors, 0) / metrics.value.length),
        avgConversions: parseFloat((metrics.value.reduce((sum, m) => sum + m.conversions, 0) / metrics.value.length).toFixed(2)),
        totalOrders: metrics.value.reduce((sum, m) => sum + m.orders, 0),
        previousMonthData: null,
      }
    } else {
      // Single month data
      const currentMonth = metrics.value.find((m) => m.monthNumber === selectedMonth.value)
      const previousMonth = metrics.value.find((m) => m.monthNumber === selectedMonth.value! - 1)

      return {
        totalRevenue: currentMonth?.revenue ?? 0,
        avgVisitors: currentMonth?.visitors ?? 0,
        avgConversions: currentMonth?.conversions ?? 0,
        totalOrders: currentMonth?.orders ?? 0,
        previousMonthData: previousMonth ?? null,
      }
    }
  })

  const changeFromPrevious = computed(() => {
    const current = summary.value
    const prev = current.previousMonthData

    if (!prev) return { revenue: 0, visitors: 0, conversions: 0, orders: 0 }

    return {
      revenue: (((current.totalRevenue - prev.revenue) / prev.revenue) * 100).toFixed(1),
      visitors: (((current.avgVisitors - prev.visitors) / prev.visitors) * 100).toFixed(1),
      conversions: ((current.avgConversions - prev.conversions).toFixed(2)),
      orders: (((current.totalOrders - prev.orders) / prev.orders) * 100).toFixed(1),
    }
  })

  const setSelectedMonth = (month: number | null) => {
    selectedMonth.value = month
  }

  return {
    metrics,
    filteredData,
    summary,
    selectedMonth,
    setSelectedMonth,
    changeFromPrevious,
  }
}
