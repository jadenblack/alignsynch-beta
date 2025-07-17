import type { ReactNode } from "react"

export interface ComponentDoc {
  name: string
  description: string
  category: "layout" | "form" | "feedback" | "navigation" | "data-display" | "overlay"
  props: PropDoc[]
  examples: ExampleDoc[]
  designTokens: string[]
  dependencies: string[]
  code: string
  preview: ReactNode
}

export interface PropDoc {
  name: string
  type: string
  required: boolean
  default?: string
  description: string
  options?: string[]
}

export interface ExampleDoc {
  name: string
  description: string
  code: string
  preview: ReactNode
}

// Auto-generate component documentation
export function generateComponentDocs(componentPath: string): ComponentDoc {
  // This would parse the component file and extract:
  // - Props from TypeScript interfaces
  // - JSDoc comments for descriptions
  // - Default values
  // - Usage examples from stories or examples folder

  return {
    name: "Button",
    description: "A versatile button component with multiple variants and sizes",
    category: "form",
    props: [
      {
        name: "variant",
        type: "'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link'",
        required: false,
        default: "default",
        description: "The visual style variant of the button",
        options: ["default", "destructive", "outline", "secondary", "ghost", "link"],
      },
      {
        name: "size",
        type: "'default' | 'sm' | 'lg' | 'icon'",
        required: false,
        default: "default",
        description: "The size of the button",
        options: ["default", "sm", "lg", "icon"],
      },
    ],
    examples: [],
    designTokens: ["--color-primary", "--color-primary-foreground"],
    dependencies: ["@radix-ui/react-slot", "class-variance-authority"],
    code: "",
    preview: null,
  }
}
