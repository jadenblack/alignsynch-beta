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
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import {
  LayoutDashboard,
  Users,
  Settings,
  BarChart3,
  FileText,
  Shield,
  Database,
  Bell,
  ChevronDown,
  ChevronRight,
  Activity,
  UserCog,
  Globe,
  Lock,
  Palette,
  Zap,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { hasPermission } from "@/lib/auth"

interface SidebarProps {
  collapsed: boolean
}

interface MenuItem {
  title: string
  href?: string
  icon: React.ComponentType<{ className?: string }>
  badge?: string
  permission?: string
  children?: MenuItem[]
}

const menuItems: MenuItem[] = [
  {
    title: "Dashboard",
    href: "/admin/dashboard",
    icon: LayoutDashboard,
    permission: "analytics.read",
  },
  {
    title: "User Management",
    icon: Users,
    permission: "users.read",
    children: [
      {
        title: "All Users",
        href: "/admin/users",
        icon: Users,
        permission: "users.read",
      },
      {
        title: "User Roles",
        href: "/admin/users/roles",
        icon: UserCog,
        permission: "users.write",
      },
      {
        title: "Permissions",
        href: "/admin/users/permissions",
        icon: Shield,
        permission: "users.write",
      },
    ],
  },
  {
    title: "Content",
    icon: FileText,
    permission: "content.read",
    children: [
      {
        title: "Pages",
        href: "/admin/content/pages",
        icon: Globe,
        permission: "content.read",
      },
      {
        title: "Media Library",
        href: "/admin/content/media",
        icon: Database,
        permission: "content.read",
      },
    ],
  },
  {
    title: "Analytics",
    icon: BarChart3,
    permission: "analytics.read",
    children: [
      {
        title: "Overview",
        href: "/admin/analytics",
        icon: Activity,
        permission: "analytics.read",
      },
      {
        title: "Reports",
        href: "/admin/analytics/reports",
        icon: FileText,
        permission: "reports.read",
      },
    ],
  },
  {
    title: "System",
    icon: Settings,
    permission: "settings.read",
    children: [
      {
        title: "General Settings",
        href: "/admin/system/settings",
        icon: Settings,
        permission: "settings.read",
      },
      {
        title: "Security",
        href: "/admin/system/security",
        icon: Lock,
        permission: "settings.write",
      },
      {
        title: "Notifications",
        href: "/admin/system/notifications",
        icon: Bell,
        permission: "settings.read",
      },
      {
        title: "Appearance",
        href: "/admin/system/appearance",
        icon: Palette,
        permission: "settings.write",
      },
      {
        title: "Integrations",
        href: "/admin/system/integrations",
        icon: Zap,
        permission: "settings.write",
      },
    ],
  },
]

export function AdminSidebar({ collapsed }: SidebarProps) {
  const pathname = usePathname()
  const { data: session } = useSession()
  const [openSections, setOpenSections] = useState<string[]>(["User Management", "System"])

  const toggleSection = (title: string) => {
    setOpenSections((prev) => (prev.includes(title) ? prev.filter((item) => item !== title) : [...prev, title]))
  }

  const userPermissions = session?.user?.permissions || []

  const filterMenuItems = (items: MenuItem[]): MenuItem[] => {
    return items.filter((item) => {
      if (item.permission && !hasPermission(userPermissions, item.permission)) {
        return false
      }
      if (item.children) {
        item.children = filterMenuItems(item.children)
        return item.children.length > 0
      }
      return true
    })
  }

  const filteredMenuItems = filterMenuItems(menuItems)

  const renderMenuItem = (item: MenuItem, level = 0) => {
    const isActive = item.href === pathname
    const hasChildren = item.children && item.children.length > 0
    const isOpen = openSections.includes(item.title)

    if (hasChildren) {
      return (
        <Collapsible key={item.title} open={isOpen} onOpenChange={() => toggleSection(item.title)}>
          <CollapsibleTrigger asChild>
            <Button
              variant="ghost"
              className={cn(
                "w-full justify-start gap-2 font-normal",
                level > 0 && "ml-4",
                collapsed && "justify-center px-2",
              )}
            >
              <item.icon className="h-4 w-4 shrink-0" />
              {!collapsed && (
                <>
                  <span className="truncate">{item.title}</span>
                  {item.badge && (
                    <Badge variant="secondary" className="ml-auto text-xs">
                      {item.badge}
                    </Badge>
                  )}
                  {isOpen ? (
                    <ChevronDown className="h-4 w-4 ml-auto shrink-0" />
                  ) : (
                    <ChevronRight className="h-4 w-4 ml-auto shrink-0" />
                  )}
                </>
              )}
            </Button>
          </CollapsibleTrigger>
          {!collapsed && (
            <CollapsibleContent className="space-y-1">
              {item.children?.map((child) => renderMenuItem(child, level + 1))}
            </CollapsibleContent>
          )}
        </Collapsible>
      )
    }

    return (
      <Link key={item.href} href={item.href || "#"}>
        <Button
          variant={isActive ? "secondary" : "ghost"}
          className={cn(
            "w-full justify-start gap-2 font-normal",
            level > 0 && "ml-4",
            collapsed && "justify-center px-2",
            isActive && "bg-secondary",
          )}
        >
          <item.icon className="h-4 w-4 shrink-0" />
          {!collapsed && (
            <>
              <span className="truncate">{item.title}</span>
              {item.badge && (
                <Badge variant="secondary" className="ml-auto text-xs">
                  {item.badge}
                </Badge>
              )}
            </>
          )}
        </Button>
      </Link>
    )
  }

  return (
    <div className={cn("flex flex-col h-full bg-background border-r", collapsed ? "w-16" : "w-64")}>
      <div className="p-4">
        <div className={cn("flex items-center gap-2", collapsed && "justify-center")}>
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <Shield className="h-4 w-4 text-primary-foreground" />
          </div>
          {!collapsed && <span className="font-semibold">Admin Panel</span>}
        </div>
      </div>

      <Separator />

      <ScrollArea className="flex-1 px-3">
        <div className="space-y-1 py-4">{filteredMenuItems.map((item) => renderMenuItem(item))}</div>
      </ScrollArea>

      <Separator />

      <div className="p-4">
        <div className={cn("text-xs text-muted-foreground", collapsed && "text-center")}>
          {!collapsed && (
            <>
              <div>Logged in as</div>
              <div className="font-medium truncate">{session?.user?.name}</div>
              <div className="text-xs opacity-70">{session?.user?.role}</div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
