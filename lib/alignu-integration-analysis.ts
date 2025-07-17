export interface AlignUToken {
  name: string
  value: string
  type: "color" | "typography" | "spacing" | "shadow" | "border"
  category: string
  description?: string
  figmaId?: string
}

export interface AlignUComponent {
  name: string
  category: string
  props: Record<string, any>
  variants: string[]
  figmaNodeId?: string
  dependencies: string[]
}

export interface CompatibilityAssessment {
  tokenCompatibility: number // 0-100%
  componentCompatibility: number // 0-100%
  designSystemAlignment: number // 0-100%
  integrationComplexity: "low" | "medium" | "high"
  recommendedApproach: string
}

// Mock AlignU! token set analysis
export const alignUTokens: AlignUToken[] = [
  // Color Tokens
  {
    name: "primary-500",
    value: "#6366f1",
    type: "color",
    category: "semantic",
    description: "Primary brand color",
    figmaId: "S:color-primary-500",
  },
  {
    name: "primary-600",
    value: "#4f46e5",
    type: "color",
    category: "semantic",
    description: "Primary brand color - darker",
    figmaId: "S:color-primary-600",
  },
  {
    name: "neutral-50",
    value: "#f9fafb",
    type: "color",
    category: "neutral",
    description: "Lightest neutral color",
    figmaId: "S:color-neutral-50",
  },
  {
    name: "neutral-900",
    value: "#111827",
    type: "color",
    category: "neutral",
    description: "Darkest neutral color",
    figmaId: "S:color-neutral-900",
  },

  // Typography Tokens
  {
    name: "text-xs",
    value: "12px",
    type: "typography",
    category: "size",
    description: "Extra small text size",
    figmaId: "S:text-xs",
  },
  {
    name: "text-sm",
    value: "14px",
    type: "typography",
    category: "size",
    description: "Small text size",
    figmaId: "S:text-sm",
  },
  {
    name: "text-base",
    value: "16px",
    type: "typography",
    category: "size",
    description: "Base text size",
    figmaId: "S:text-base",
  },

  // Spacing Tokens
  {
    name: "space-1",
    value: "4px",
    type: "spacing",
    category: "scale",
    description: "Smallest spacing unit",
    figmaId: "S:space-1",
  },
  {
    name: "space-4",
    value: "16px",
    type: "spacing",
    category: "scale",
    description: "Base spacing unit",
    figmaId: "S:space-4",
  },

  // Shadow Tokens
  {
    name: "shadow-sm",
    value: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
    type: "shadow",
    category: "elevation",
    description: "Small shadow",
    figmaId: "S:shadow-sm",
  },
  {
    name: "shadow-md",
    value: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
    type: "shadow",
    category: "elevation",
    description: "Medium shadow",
    figmaId: "S:shadow-md",
  },
]

// Current AlignSynch tokens for comparison
export const alignSynchTokens: AlignUToken[] = [
  {
    name: "primary",
    value: "#6e3ff3", // 263 70% 50%
    type: "color",
    category: "semantic",
    description: "AlignSynch primary brand color",
  },
  {
    name: "accent",
    value: "#7dd3fc", // 191 97% 77%
    type: "color",
    category: "semantic",
    description: "AlignSynch accent color",
  },
  {
    name: "neutral-900",
    value: "#0a0d14",
    type: "color",
    category: "neutral",
    description: "Darkest neutral",
  },
]

// Compatibility analysis
export const compatibilityAnalysis: CompatibilityAssessment = {
  tokenCompatibility: 75,
  componentCompatibility: 60,
  designSystemAlignment: 70,
  integrationComplexity: "medium",
  recommendedApproach: "selective-integration",
}

// Integration challenges
export const integrationChallenges = [
  {
    category: "Color System",
    challenge: "AlignU! uses Indigo-based primary colors vs AlignSynch purple theme",
    impact: "high",
    solution: "Map AlignU! semantic tokens to AlignSynch brand colors",
  },
  {
    category: "Typography",
    challenge: "Different font families and scale systems",
    impact: "medium",
    solution: "Adapt typography tokens while maintaining AlignSynch hierarchy",
  },
  {
    category: "Component Architecture",
    challenge: "AlignU! components may not match existing shadcn/ui structure",
    impact: "medium",
    solution: "Create adapter layer for component compatibility",
  },
  {
    category: "Figma Integration",
    challenge: "Figma tokens require Figma API access and token synchronization",
    impact: "low",
    solution: "Use Figma REST API or plugins for token extraction",
  },
]

// Recommended integration strategy
export const integrationStrategy = {
  phase1: {
    name: "Token Analysis & Mapping",
    duration: "1-2 weeks",
    tasks: [
      "Extract AlignU! design tokens",
      "Map compatible tokens to AlignSynch system",
      "Identify conflicts and required modifications",
      "Create token transformation utilities",
    ],
  },
  phase2: {
    name: "Selective Component Integration",
    duration: "2-3 weeks",
    tasks: [
      "Evaluate AlignU! components for compatibility",
      "Adapt high-value components to AlignSynch design",
      "Create component adapters and wrappers",
      "Update existing components with AlignU! patterns",
    ],
  },
  phase3: {
    name: "Design System Harmonization",
    duration: "1-2 weeks",
    tasks: [
      "Integrate Figma design system",
      "Synchronize tokens between code and design",
      "Update documentation and guidelines",
      "Validate design consistency across all components",
    ],
  },
}
