"use client"

import type { ReactNode } from "react"
import { cn } from "@/lib/utils"
import { Plus, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

interface CustomizableSectionProps {
  className?: string
  title?: string
  subtitle?: string
  description?: string
  children?: ReactNode
  showPlaceholder?: boolean
  backgroundVariant?: "default" | "muted" | "gradient" | "primary"
}

export function CustomizableSection({
  className,
  title = "Customizable Section",
  subtitle,
  description = "This section is ready for your content. Easily customize or replace with your own components.",
  children,
  showPlaceholder = true,
  backgroundVariant = "default",
}: CustomizableSectionProps) {
  const backgroundClasses = {
    default: "bg-background",
    muted: "bg-muted/50",
    gradient: "bg-gradient-to-br from-background via-muted/30 to-background",
    primary: "bg-primary text-primary-foreground",
  }

  return (
    <section className={cn("py-16 md:py-24 relative overflow-hidden", backgroundClasses[backgroundVariant], className)}>
      {/* Background decoration for gradient variant */}
      {backgroundVariant === "gradient" && (
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-20 left-10 w-32 h-32 rounded-full bg-gradient-to-br from-warmth/20 to-connection/20 blur-3xl animate-connection-flow"></div>
          <div
            className="absolute bottom-20 right-10 w-40 h-40 rounded-full bg-gradient-to-br from-collaboration/20 to-empathy/20 blur-3xl animate-connection-flow"
            style={{ animationDelay: "2s" }}
          ></div>
        </div>
      )}

      <div className="container-emotional relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          {subtitle && (
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
              <Plus className="h-4 w-4" />
              <span>{subtitle}</span>
            </div>
          )}
          <h2 className="text-connection text-3xl md:text-4xl lg:text-5xl font-bold mb-6">{title}</h2>
          {description && (
            <p className="text-empathy text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">{description}</p>
          )}
        </div>

        {/* Content Area */}
        {children ? <div className="space-y-8">{children}</div> : showPlaceholder ? <PlaceholderContent /> : null}
      </div>
    </section>
  )
}

function PlaceholderContent() {
  return (
    <>
      {/* Content Grid */}
      <div className="grid-collaborative">
        {[1, 2, 3].map((index) => (
          <div key={index} className="connection-card p-8 group cursor-pointer">
            <div className="flex items-center justify-between mb-6">
              <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-primary to-collaboration flex items-center justify-center">
                <Plus className="h-6 w-6 text-white" />
              </div>
              <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
            </div>
            <h3 className="text-warmth text-xl font-semibold mb-3">Content Block {index}</h3>
            <p className="text-empathy mb-4">
              This is a placeholder for your content. You can replace this entire section with your own components and
              styling.
            </p>
            <div className="empathy-badge">
              <span>Customizable</span>
            </div>
          </div>
        ))}
      </div>

      {/* Call-to-Action Area */}
      <div className="text-center mt-12 md:mt-16">
        <div className="inline-flex flex-col sm:flex-row gap-4">
          <Button size="lg" className="collaborative-button">
            <span>Primary Action</span>
            <ArrowRight className="h-5 w-5 ml-2" />
          </Button>
          <Button size="lg" variant="outline" className="warmth-glow bg-transparent">
            Secondary Action
          </Button>
        </div>
        <p className="text-intimate text-muted-foreground mt-4">
          Customize these buttons and actions to match your specific needs
        </p>
      </div>
    </>
  )
}

// Export additional utility components for easy customization
export function ContentBlock({
  icon,
  title,
  description,
  badge,
  onClick,
  className,
}: {
  icon?: ReactNode
  title: string
  description: string
  badge?: string
  onClick?: () => void
  className?: string
}) {
  return (
    <div className={cn("connection-card p-8 group cursor-pointer", className)} onClick={onClick}>
      <div className="flex items-center justify-between mb-6">
        <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-primary to-collaboration flex items-center justify-center">
          {icon || <Plus className="h-6 w-6 text-white" />}
        </div>
        <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
      </div>
      <h3 className="text-warmth text-xl font-semibold mb-3">{title}</h3>
      <p className="text-empathy mb-4">{description}</p>
      {badge && (
        <div className="empathy-badge">
          <span>{badge}</span>
        </div>
      )}
    </div>
  )
}
