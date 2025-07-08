import { cva } from "class-variance-authority"

/*
 * This file centralizes variants for custom-styled components,
 * aligning them with the new grey and blue-green theme.
 */

// Variants for the new `FeatureCard` (formerly EmotionalCard)
export const cardVariants = cva("transition-colors", {
  variants: {
    variant: {
      default: "bg-card text-card-foreground border rounded-lg",
      highlight: "bg-card text-card-foreground border-t-4 border-t-primary border rounded-lg",
    },
    padding: {
      default: "p-6",
      compact: "p-4",
      none: "p-0",
    },
  },
  defaultVariants: {
    variant: "default",
    padding: "default",
  },
})

// Variants for the new `PrimaryButton` (formerly CollaborativeButton)
export const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        outline: "border border-input bg-transparent hover:bg-accent hover:text-accent-foreground",
        ghost: "hover:bg-accent hover:text-accent-foreground",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
)

// Variants for the new `StatusBadge` (formerly EmpathyBadge)
export const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "border-transparent bg-secondary text-secondary-foreground",
        primary: "border-transparent bg-primary/10 text-primary",
        destructive: "border-transparent bg-destructive/10 text-destructive",
      },
      size: {
        default: "text-xs",
        sm: "text-[10px]",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
)
