"use client"

import type React from "react"

import Link from "next/link"
import { usePathname } from "next/navigation"

import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"

interface SiteHeaderProps extends React.HTMLAttributes<HTMLElement> {}

export function SiteHeader({ className, ...props }: SiteHeaderProps) {
  const pathname = usePathname()

  const baseLink =
    "font-medium transition-colors hover:text-foreground/80 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:opacity-50 data-[active]:text-foreground"
  const activeLink = "text-foreground"

  return (
    <header className={cn("container z-50 bg-background py-2", className)} {...props}>
      <div className="flex items-center justify-between">
        <Link href="/" className="mr-4 flex items-center space-x-2">
          {/* <Icons.logo className="h-6 w-6" /> */}
          <span className="hidden font-bold sm:inline-block">{siteConfig.name}</span>
        </Link>
        <nav className="flex items-center space-x-6">
          <Link href="/" className={cn(baseLink, pathname === "/" && activeLink)}>
            Home
          </Link>
          <Link href="/home-1" className={cn(baseLink, pathname === "/home-1" && activeLink)}>
            Home.1
          </Link>
        </nav>
      </div>
    </header>
  )
}
