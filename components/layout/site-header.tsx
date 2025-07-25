"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useSession, signOut } from "next-auth/react"
import { MenuIcon, LayoutDashboardIcon, UsersIcon, SettingsIcon, LogOutIcon, MapIcon } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { useState } from "react"

export function SiteHeader() {
  const pathname = usePathname()
  const { data: session, status } = useSession()
  const [isSheetOpen, setIsSheetOpen] = useState(false)

  const userRole = (session?.user as any)?.role || "guest"

  const mainNavItems = [
    { href: "/", label: "Home" },
    { href: "/dashboard", label: "Dashboard", requiresAuth: true },
    { href: "/sitemap", label: "Sitemap", icon: <MapIcon className="h-4 w-4 mr-2" /> },
    { href: "/admin/dashboard", label: "Admin", requiresRole: "admin" },
  ]

  const filteredNavItems = mainNavItems.filter((item) => {
    if (item.requiresAuth && status !== "authenticated") return false
    if (item.requiresRole && userRole !== item.requiresRole) return false
    return true
  })

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background">
      <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
        <div className="flex gap-6 md:gap-10">
          <Link href="/" className="flex items-center space-x-2">
            <span className="inline-block font-bold text-lg">AlignSynch Beta</span>
          </Link>
          <nav className="hidden md:flex gap-6">
            {filteredNavItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center text-sm font-medium transition-colors hover:text-primary",
                  pathname === item.href ? "text-primary" : "text-muted-foreground",
                )}
              >
                {item.icon}
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="flex items-center space-x-2">
            {status === "authenticated" ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <Avatar className="h-8 w-8">
                      <AvatarImage
                        src={session.user?.image || "/placeholder-avatar.jpg"}
                        alt={session.user?.name || "User"}
                      />
                      <AvatarFallback>{session.user?.name?.[0] || "U"}</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <div className="flex items-center justify-start gap-2 p-2">
                    <div className="flex flex-col space-y-1 leading-none">
                      {session.user?.name && <p className="font-medium">{session.user.name}</p>}
                      {session.user?.email && (
                        <p className="w-[200px] truncate text-sm text-muted-foreground">{session.user.email}</p>
                      )}
                      {userRole && <p className="text-xs text-muted-foreground">Role: {userRole}</p>}
                    </div>
                  </div>
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard">
                      <LayoutDashboardIcon className="mr-2 h-4 w-4" />
                      Dashboard
                    </Link>
                  </DropdownMenuItem>
                  {userRole === "admin" && (
                    <DropdownMenuItem asChild>
                      <Link href="/admin/dashboard">
                        <UsersIcon className="mr-2 h-4 w-4" />
                        Admin Panel
                      </Link>
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuItem asChild>
                    <Link href="/settings">
                      <SettingsIcon className="mr-2 h-4 w-4" />
                      Settings
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => signOut()}>
                    <LogOutIcon className="mr-2 h-4 w-4" />
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link href="/auth/signin">
                <Button variant="default" size="sm">
                  Sign In
                </Button>
              </Link>
            )}
            <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
              <SheetTrigger asChild className="md:hidden">
                <Button variant="ghost" size="icon">
                  <MenuIcon className="h-6 w-6" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <nav className="flex flex-col gap-4 pt-6">
                  {filteredNavItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={cn(
                        "flex items-center text-lg font-medium transition-colors hover:text-primary",
                        pathname === item.href ? "text-primary" : "text-muted-foreground",
                      )}
                      onClick={() => setIsSheetOpen(false)}
                    >
                      {item.icon}
                      {item.label}
                    </Link>
                  ))}
                  {status === "authenticated" && (
                    <>
                      <Link
                        href="/settings"
                        className="flex items-center text-lg font-medium transition-colors hover:text-primary text-muted-foreground"
                        onClick={() => setIsSheetOpen(false)}
                      >
                        <SettingsIcon className="mr-2 h-4 w-4" />
                        Settings
                      </Link>
                      <Button
                        variant="ghost"
                        className="flex items-center justify-start text-lg font-medium transition-colors hover:text-primary text-muted-foreground p-0"
                        onClick={() => {
                          signOut()
                          setIsSheetOpen(false)
                        }}
                      >
                        <LogOutIcon className="mr-2 h-4 w-4" />
                        Log out
                      </Button>
                    </>
                  )}
                </nav>
              </SheetContent>
            </Sheet>
          </nav>
        </div>
      </div>
    </header>
  )
}
