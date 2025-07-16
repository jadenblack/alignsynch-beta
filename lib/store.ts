import { create } from "zustand"
import { persist } from "zustand/middleware"

interface DashboardState {
  sidebarCollapsed: boolean
  setSidebarCollapsed: (collapsed: boolean) => void

  // Analytics data
  analytics: {
    totalUsers: number
    activeUsers: number
    totalRevenue: number
    conversionRate: number
  }
  setAnalytics: (analytics: DashboardState["analytics"]) => void

  // User preferences
  preferences: {
    theme: "light" | "dark" | "system"
    notifications: boolean
    autoSave: boolean
  }
  setPreferences: (preferences: Partial<DashboardState["preferences"]>) => void
}

export const useDashboardStore = create<DashboardState>()(
  persist(
    (set) => ({
      sidebarCollapsed: false,
      setSidebarCollapsed: (collapsed) => set({ sidebarCollapsed: collapsed }),

      analytics: {
        totalUsers: 1234,
        activeUsers: 892,
        totalRevenue: 45678,
        conversionRate: 12.5,
      },
      setAnalytics: (analytics) => set({ analytics }),

      preferences: {
        theme: "system",
        notifications: true,
        autoSave: true,
      },
      setPreferences: (newPreferences) =>
        set((state) => ({
          preferences: { ...state.preferences, ...newPreferences },
        })),
    }),
    {
      name: "dashboard-storage",
      partialize: (state) => ({
        sidebarCollapsed: state.sidebarCollapsed,
        preferences: state.preferences,
      }),
    },
  ),
)
