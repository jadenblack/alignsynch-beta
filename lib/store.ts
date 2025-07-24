import { create } from "zustand"
import { persist } from "zustand/middleware"

interface User {
  id: string
  name: string
  email: string
  role: string
  avatar?: string
}

interface Analytics {
  totalUsers: number
  activeUsers: number
  totalRevenue: number
  conversionRate: number
  recentActivity: Array<{
    id: string
    type: string
    message: string
    timestamp: string
    user: string
  }>
}

interface DashboardState {
  sidebarOpen: boolean
  sidebarCollapsed: boolean
  isLoading: boolean
  breadcrumbs: Array<{ label: string; href?: string }>
  analytics: Analytics
  setSidebarOpen: (open: boolean) => void
  setSidebarCollapsed: (collapsed: boolean) => void
  setIsLoading: (loading: boolean) => void
  setBreadcrumbs: (breadcrumbs: Array<{ label: string; href?: string }>) => void
  updateMetrics: (metrics: Partial<Analytics>) => void
}

export const useDashboardStore = create<DashboardState>()(
  persist(
    (set, get) => ({
      sidebarOpen: true,
      sidebarCollapsed: false,
      isLoading: false,
      breadcrumbs: [],
      analytics: {
        totalUsers: 1247,
        activeUsers: 89,
        totalRevenue: 12450,
        conversionRate: 3.2,
        recentActivity: [
          {
            id: "1",
            type: "user_login",
            message: "User logged in successfully",
            timestamp: new Date().toISOString(),
            user: "john.doe@example.com",
          },
          {
            id: "2",
            type: "system_update",
            message: "System backup completed",
            timestamp: new Date(Date.now() - 3600000).toISOString(),
            user: "system",
          },
        ],
      },
      setSidebarOpen: (open) => set({ sidebarOpen: open }),
      setSidebarCollapsed: (collapsed) => set({ sidebarCollapsed: collapsed }),
      setIsLoading: (loading) => set({ isLoading: loading }),
      setBreadcrumbs: (breadcrumbs) => set({ breadcrumbs }),
      updateMetrics: (metrics) =>
        set((state) => ({
          analytics: { ...state.analytics, ...metrics },
        })),
    }),
    {
      name: "dashboard-storage",
      partialize: (state) => ({
        sidebarCollapsed: state.sidebarCollapsed,
        analytics: state.analytics,
      }),
    },
  ),
)

interface AnalyticsStore {
  metrics: Analytics
  updateMetrics: (metrics: Partial<Analytics>) => void
}

export const useAnalyticsStore = create<AnalyticsStore>((set) => ({
  metrics: {
    totalUsers: 1247,
    activeUsers: 89,
    totalRevenue: 12450,
    conversionRate: 3.2,
    recentActivity: [],
  },
  updateMetrics: (metrics) =>
    set((state) => ({
      metrics: { ...state.metrics, ...metrics },
    })),
}))
