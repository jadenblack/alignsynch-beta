"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import {
  LayoutDashboard,
  Users,
  Settings,
  FileText,
  BarChart3,
  Shield,
  Database,
  Mail,
  Bell,
  HelpCircle,
} from "lucide-react"

interface AdminSidebarProps {
  collapsed?: boolean
}

const navigation = [
  {
    title: "Overview",
    items: [
      { name: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
      { name: "Analytics", href: "/admin/analytics", icon: BarChart3 },
    ],
  },
  {
    title: "Management",
    items: [
      { name: "Users", href: "/admin/users", icon: Users },
      { name: "Content", href: "/admin/content", icon: FileText },
      { name: "Settings", href: "/admin/system/settings", icon: Settings },
    ],
  },
  {
    title: "System",
    items: [
      { name: "Database", href: "/admin/database", icon: Database },
      { name: "Security", href: "/admin/security", icon: Shield },
      { name: "Notifications", href: "/admin/notifications", icon: Bell },
      { name: "Email", href: "/admin/email", icon: Mail },
    ],
  },
  {
    title: "Support",
    items: [{ name: "Help", href: "/admin/help", icon: HelpCircle }],
  },
]

export function AdminSidebar({ collapsed = false }: AdminSidebarProps) {
  const pathname = usePathname()

  return (
    <div
      className={cn("flex flex-col border-r bg-background transition-all duration-300", collapsed ? "w-16" : "w-64")}
    >
      <div className="flex h-14 items-center border-b px-4">
        {!collapsed && (
          <Link href="/admin" className="flex items-center gap-2 font-semibold">
            <Shield className="h-6 w-6" />
            <span>Admin Panel</span>
          </Link>
        )}
        {collapsed && <Shield className="h-6 w-6 mx-auto" />}
      </div>

      <ScrollArea className="flex-1 px-3 py-4">
        <div className="space-y-6">
          {navigation.map((section) => (
            <div key={section.title}>
              {!collapsed && (
                <h4 className="mb-2 px-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  {section.title}
                </h4>
              )}
              <div className="space-y-1">
                {section.items.map((item) => {
                  const isActive = pathname === item.href
                  return (
                    <Button
                      key={item.name}
                      variant={isActive ? "secondary" : "ghost"}
                      className={cn(
                        "w-full justify-start gap-2",
                        collapsed && "justify-center px-2",
                        isActive && "bg-secondary",
                      )}
                      asChild
                    >
                      <Link href={item.href}>
                        <item.icon className="h-4 w-4" />
                        {!collapsed && <span>{item.name}</span>}
                      </Link>
                    </Button>
                  )
                })}
              </div>
              {!collapsed && <Separator className="my-4" />}
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  )
}
