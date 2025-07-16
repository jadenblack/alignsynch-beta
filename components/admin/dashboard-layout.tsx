"use client"

import type React from "react"

import { useEffect } from "react"
import { useSession } from "next-auth/react"
import { redirect } from "next/navigation"
import { AdminSidebar } from "./sidebar"
import { AdminHeader } from "./header"
import { LoadingSpinner } from "@/components/ui/loading-spinner"
import { ErrorBoundary } from "@/components/ui/error-boundary"
import { useDashboardStore } from "@/lib/store"
import { cn } from "@/lib/utils"

interface DashboardLayoutProps {
  children: React.ReactNode
  title?: string
  breadcrumbs?: Array<{ label: string; href?: string }>
}

export function DashboardLayout({ children, title, breadcrumbs }: DashboardLayoutProps) {
  const { data: session, status } = useSession()
  const { sidebarOpen, sidebarCollapsed, isLoading, setBreadcrumbs } = useDashboardStore()

  // Set breadcrumbs when component mounts
  useEffect(() => {
    if (breadcrumbs) {
      setBreadcrumbs(breadcrumbs)
    }
  }, [breadcrumbs, setBreadcrumbs])

  // Handle authentication
  if (status === "loading") {
    return (
      <div className="flex h-screen items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    )
  }

  if (status === "unauthenticated") {
    redirect("/auth/signin")
  }

  return (
    <ErrorBoundary>
      <div className="flex h-screen overflow-hidden">
        {/* Sidebar */}
        <AdminSidebar />

        {/* Main Content */}
        <div className="flex flex-1 flex-col overflow-hidden">
          <AdminHeader />

          {/* Page Content */}
          <main className={cn("flex-1 overflow-auto bg-muted/30", isLoading && "pointer-events-none opacity-50")}>
            <div className="container mx-auto p-6">
              {title && (
                <div className="mb-6">
                  <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
                </div>
              )}

              {children}
            </div>
          </main>
        </div>

        {/* Loading Overlay */}
        {isLoading && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
            <LoadingSpinner size="lg" />
          </div>
        )}
      </div>
    </ErrorBoundary>
  )
}
