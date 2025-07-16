"use client"

import type React from "react"

import Link from "next/link"
import { usePathname } from "next/navigation"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Menu } from "lucide-react"

interface SiteHeaderProps extends React.HTMLAttributes<HTMLElement> {}

const linkStyles = ({ variant }: { variant: "default" | "active" }) =>
  cn(
    buttonVariants({ variant: "ghost" }),
    "font-medium data-[active=true]:bg-muted data-[active=true]:text-muted-foreground",
    variant === "active" && "bg-muted text-muted-foreground",
  )

export function SiteHeader({ className, ...props }: SiteHeaderProps) {
  const pathname = usePathname()

  return (
    <header className={cn("sticky top-0 z-40 w-full border-b bg-background", className)} {...props}>
      <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
        <Link href="/" className="hidden font-bold sm:block">
          Acme
        </Link>
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <nav className="hidden md:flex">
            <Link href="/" className={cn(linkStyles({ variant: pathname === "/" ? "active" : "ghost" }))}>
              Home
            </Link>
            <Link href="/home-1" className={cn(linkStyles({ variant: pathname === "/home-1" ? "active" : "ghost" }))}>
              Home.1
            </Link>
            {/* <Link
              href="/examples/cards"
              className={cn(linkStyles({ variant: pathname?.startsWith('/examples') ? 'active' : 'ghost' }))}
            >
              Examples
            </Link> */}
          </nav>
          <Sheet>
            <SheetTrigger className={cn(buttonVariants({ variant: "ghost" }), "mr-2 p-2 md:hidden")}>
              <Menu className="h-5 w-5" />
              <span className="sr-only">Open menu</span>
            </SheetTrigger>
            <SheetContent side="left" className="w-full sm:max-w-[300px]">
              <SheetHeader>
                <SheetTitle>Menu</SheetTitle>
                <SheetDescription>Navigate through the site.</SheetDescription>
              </SheetHeader>
              <Link href="/" className={cn(linkStyles({ variant: pathname === "/" ? "active" : "ghost" }), "w-full")}>
                Home
              </Link>
              <Link
                href="/home-1"
                className={cn(linkStyles({ variant: pathname === "/home-1" ? "active" : "ghost" }), "w-full")}
              >
                Home.1
              </Link>
              {/* <Link
                href="/examples/cards"
                className={cn(
                  linkStyles({ variant: pathname?.startsWith('/examples') ? 'active' : 'ghost' }),
                  'w-full'
                )}
              >
                Examples
              </Link> */}
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
