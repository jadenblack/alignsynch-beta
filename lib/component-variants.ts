import { cva } from "class-variance-authority"

// Button Variants - Emotional & Collaborative
export const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-xl text-sm font-medium ring-offset-background transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "collaborative-button",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80 warmth-glow",
        outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground warmth-glow",
        ghost: "hover:bg-accent hover:text-accent-foreground warmth-glow",
        link: "text-primary underline-offset-4 hover:underline",
        warmth:
          "bg-gradient-to-r from-warmth-400 to-warmth-500 text-warmth-foreground hover:from-warmth-500 hover:to-warmth-600 shadow-warm",
        connection:
          "bg-gradient-to-r from-connection-400 to-connection-500 text-connection-foreground hover:from-connection-500 hover:to-connection-600 shadow-connection",
        celebration: "celebration-burst hover:scale-105 shadow-celebration",
        collaborative:
          "bg-gradient-to-r from-collaboration-400 to-collaboration-500 text-collaboration-foreground hover:from-collaboration-500 hover:to-collaboration-600 animate-warm-pulse",
      },
      size: {
        default: "h-12 px-6 py-3",
        sm: "h-10 rounded-lg px-4",
        lg: "h-14 rounded-2xl px-8 text-base",
        icon: "h-12 w-12",
        intimate: "h-8 rounded-lg px-3 text-xs",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
)

// Card Variants - Connection & Warmth
export const cardVariants = cva(
  "rounded-2xl border bg-card text-card-foreground shadow-gentle transition-all duration-300",
  {
    variants: {
      variant: {
        default: "connection-card",
        flat: "border-border/50 hover:border-border",
        elevated: "shadow-warm hover:shadow-connection",
        interactive: "connection-card hover:scale-[1.02] cursor-pointer",
        collaborative:
          "bg-gradient-to-br from-collaboration/5 via-background to-primary/5 border-collaboration/20 shadow-collaborative",
        empathy: "bg-gradient-to-br from-empathy/10 via-background to-warmth/10 border-empathy/20",
      },
      padding: {
        none: "p-0",
        sm: "p-4",
        md: "p-6",
        lg: "p-8",
        xl: "p-10",
      },
    },
    defaultVariants: {
      variant: "default",
      padding: "md",
    },
  },
)

// Badge Variants - Emotional States
export const badgeVariants = cva(
  "inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ring-1 ring-inset transition-all duration-300",
  {
    variants: {
      variant: {
        default: "bg-primary/10 text-primary ring-primary/20",
        secondary: "bg-secondary text-secondary-foreground ring-secondary/20",
        outline: "text-foreground ring-border",
        destructive: "bg-destructive/10 text-destructive ring-destructive/20",
        warmth: "bg-warmth/20 text-warmth-foreground ring-warmth/30 hover:bg-warmth/30",
        connection: "bg-connection/20 text-connection-foreground ring-connection/30 hover:bg-connection/30",
        growth: "bg-growth/20 text-growth-foreground ring-growth/30 hover:bg-growth/30",
        celebration:
          "bg-celebration/20 text-celebration-foreground ring-celebration/30 hover:bg-celebration/30 animate-gentle-bounce",
        collaboration:
          "bg-collaboration/20 text-collaboration-foreground ring-collaboration/30 hover:bg-collaboration/30",
        empathy: "empathy-badge hover:scale-105",
      },
      size: {
        sm: "px-2 py-0.5 text-xs",
        md: "px-3 py-1 text-sm",
        lg: "px-4 py-1.5 text-base",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  },
)

// Input Variants - Approachable & Accessible
export const inputVariants = cva(
  "flex w-full rounded-xl border border-input bg-background px-4 py-3 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-300",
  {
    variants: {
      variant: {
        default: "warmth-glow hover:border-primary/50 focus-visible:border-primary",
        collaborative: "border-collaboration/30 focus-visible:ring-collaboration focus-visible:border-collaboration",
        empathy: "border-empathy/30 focus-visible:ring-empathy focus-visible:border-empathy",
      },
      size: {
        sm: "h-10 px-3 py-2 text-sm rounded-lg",
        md: "h-12 px-4 py-3 text-sm",
        lg: "h-14 px-6 py-4 text-base rounded-2xl",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  },
)
