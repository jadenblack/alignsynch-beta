/* ------------------------------------------------------------------
 * AlignSynch · Sitemap & User-Flow Data
 * ------------------------------------------------------------------ */

export type Category = "public" | "auth" | "user" | "session" | "admin" | "quiz"

/** Description for a single app route */
export interface PageNode {
  id: string
  title: string
  path: string
  description: string
  category: Category
  wireframe: {
    layout: "landing" | "form" | "dashboard" | "list" | "detail" | "settings"
    components: string[]
    primaryAction?: string
  }
  metrics: {
    /** e.g. `"2:34"` */
    avgTimeOnPage: string
    /** e.g. `"45%"` */
    bounceRate: string
    /** e.g. `"12%"` – optional for non-conversion pages */
    conversionRate?: string
  }
  /** ids of connected pages (navigation / flows) */
  connections: string[]
  /** current lifecycle status */
  status: "live" | "development" | "planned"
}

/* ------------------------------------------------------------------ */
/*  Master list of pages used by the Sitemap & Flow-Diagram           */
/* ------------------------------------------------------------------ */

export const sitePages: PageNode[] = [
  {
    id: "home",
    title: "Home",
    path: "/",
    description: "Landing page explaining AlignSynch and its benefits.",
    category: "public",
    wireframe: {
      layout: "landing",
      components: ["Header", "Hero", "Features Grid", "Testimonials", "Footer"],
      primaryAction: "Start Alignment Session",
    },
    metrics: {
      avgTimeOnPage: "2:40",
      bounceRate: "42%",
      conversionRate: "15%",
    },
    connections: ["focus-areas", "session-new", "login", "signup"],
    status: "live",
  },
  {
    id: "focus-areas",
    title: "Focus Areas",
    path: "/focus-areas",
    description: "Different areas of a relationship to focus on.",
    category: "public",
    wireframe: {
      layout: "list",
      components: ["Header", "Area Grid", "Filter Bar", "Footer"],
      primaryAction: "Select Focus Area",
    },
    metrics: {
      avgTimeOnPage: "1:50",
      bounceRate: "33%",
      conversionRate: "28%",
    },
    connections: ["home", "session-new"],
    status: "live",
  },
  {
    id: "dashboard",
    title: "Relationship Dashboard",
    path: "/dashboard",
    description: "Shared dashboard for partners to view their connection status.",
    category: "user",
    wireframe: {
      layout: "dashboard",
      components: ["Header", "Connection Score", "Upcoming Check-in", "Shared Goals"],
    },
    metrics: {
      avgTimeOnPage: "5:10",
      bounceRate: "15%",
    },
    connections: ["profile", "session-new"],
    status: "live",
  },
  {
    id: "session-new",
    title: "New Session",
    path: "/session/new",
    description: "Configure and start a new alignment session.",
    category: "session",
    wireframe: {
      layout: "form",
      components: ["Header", "Focus Area Selector", "Session Settings", "Partner Invite"],
      primaryAction: "Start Session",
    },
    metrics: {
      avgTimeOnPage: "1:50",
      bounceRate: "9%",
      conversionRate: "88%",
    },
    connections: ["session-play", "focus-areas"],
    status: "live",
  },
  {
    id: "session-play",
    title: "Alignment Session",
    path: "/session/play",
    description: "Interactive dialogue fostering understanding and alignment.",
    category: "session",
    wireframe: {
      layout: "detail",
      components: ["Header", "Progress Bar", "Question Card", "Response Options", "Timer"],
      primaryAction: "Submit Response",
    },
    metrics: {
      avgTimeOnPage: "9:30",
      bounceRate: "6%",
      conversionRate: "95%",
    },
    connections: ["session-results"],
    status: "live",
  },
  {
    id: "session-results",
    title: "Session Results",
    path: "/session/results",
    description: "Summary of alignment session with insights and actions.",
    category: "session",
    wireframe: {
      layout: "detail",
      components: ["Header", "Alignment Score", "Insights", "Action Items"],
      primaryAction: "Start Another Session",
    },
    metrics: {
      avgTimeOnPage: "2:50",
      bounceRate: "22%",
      conversionRate: "48%",
    },
    connections: ["session-new", "dashboard"],
    status: "live",
  },
  {
    id: "profile",
    title: "Profile",
    path: "/profile",
    description: "Personal dashboard with history and achievements.",
    category: "user",
    wireframe: {
      layout: "dashboard",
      components: ["Header", "Profile Card", "Stats Grid", "Recent Activity"],
      primaryAction: "Start New Session",
    },
    metrics: {
      avgTimeOnPage: "4:35",
      bounceRate: "16%",
    },
    connections: ["settings", "session-new"],
    status: "live",
  },
  {
    id: "settings",
    title: "Settings",
    path: "/settings",
    description: "Manage account, notifications, and preferences.",
    category: "user",
    wireframe: {
      layout: "settings",
      components: ["Header", "Settings Tabs", "Preferences"],
      primaryAction: "Save Settings",
    },
    metrics: {
      avgTimeOnPage: "3:40",
      bounceRate: "11%",
    },
    connections: ["profile"],
    status: "live",
  },
  {
    id: "login",
    title: "Login",
    path: "/login",
    description: "Sign in to access your relationship dashboard.",
    category: "auth",
    wireframe: {
      layout: "form",
      components: ["Header", "Login Form", "Social Auth"],
      primaryAction: "Sign In",
    },
    metrics: {
      avgTimeOnPage: "1:15",
      bounceRate: "18%",
      conversionRate: "80%",
    },
    connections: ["home", "signup"],
    status: "live",
  },
  {
    id: "signup",
    title: "Sign Up",
    path: "/signup",
    description: "Create an account to begin your alignment journey.",
    category: "auth",
    wireframe: {
      layout: "form",
      components: ["Header", "Registration Form", "Partner Invite"],
      primaryAction: "Create Account",
    },
    metrics: {
      avgTimeOnPage: "2:10",
      bounceRate: "25%",
      conversionRate: "68%",
    },
    connections: ["home", "login"],
    status: "live",
  },
  {
    id: "cicd",
    title: "CI / CD",
    path: "/cicd",
    description: "Internal pipeline status for engineering.",
    category: "admin",
    wireframe: {
      layout: "dashboard",
      components: ["Header", "Pipeline Table", "Run Details"],
    },
    metrics: {
      avgTimeOnPage: "3:05",
      bounceRate: "20%",
    },
    connections: ["dashboard"],
    status: "development",
  },
  {
    id: "design-system",
    title: "Design System",
    path: "/design-system",
    description: "Tokens and reusable components.",
    category: "admin",
    wireframe: {
      layout: "dashboard",
      components: ["Header", "Component Grid", "Docs"],
    },
    metrics: {
      avgTimeOnPage: "6:15",
      bounceRate: "20%",
    },
    connections: ["home"],
    status: "live",
  },
]

/* ------------------------------------------------------------------ */
/*  User-journey flows                                                */
/* ------------------------------------------------------------------ */

export interface UserFlow {
  id: string
  title: string
  description: string
  /** Array of PageNode.ids in order */
  steps: string[]
  /** e.g. `"38%"` */
  conversionRate: string
}

export const userFlows: UserFlow[] = [
  {
    id: "onboarding",
    title: "New Couple On-boarding",
    description: "First-time users from landing page to first session.",
    steps: ["home", "signup", "focus-areas", "session-new", "session-play", "session-results", "dashboard"],
    conversionRate: "38%",
  },
  {
    id: "weekly-sync",
    title: "Weekly Alignment Session",
    description: "Returning partners completing their regular check-in.",
    steps: ["dashboard", "session-new", "session-play", "session-results", "dashboard"],
    conversionRate: "82%",
  },
  {
    id: "growth-tracking",
    title: "Growth Tracking",
    description: "Couple reviewing progress and milestones.",
    steps: ["dashboard", "session-results", "focus-areas", "session-new", "session-play", "dashboard"],
    conversionRate: "54%",
  },
]
