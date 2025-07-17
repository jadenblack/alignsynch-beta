import type * as React from "react"
import type { VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"
import { badgeVariants } from "@/lib/component-variants"

export interface EmpathyBadgeProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof badgeVariants> {}

function EmpathyBadge({ className, variant, size, ...props }: EmpathyBadgeProps) {
  return <div className={cn(badgeVariants({ variant, size }), className)} {...props} />
}

export { EmpathyBadge }
