import { create } from "zustand"
import { persist } from "zustand/middleware"

// Dashboard state interface
interface DashboardState {
  // Sidebar state
  sidebarOpen: boolean
  sidebarCollapsed: boolean

  // Theme and preferences
  theme: "light" | "dark"

  // Navigation state
  activeSection: string
  breadcrumbs: Array<{ label: string; href?: string }>

  // Loading states
  isLoading: boolean
  loadingMessage: string

  // Error handling
  error: string | null

  // Actions
  toggleSidebar: () => void
  setSidebarCollapsed: (collapsed: boolean) => void
  setActiveSection: (section: string) => void
  setBreadcrumbs: (breadcrumbs: Array<{ label: string; href?: string }>) => void
  setLoading: (loading: boolean, message?: string) => void
  setError: (error: string | null) => void
  setTheme: (theme: "light" | "dark") => void
}

// Create the dashboard store with persistence
export const useDashboardStore = create<DashboardState>()(
  persist(
    (set, get) => ({
      // Initial state
      sidebarOpen: true,
      sidebarCollapsed: false,
      theme: "light",
      activeSection: "dashboard",
      breadcrumbs: [{ label: "Dashboard" }],
      isLoading: false,
      loadingMessage: "",
      error: null,

      // Actions
      toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),

      setSidebarCollapsed: (collapsed: boolean) => set({ sidebarCollapsed: collapsed }),

      setActiveSection: (section: string) => set({ activeSection: section }),

      setBreadcrumbs: (breadcrumbs: Array<{ label: string; href?: string }>) => set({ breadcrumbs }),

      setLoading: (loading: boolean, message = "") => set({ isLoading: loading, loadingMessage: message }),

      setError: (error: string | null) => set({ error }),

      setTheme: (theme: "light" | "dark") => set({ theme }),
    }),
    {
      name: "dashboard-storage",
      partialize: (state) => ({
        sidebarCollapsed: state.sidebarCollapsed,
        theme: state.theme,
      }),
    },
  ),
)

// Analytics store for dashboard metrics
interface AnalyticsState {
  metrics: {
    totalUsers: number
    activeUsers: number
    totalContent: number
    recentActivity: Array<{
      id: string
      type: string
      message: string
      timestamp: Date
      user: string
    }>
  }

  // Actions
  updateMetrics: (metrics: Partial<AnalyticsState["metrics"]>) => void
  addActivity: (activity: AnalyticsState["metrics"]["recentActivity"][0]) => void
}

export const useAnalyticsStore = create<AnalyticsState>((set, get) => ({
  metrics: {
    totalUsers: 1247,
    activeUsers: 89,
    totalContent: 342,
    recentActivity: [
      {
        id: "1",
        type: "user_login",
        message: "User logged in",
        timestamp: new Date(),
        user: "john.doe@example.com",
      },
      {
        id: "2",
        type: "content_created",
        message: "New content created",
        timestamp: new Date(Date.now() - 1000 * 60 * 30),
        user: "jane.smith@example.com",
      },
    ],
  },

  updateMetrics: (newMetrics) =>
    set((state) => ({
      metrics: { ...state.metrics, ...newMetrics },
    })),

  addActivity: (activity) =>
    set((state) => ({
      metrics: {
        ...state.metrics,
        recentActivity: [activity, ...state.metrics.recentActivity.slice(0, 9)],
      },
    })),
}))
