import * as React from "react"
import { cn } from "@/lib/utils"

export interface RelationshipProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: number
  max?: number
  variant?: "default" | "warmth" | "connection" | "growth" | "celebration"
  showLabel?: boolean
  label?: string
}

const RelationshipProgress = React.forwardRef<HTMLDivElement, RelationshipProgressProps>(
  ({ className, value = 0, max = 100, variant = "default", showLabel = false, label, ...props }, ref) => {
    const percentage = Math.min(Math.max((value / max) * 100, 0), 100)

    const variantClasses = {
      default: "from-primary via-accent to-celebration",
      warmth: "from-warmth-400 via-warmth-500 to-warmth-600",
      connection: "from-connection-400 via-connection-500 to-connection-600",
      growth: "from-growth-400 via-growth-500 to-growth-600",
      celebration: "from-celebration-400 via-celebration-500 to-celebration-600",
    }

    return (
      <div ref={ref} className={cn("space-y-2", className)} {...props}>
        {showLabel && (
          <div className="flex justify-between items-center">
            <span className="text-intimate font-medium">{label}</span>
            <span className="text-intimate text-muted-foreground">
              {value}/{max}
            </span>
          </div>
        )}
        <div className="emotional-progress">
          <div
            className={cn(
              "absolute inset-y-0 left-0 rounded-full transition-all duration-500 bg-gradient-to-r",
              variantClasses[variant],
            )}
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>
    )
  },
)
RelationshipProgress.displayName = "RelationshipProgress"

export { RelationshipProgress }
