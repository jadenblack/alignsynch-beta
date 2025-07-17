import * as React from "react"
import { cn } from "@/lib/utils"
import { cardVariants } from "@/lib/component-variants"
import type { VariantProps } from "class-variance-authority"

export interface EmotionalCardProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof cardVariants> {
  asChild?: boolean
}

const EmotionalCard = React.forwardRef<HTMLDivElement, EmotionalCardProps>(
  ({ className, variant, padding, asChild = false, ...props }, ref) => {
    return <div ref={ref} className={cn(cardVariants({ variant, padding, className }))} {...props} />
  },
)
EmotionalCard.displayName = "EmotionalCard"

const EmotionalCardHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => <div ref={ref} className={cn("flex flex-col space-y-2", className)} {...props} />,
)
EmotionalCardHeader.displayName = "EmotionalCardHeader"

const EmotionalCardTitle = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h3 ref={ref} className={cn("text-connection font-semibold leading-none tracking-tight", className)} {...props} />
  ),
)
EmotionalCardTitle.displayName = "EmotionalCardTitle"

const EmotionalCardDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => <p ref={ref} className={cn("text-empathy", className)} {...props} />,
)
EmotionalCardDescription.displayName = "EmotionalCardDescription"

const EmotionalCardContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => <div ref={ref} className={cn("pt-0", className)} {...props} />,
)
EmotionalCardContent.displayName = "EmotionalCardContent"

const EmotionalCardFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => <div ref={ref} className={cn("flex items-center pt-4", className)} {...props} />,
)
EmotionalCardFooter.displayName = "EmotionalCardFooter"

export {
  EmotionalCard,
  EmotionalCardHeader,
  EmotionalCardFooter,
  EmotionalCardTitle,
  EmotionalCardDescription,
  EmotionalCardContent,
}
