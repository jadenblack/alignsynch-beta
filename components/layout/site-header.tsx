"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import {
  MenuIcon,
  HomeIcon,
  LayoutDashboardIcon,
  SettingsIcon,
  UserIcon,
  LogInIcon,
  LogOutIcon,
  ShieldIcon,
  MapIcon as SitemapIcon,
} from "lucide-react"
import { useTheme } from "next-themes"
import { useSession, signOut } from "next-auth/react"
import { hasPermission } from "@/lib/auth"
import Image from "next/image"

export default function SiteHeader() {
  const { setTheme } = useTheme()
  const { data: session, status } = useSession()
  const isAuthenticated = status === "authenticated"
  const userRole = session?.user?.role || "user"

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background">
      <div className="container flex h-16 items-center justify-between space-x-4 sm:space-x-0">
        <div className="flex items-center gap-4">
          <Link href="/" className="flex items-center space-x-2">
            <Image src="/logo.png" alt="AlignSynch Beta Logo" width={32} height={32} className="dark:invert" />
            <span className="inline-block font-bold">AlignSynch Beta</span>
          </Link>
          <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
            <Link href="/" className="transition-colors hover:text-primary">
              <HomeIcon className="h-4 w-4 inline-block mr-1" /> Home
            </Link>
            <Link href="/dashboard" className="transition-colors hover:text-primary">
              <LayoutDashboardIcon className="h-4 w-4 inline-block mr-1" /> Dashboard
            </Link>
            <Link href="/settings" className="transition-colors hover:text-primary">
              <SettingsIcon className="h-4 w-4 inline-block mr-1" /> Settings
            </Link>
            <Link href="/sitemap" className="transition-colors hover:text-primary">
              <SitemapIcon className="h-4 w-4 inline-block mr-1" /> Sitemap
            </Link>
            {isAuthenticated && hasPermission(userRole, "view_admin_dashboard") && (
              <Link href="/admin" className="transition-colors hover:text-primary">
                <ShieldIcon className="h-4 w-4 inline-block mr-1" /> Admin
              </Link>
            )}
          </nav>
        </div>
        <div className="flex items-center space-x-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                Theme
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setTheme("light")}>Light</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("dark")}>Dark</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("system")}>System</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {isAuthenticated ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <UserIcon className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <div className="flex items-center justify-start gap-2 p-2">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">{session.user?.name}</p>
                    <p className="text-xs leading-none text-muted-foreground">{session.user?.email}</p>
                    <p className="text-xs leading-none text-muted-foreground">Role: {session.user?.role}</p>
                  </div>
                </div>
                <DropdownMenuItem onClick={() => signOut()}>
                  <LogOutIcon className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button asChild>
              <Link href="/auth/signin">
                <LogInIcon className="mr-2 h-4 w-4" />
                Sign In
              </Link>
            </Button>
          )}

          <Sheet>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <MenuIcon className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <nav className="flex flex-col gap-6 pt-6 text-lg font-medium">
                <Link href="/" className="flex items-center hover:text-primary">
                  <HomeIcon className="h-5 w-5 inline-block mr-2" /> Home
                </Link>
                <Link href="/dashboard" className="flex items-center hover:text-primary">
                  <LayoutDashboardIcon className="h-5 w-5 inline-block mr-2" /> Dashboard
                </Link>
                <Link href="/settings" className="flex items-center hover:text-primary">
                  <SettingsIcon className="h-5 w-5 inline-block mr-2" /> Settings
                </Link>
                <Link href="/sitemap" className="flex items-center hover:text-primary">
                  <SitemapIcon className="h-5 w-5 inline-block mr-2" /> Sitemap
                </Link>
                {isAuthenticated && hasPermission(userRole, "view_admin_dashboard") && (
                  <Link href="/admin" className="flex items-center hover:text-primary">
                    <ShieldIcon className="h-5 w-5 inline-block mr-2" /> Admin
                  </Link>
                )}
                {!isAuthenticated && (
                  <Link href="/auth/signin" className="flex items-center hover:text-primary">
                    <LogInIcon className="h-5 w-5 inline-block mr-2" /> Sign In
                  </Link>
                )}
                {isAuthenticated && (
                  <Button variant="ghost" onClick={() => signOut()} className="justify-start pl-0">
                    <LogOutIcon className="h-5 w-5 inline-block mr-2" /> Log Out
                  </Button>
                )}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
