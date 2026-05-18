import type { InjectionKey } from 'vue'
import type { useDashboard } from './useDashboard'

export type DashboardStore = ReturnType<typeof useDashboard>

export const dashboardKey: InjectionKey<DashboardStore> = Symbol('dashboard')
