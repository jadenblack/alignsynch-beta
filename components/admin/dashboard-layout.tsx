"use client"

import type React from "react"
import { AdminSidebar } from "./sidebar"
import { AdminHeader } from "./header"
import { useDashboardStore } from "@/lib/store"

interface DashboardLayoutProps {
  children: React.ReactNode
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const { sidebarCollapsed, setSidebarCollapsed } = useDashboardStore()

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed)
  }

  return (
    <div className="flex h-screen bg-background">
      <AdminSidebar collapsed={sidebarCollapsed} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <AdminHeader onToggleSidebar={toggleSidebar} />
        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </div>
    </div>
  )
}
