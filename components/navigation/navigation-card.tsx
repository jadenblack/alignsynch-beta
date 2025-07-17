"use client"

import Link from "next/link"
import { ExternalLink, type LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"

interface NavigationCardProps {
  href: string
  title: string
  description: string
  icon: LucideIcon
  category: string
  isExternal?: boolean
  gradient: string
  hoverColor?: string
  className?: string
}

export function NavigationCard({
  href,
  title,
  description,
  icon: Icon,
  category,
  isExternal = false,
  gradient,
  hoverColor = "primary",
  className,
}: NavigationCardProps) {
  const CardContent = () => (
    <div
      className={cn(
        "bg-card hover:bg-card/80 border border-border/50 rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300 group-hover:scale-[1.02]",
        isExternal ? "hover:border-black/30" : `hover:border-${hoverColor}/30`,
        className,
      )}
    >
      <div className="flex items-center justify-between mb-4">
        <div className={cn("h-10 w-10 rounded-lg flex items-center justify-center", gradient)}>
          <Icon className="h-5 w-5 text-white" />
        </div>
        <div className="flex items-center gap-1">
          <div
            className={cn(
              "text-xs px-2 py-1 rounded-full",
              isExternal
                ? "text-muted-foreground bg-muted"
                : category === "Admin"
                  ? "text-red-600 bg-red-50"
                  : "text-muted-foreground bg-muted",
            )}
          >
            {category}
          </div>
          {isExternal && <ExternalLink className="h-3 w-3 text-muted-foreground" />}
        </div>
      </div>
      <h3
        className={cn(
          "font-semibold text-foreground mb-2 transition-colors",
          isExternal
            ? "group-hover:text-black"
            : category === "Admin"
              ? "group-hover:text-red-600"
              : `group-hover:text-${hoverColor}`,
        )}
      >
        {title}
      </h3>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  )

  if (isExternal) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className="group">
        <CardContent />
      </a>
    )
  }

  return (
    <Link href={href} className="group">
      <CardContent />
    </Link>
  )
}
