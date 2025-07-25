"use client"

import Link from "next/link"
import { Package2, Menu, MapIcon as SitemapIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useSession, signOut } from "next-auth/react"
import Image from "next/image"
import { hasPermission } from "@/lib/auth"

export function SiteHeader() {
  const { data: session, status } = useSession()
  const isAuthenticated = status === "authenticated"
  const userRole = session?.user?.role || "user" // Default to 'user' if no role

  return (
    <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
      <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
        <Link href="/" className="flex items-center gap-2 text-lg font-semibold md:text-base">
          <Image src="/logo.png" alt="AlignSynch Beta Logo" width={24} height={24} className="dark:invert" />
          <span className="sr-only">AlignSynch Beta</span>
        </Link>
        <Link href="/dashboard" className="text-muted-foreground transition-colors hover:text-foreground">
          Dashboard
        </Link>
        <Link href="/quiz/new" className="text-muted-foreground transition-colors hover:text-foreground">
          New Quiz
        </Link>
        <Link href="/leaderboard" className="text-muted-foreground transition-colors hover:text-foreground">
          Leaderboard
        </Link>
        <Link href="/design-system" className="text-muted-foreground transition-colors hover:text-foreground">
          Design System
        </Link>
        <Link href="/sitemap" className="text-muted-foreground transition-colors hover:text-foreground">
          <SitemapIcon className="h-5 w-5" />
        </Link>
        {isAuthenticated && hasPermission(userRole, "access_admin_panel") && (
          <Link href="/admin" className="text-muted-foreground transition-colors hover:text-foreground">
            Admin
          </Link>
        )}
      </nav>
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="shrink-0 md:hidden bg-transparent">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left">
          <nav className="grid gap-6 text-lg font-medium">
            <Link href="/" className="flex items-center gap-2 text-lg font-semibold">
              <Package2 className="h-6 w-6" />
              <span className="sr-only">AlignSynch Beta</span>
            </Link>
            <Link href="/dashboard" className="hover:text-foreground">
              Dashboard
            </Link>
            <Link href="/quiz/new" className="hover:text-foreground">
              New Quiz
            </Link>
            <Link href="/leaderboard" className="hover:text-foreground">
              Leaderboard
            </Link>
            <Link href="/design-system" className="hover:text-foreground">
              Design System
            </Link>
            <Link href="/sitemap" className="hover:text-foreground">
              Sitemap
            </Link>
            {isAuthenticated && hasPermission(userRole, "access_admin_panel") && (
              <Link href="/admin" className="hover:text-foreground">
                Admin
              </Link>
            )}
          </nav>
        </SheetContent>
      </Sheet>
      <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
        <div className="ml-auto flex-1 sm:flex-initial">{/* Search or other elements can go here */}</div>
        {isAuthenticated ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="secondary" size="icon" className="rounded-full">
                <Image
                  src={session.user?.image || "/placeholder.svg?height=32&width=32&query=user+avatar"}
                  width={32}
                  height={32}
                  alt="Avatar"
                  className="rounded-full"
                />
                <span className="sr-only">Toggle user menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>{session.user?.name || session.user?.email}</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Link href="/settings">Settings</Link>
              </DropdownMenuItem>
              <DropdownMenuItem>Support</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => signOut()}>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <Link href="/auth/signin">
            <Button variant="default">Sign In</Button>
          </Link>
        )}
      </div>
    </header>
  )
}
