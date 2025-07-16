"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useSession } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { useDashboardStore } from "@/lib/store"
import { hasPermission } from "@/lib/auth"
import { cn } from "@/lib/utils"
import {
  LayoutDashboard,
  Users,
  FileText,
  Settings,
  BarChart3,
  Shield,
  Bell,
  ChevronLeft,
  ChevronRight,
  Folder,
  Database,
  Globe,
  Zap,
} from "lucide-react"

// Menu item interface
interface MenuItem {
  id: string
  label: string
  icon: React.ComponentType<{ className?: string }>
  href: string
  permission?: string
  badge?: string
  children?: MenuItem[]
}

// Define menu structure with role-based access
const menuItems: MenuItem[] = [
  {
    id: "dashboard",
    label: "Dashboard",
    icon: LayoutDashboard,
    href: "/admin/dashboard",
  },
  {
    id: "users",
    label: "User Management",
    icon: Users,
    href: "/admin/users",
    permission: "users.read",
    badge: "12",
    children: [
      {
        id: "users-list",
        label: "All Users",
        icon: Users,
        href: "/admin/users",
        permission: "users.read",
      },
      {
        id: "users-roles",
        label: "Roles & Permissions",
        icon: Shield,
        href: "/admin/users/roles",
        permission: "users.write",
      },
    ],
  },
  {
    id: "content",
    label: "Content Management",
    icon: FileText,
    href: "/admin/content",
    permission: "content.read",
    children: [
      {
        id: "content-posts",
        label: "Posts",
        icon: FileText,
        href: "/admin/content/posts",
        permission: "content.read",
      },
      {
        id: "content-media",
        label: "Media Library",
        icon: Folder,
        href: "/admin/content/media",
        permission: "content.read",
      },
    ],
  },
  {
    id: "analytics",
    label: "Analytics",
    icon: BarChart3,
    href: "/admin/analytics",
    permission: "analytics.read",
    children: [
      {
        id: "analytics-overview",
        label: "Overview",
        icon: BarChart3,
        href: "/admin/analytics",
        permission: "analytics.read",
      },
      {
        id: "analytics-reports",
        label: "Reports",
        icon: Database,
        href: "/admin/analytics/reports",
        permission: "reports.read",
      },
    ],
  },
  {
    id: "system",
    label: "System",
    icon: Settings,
    href: "/admin/system",
    permission: "settings.read",
    children: [
      {
        id: "system-settings",
        label: "Settings",
        icon: Settings,
        href: "/admin/system/settings",
        permission: "settings.read",
      },
      {
        id: "system-notifications",
        label: "Notifications",
        icon: Bell,
        href: "/admin/system/notifications",
        permission: "settings.read",
      },
      {
        id: "system-integrations",
        label: "Integrations",
        icon: Zap,
        href: "/admin/system/integrations",
        permission: "settings.write",
      },
    ],
  },
]

export function AdminSidebar() {
  const { data: session } = useSession()
  const pathname = usePathname()
  const { sidebarOpen, sidebarCollapsed, toggleSidebar, setSidebarCollapsed } = useDashboardStore()
  const [expandedItems, setExpandedItems] = useState<string[]>(["users", "content"])

  // Filter menu items based on user permissions
  const filterMenuItems = (items: MenuItem[]): MenuItem[] => {
    if (!session?.user?.permissions) return []

    return items.filter((item) => {
      if (item.permission && !hasPermission(session.user.permissions, item.permission)) {
        return false
      }

      if (item.children) {
        item.children = filterMenuItems(item.children)
      }

      return true
    })
  }

  const filteredMenuItems = filterMenuItems(menuItems)

  const toggleExpanded = (itemId: string) => {
    setExpandedItems((prev) => (prev.includes(itemId) ? prev.filter((id) => id !== itemId) : [...prev, itemId]))
  }

  const renderMenuItem = (item: MenuItem, level = 0) => {
    const isActive = pathname === item.href
    const isExpanded = expandedItems.includes(item.id)
    const hasChildren = item.children && item.children.length > 0

    return (
      <div key={item.id} className="space-y-1">
        <div className="flex items-center">
          <Link
            href={item.href}
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors flex-1",
              level > 0 && "ml-4 pl-6",
              isActive
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
              sidebarCollapsed && level === 0 && "justify-center px-2",
            )}
          >
            <item.icon className={cn("h-4 w-4", sidebarCollapsed && level === 0 && "h-5 w-5")} />
            {(!sidebarCollapsed || level > 0) && (
              <>
                <span className="flex-1">{item.label}</span>
                {item.badge && (
                  <Badge variant="secondary" className="ml-auto">
                    {item.badge}
                  </Badge>
                )}
              </>
            )}
          </Link>

          {hasChildren && !sidebarCollapsed && (
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={() => toggleExpanded(item.id)}>
              {isExpanded ? <ChevronLeft className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
            </Button>
          )}
        </div>

        {hasChildren && isExpanded && !sidebarCollapsed && (
          <div className="space-y-1">{item.children!.map((child) => renderMenuItem(child, level + 1))}</div>
        )}
      </div>
    )
  }

  if (!sidebarOpen) return null

  return (
    <div
      className={cn(
        "flex h-full flex-col border-r bg-card transition-all duration-300",
        sidebarCollapsed ? "w-16" : "w-64",
      )}
    >
      {/* Sidebar Header */}
      <div className="flex h-14 items-center justify-between border-b px-4">
        {!sidebarCollapsed && (
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
              <Globe className="h-4 w-4 text-primary-foreground" />
            </div>
            <span className="font-semibold">Admin Panel</span>
          </div>
        )}

        <Button
          variant="ghost"
          size="sm"
          className="h-8 w-8 p-0"
          onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
        >
          {sidebarCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </Button>
      </div>

      {/* Navigation Menu */}
      <ScrollArea className="flex-1 px-3 py-4">
        <div className="space-y-2">
          {/* Main Navigation */}
          <div className="space-y-1">
            {!sidebarCollapsed && (
              <h4 className="px-3 py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Main</h4>
            )}
            {filteredMenuItems.slice(0, 2).map((item) => renderMenuItem(item))}
          </div>

          <Separator className="my-4" />

          {/* Management Section */}
          <div className="space-y-1">
            {!sidebarCollapsed && (
              <h4 className="px-3 py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Management
              </h4>
            )}
            {filteredMenuItems.slice(2, 4).map((item) => renderMenuItem(item))}
          </div>

          <Separator className="my-4" />

          {/* System Section */}
          <div className="space-y-1">
            {!sidebarCollapsed && (
              <h4 className="px-3 py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">System</h4>
            )}
            {filteredMenuItems.slice(4).map((item) => renderMenuItem(item))}
          </div>
        </div>
      </ScrollArea>

      {/* User Info */}
      {!sidebarCollapsed && session?.user && (
        <div className="border-t p-4">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
              <span className="text-sm font-medium text-primary">{session.user.name?.charAt(0).toUpperCase()}</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{session.user.name}</p>
              <p className="text-xs text-muted-foreground capitalize">{session.user.role}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
