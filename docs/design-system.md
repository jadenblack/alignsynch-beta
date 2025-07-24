# AlignSynch Design System

## Color Palette

### Primary Colors
\`\`\`css
/* Blue-Green Theme */
--primary: hsl(180, 100%, 25%);        /* #008080 - Main brand color */
--primary-foreground: hsl(0, 0%, 100%); /* #FFFFFF - Text on primary */

/* Subtle Grey Theme */
--background: hsl(210, 20%, 98%);       /* #F8F9FA - Main background */
--foreground: hsl(210, 10%, 23%);       /* #3A3F47 - Main text */
\`\`\`

### Secondary Colors
\`\`\`css
--secondary: hsl(210, 20%, 95%);        /* #F1F3F4 - Secondary background */
--secondary-foreground: hsl(210, 10%, 30%); /* #4A5058 - Secondary text */

--muted: hsl(210, 20%, 92%);            /* #E8EAED - Muted background */
--muted-foreground: hsl(210, 10%, 45%); /* #6C757D - Muted text */
\`\`\`

### Accent Colors
\`\`\`css
--accent: hsl(180, 80%, 30%);           /* #0D9488 - Accent elements */
--accent-foreground: hsl(0, 0%, 100%);  /* #FFFFFF - Text on accent */
\`\`\`

### Status Colors
\`\`\`css
--success: hsl(142, 76%, 36%);          /* #16A34A - Success states */
--warning: hsl(38, 92%, 50%);           /* #F59E0B - Warning states */
--error: hsl(0, 84%, 60%);              /* #EF4444 - Error states */
--info: hsl(199, 89%, 48%);             /* #0EA5E9 - Info states */
\`\`\`

### Border and Divider Colors
\`\`\`css
--border: hsl(210, 20%, 90%);           /* #E2E5E8 - Default borders */
--input: hsl(210, 20%, 88%);            /* #DDE1E4 - Input borders */
--ring: hsl(180, 100%, 25%);            /* #008080 - Focus rings */
\`\`\`

## Typography

### Font Families
\`\`\`css
--font-sans: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
--font-mono: 'JetBrains Mono', 'Fira Code', Consolas, monospace;
\`\`\`

### Font Sizes
\`\`\`css
--text-xs: 0.75rem;     /* 12px */
--text-sm: 0.875rem;    /* 14px */
--text-base: 1rem;      /* 16px */
--text-lg: 1.125rem;    /* 18px */
--text-xl: 1.25rem;     /* 20px */
--text-2xl: 1.5rem;     /* 24px */
--text-3xl: 1.875rem;   /* 30px */
--text-4xl: 2.25rem;    /* 36px */
\`\`\`

### Font Weights
\`\`\`css
--font-light: 300;
--font-normal: 400;
--font-medium: 500;
--font-semibold: 600;
--font-bold: 700;
\`\`\`

### Line Heights
\`\`\`css
--leading-tight: 1.25;
--leading-normal: 1.5;
--leading-relaxed: 1.625;
\`\`\`

## Spacing System

### Base Unit: 4px
\`\`\`css
--spacing-1: 0.25rem;   /* 4px */
--spacing-2: 0.5rem;    /* 8px */
--spacing-3: 0.75rem;   /* 12px */
--spacing-4: 1rem;      /* 16px */
--spacing-5: 1.25rem;   /* 20px */
--spacing-6: 1.5rem;    /* 24px */
--spacing-8: 2rem;      /* 32px */
--spacing-10: 2.5rem;   /* 40px */
--spacing-12: 3rem;     /* 48px */
--spacing-16: 4rem;     /* 64px */
--spacing-20: 5rem;     /* 80px */
\`\`\`

## Component Specifications

### Buttons
\`\`\`css
/* Primary Button */
.btn-primary {
  background: var(--primary);
  color: var(--primary-foreground);
  padding: var(--spacing-3) var(--spacing-6);
  border-radius: 0.375rem; /* 6px */
  font-weight: var(--font-medium);
  font-size: var(--text-sm);
}

/* Secondary Button */
.btn-secondary {
  background: var(--secondary);
  color: var(--secondary-foreground);
  border: 1px solid var(--border);
  padding: var(--spacing-3) var(--spacing-6);
  border-radius: 0.375rem;
}
\`\`\`

### Cards
\`\`\`css
.card {
  background: var(--background);
  border: 1px solid var(--border);
  border-radius: 0.5rem; /* 8px */
  padding: var(--spacing-6);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.card-header {
  margin-bottom: var(--spacing-4);
  padding-bottom: var(--spacing-4);
  border-bottom: 1px solid var(--border);
}
\`\`\`

### Form Elements
\`\`\`css
.input {
  background: var(--background);
  border: 1px solid var(--input);
  border-radius: 0.375rem;
  padding: var(--spacing-3) var(--spacing-4);
  font-size: var(--text-sm);
  color: var(--foreground);
}

.input:focus {
  outline: none;
  border-color: var(--ring);
  box-shadow: 0 0 0 2px rgba(0, 128, 128, 0.2);
}
\`\`\`

## Layout Grid

### Container Sizes
\`\`\`css
--container-sm: 640px;
--container-md: 768px;
--container-lg: 1024px;
--container-xl: 1280px;
--container-2xl: 1536px;
\`\`\`

### Grid System
- 12-column grid system
- Responsive breakpoints at 640px, 768px, 1024px, 1280px
- Gutter width: 24px (var(--spacing-6))

## Shadows and Effects

### Box Shadows
\`\`\`css
--shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.05);
--shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
--shadow-md: 0 4px 6px rgba(0, 0, 0, 0.1);
--shadow-lg: 0 10px 15px rgba(0, 0, 0, 0.1);
--shadow-xl: 0 20px 25px rgba(0, 0, 0, 0.1);
\`\`\`

### Border Radius
\`\`\`css
--radius-sm: 0.125rem;  /* 2px */
--radius: 0.25rem;      /* 4px */
--radius-md: 0.375rem;  /* 6px */
--radius-lg: 0.5rem;    /* 8px */
--radius-xl: 0.75rem;   /* 12px */
--radius-full: 9999px;  /* Full circle */
\`\`\`

## Responsive Behavior

### Breakpoints
\`\`\`css
/* Mobile First Approach */
@media (min-width: 640px) { /* sm */ }
@media (min-width: 768px) { /* md */ }
@media (min-width: 1024px) { /* lg */ }
@media (min-width: 1280px) { /* xl */ }
@media (min-width: 1536px) { /* 2xl */ }
\`\`\`

### Component Responsive Rules
- Navigation collapses to hamburger menu below 768px
- Cards stack vertically on mobile
- Text sizes scale down on smaller screens
- Padding reduces on mobile devices

## Accessibility Standards

### Color Contrast
- Text on background: 4.5:1 minimum ratio
- Large text: 3:1 minimum ratio
- Interactive elements: 3:1 minimum ratio

### Focus States
- All interactive elements have visible focus indicators
- Focus ring color: var(--ring)
- Focus ring width: 2px
- Focus ring offset: 2px

### Typography Accessibility
- Minimum font size: 14px (var(--text-sm))
- Maximum line length: 75 characters
- Sufficient line height: 1.5 minimum

## Usage Guidelines

### Color Usage
- Use primary color for main actions and branding
- Use secondary colors for supporting elements
- Reserve accent colors for highlights and emphasis
- Use status colors consistently for feedback

### Typography Hierarchy
1. Page titles: text-3xl, font-bold
2. Section headings: text-2xl, font-semibold
3. Subsection headings: text-xl, font-medium
4. Body text: text-base, font-normal
5. Small text: text-sm, font-normal

### Spacing Consistency
- Use multiples of 4px for all spacing
- Maintain consistent padding within component types
- Use larger spacing between unrelated sections
- Keep consistent margins for similar elements

## Design Tokens Integration

All design tokens are available in:
- CSS custom properties (shown above)
- Tailwind CSS classes
- JavaScript/TypeScript constants
- Figma design tokens (if using Figma integration)

## Component Library Integration

This design system integrates with:
- shadcn/ui components
- Custom AlignSynch components
- Radix UI primitives
- Tailwind CSS utilities

For specific component documentation, see `docs/components.md`.
