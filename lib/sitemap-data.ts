/**
 * Central sitemap + user-flow data for documentation pages.
 * Exported names are consumed in multiple parts of the app.
 */

/* ---------- Site-wide static pages ---------- */
export const sitePages: { path: string; title: string; description: string }[] = [
  { path: "/", title: "Home", description: "AlignSynch landing experience" },
  { path: "/dashboard", title: "Dashboard", description: "Relationship health overview" },
  { path: "/focus-areas", title: "Focus Areas", description: "Sessions grouped by topic" },
  { path: "/profile", title: "Profile", description: "Personal preferences, avatar & details" },
  { path: "/cicd", title: "CI / CD", description: "Internal pipeline status (dev-only)" },
  { path: "/design-system", title: "Design System", description: "Tokens and reusable components" },
]

/* ---------- Key user flows (for flow-diagram component) ---------- */
export interface FlowNode {
  id: string
  label: string
  pagePath: string
}

export interface UserFlow {
  id: string
  name: string
  nodes: FlowNode[]
}

export const userFlows: UserFlow[] = [
  {
    id: "onboarding",
    name: "New-User Onboarding",
    nodes: [
      { id: "welcome", label: "Welcome", pagePath: "/" },
      { id: "questionnaire", label: "Initial Questionnaire", pagePath: "/focus-areas" },
      { id: "dashboard", label: "First Dashboard View", pagePath: "/dashboard" },
    ],
  },
  {
    id: "weekly-session",
    name: "Weekly Alignment Session",
    nodes: [
      { id: "dash", label: "Dashboard", pagePath: "/dashboard" },
      { id: "select-topic", label: "Pick Focus Area", pagePath: "/focus-areas" },
      { id: "session", label: "Run Session", pagePath: "/focus-areas" },
      { id: "reflection", label: "Reflection & Notes", pagePath: "/profile" },
    ],
  },
]
