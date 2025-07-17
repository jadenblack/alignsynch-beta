export const designTokens = {
  // Color System - Emotional & Relationship-Focused
  colors: {
    // Primary Brand Colors
    primary: {
      50: "#f5f3ff",
      100: "#ede9fe",
      200: "#ddd6fe",
      300: "#c4b5fd",
      400: "#a78bfa",
      500: "#8b5cf6", // Main brand color
      600: "#7c3aed",
      700: "#6d28d9",
      800: "#5b21b6",
      900: "#4c1d95",
    },

    // Emotional Palette
    warmth: {
      50: "#fef7ed",
      100: "#feebc8",
      200: "#fbd38d",
      300: "#f6ad55",
      400: "#ed8936",
      500: "#dd6b20",
      600: "#c05621",
      700: "#9c4221",
      800: "#7b341e",
      900: "#652b19",
    },

    connection: {
      50: "#ecfeff",
      100: "#cffafe",
      200: "#a5f3fc",
      300: "#67e8f9",
      400: "#22d3ee",
      500: "#06b6d4",
      600: "#0891b2",
      700: "#0e7490",
      800: "#155e75",
      900: "#164e63",
    },

    growth: {
      50: "#f0fdf4",
      100: "#dcfce7",
      200: "#bbf7d0",
      300: "#86efac",
      400: "#4ade80",
      500: "#22c55e",
      600: "#16a34a",
      700: "#15803d",
      800: "#166534",
      900: "#14532d",
    },

    celebration: {
      50: "#fffbeb",
      100: "#fef3c7",
      200: "#fde68a",
      300: "#fcd34d",
      400: "#fbbf24",
      500: "#f59e0b",
      600: "#d97706",
      700: "#b45309",
      800: "#92400e",
      900: "#78350f",
    },

    collaboration: {
      50: "#faf5ff",
      100: "#f3e8ff",
      200: "#e9d5ff",
      300: "#d8b4fe",
      400: "#c084fc",
      500: "#a855f7",
      600: "#9333ea",
      700: "#7e22ce",
      800: "#6b21a8",
      900: "#581c87",
    },

    empathy: {
      50: "#fdf2f8",
      100: "#fce7f3",
      200: "#fbcfe8",
      300: "#f9a8d4",
      400: "#f472b6",
      500: "#ec4899",
      600: "#db2777",
      700: "#be185d",
      800: "#9d174d",
      900: "#831843",
    },
  },

  // Typography - Emotional & Approachable
  typography: {
    fontFamily: {
      sans: ["Inter", "system-ui", "sans-serif"],
      display: ["Inter Display", "Inter", "system-ui", "sans-serif"],
      mono: ["JetBrains Mono", "Consolas", "monospace"],
    },

    fontSize: {
      hero: ["3.5rem", { lineHeight: "1.1", letterSpacing: "-0.02em" }],
      connection: ["2.25rem", { lineHeight: "1.2", letterSpacing: "-0.01em" }],
      warmth: ["1.5rem", { lineHeight: "1.4" }],
      empathy: ["1rem", { lineHeight: "1.6" }],
      intimate: ["0.875rem", { lineHeight: "1.5" }],
    },

    fontWeight: {
      light: "300",
      normal: "400",
      medium: "500",
      semibold: "600",
      bold: "700",
      extrabold: "800",
    },
  },

  // Spacing - Harmonious & Balanced
  spacing: {
    emotional: {
      xs: "0.5rem", // 8px
      sm: "0.75rem", // 12px
      md: "1rem", // 16px
      lg: "1.5rem", // 24px
      xl: "2rem", // 32px
      "2xl": "3rem", // 48px
      "3xl": "4rem", // 64px
      "4xl": "6rem", // 96px
    },
  },

  // Border Radius - Soft & Approachable
  borderRadius: {
    none: "0",
    sm: "0.25rem",
    md: "0.5rem",
    lg: "0.75rem",
    xl: "1rem",
    "2xl": "1.5rem",
    "3xl": "2rem",
    full: "9999px",
  },

  // Shadows - Gentle & Layered
  boxShadow: {
    gentle: "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
    warm: "0 4px 6px -1px rgba(139, 92, 246, 0.1), 0 2px 4px -1px rgba(139, 92, 246, 0.06)",
    connection: "0 10px 15px -3px rgba(6, 182, 212, 0.1), 0 4px 6px -2px rgba(6, 182, 212, 0.05)",
    celebration: "0 20px 25px -5px rgba(245, 158, 11, 0.1), 0 10px 10px -5px rgba(245, 158, 11, 0.04)",
    collaborative: "0 25px 50px -12px rgba(168, 85, 247, 0.25)",
  },

  // Animation - Gentle & Engaging
  animation: {
    duration: {
      fast: "150ms",
      normal: "300ms",
      slow: "500ms",
      slower: "750ms",
    },

    easing: {
      gentle: "cubic-bezier(0.4, 0, 0.2, 1)",
      warm: "cubic-bezier(0.34, 1.56, 0.64, 1)",
      connection: "cubic-bezier(0.68, -0.55, 0.265, 1.55)",
    },
  },
} as const

export type DesignTokens = typeof designTokens
