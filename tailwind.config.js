/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    "*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: { "2xl": "1400px" },
    },
    extend: {
      /* -------------------------------------------------------------------- */
      /*  Brand & Emotional Palette                                           */
      /* -------------------------------------------------------------------- */
      colors: {
        /* Soft gradient helpers */
        "primary-soft": "hsl(var(--primary-soft))",
        "accent-soft": "hsl(var(--accent-soft))",

        /* Emotional hues */
        warmth: "hsl(var(--warmth))",
        "warmth-foreground": "hsl(var(--warmth-foreground))",
        connection: "hsl(var(--connection))",
        "connection-foreground": "hsl(var(--connection-foreground))",
        growth: "hsl(var(--growth))",
        "growth-foreground": "hsl(var(--growth-foreground))",
        celebration: "hsl(var(--celebration))",
        "celebration-foreground": "hsl(var(--celebration-foreground))",
        collaboration: "hsl(var(--collaboration))",
        "collaboration-foreground": "hsl(var(--collaboration-foreground))",
        empathy: "hsl(var(--empathy))",
        "empathy-foreground": "hsl(var(--empathy-foreground))",

        /* Base palette from earlier config */
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },

      /* -------------------------------------------------------------------- */
      /*  Misc.                                                               */
      /* -------------------------------------------------------------------- */
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
