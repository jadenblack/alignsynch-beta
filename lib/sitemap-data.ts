/**
 * --------------------------------------------------------------------------
 * AlignSynch · Sitemap & User-Flow Data
 * --------------------------------------------------------------------------
 *  • PageNode  – typed description for every route
 *  • sitePages – complete list of pages consumed by the sitemap,
 *                navigation components, and docs
 *  • userFlows – high-level journeys used by the flow-diagram component
 * --------------------------------------------------------------------------
 */

export interface PageNode {
  id: string
  title: string
  path: string
  description: string
  category: "public" | "auth" | "user" | "session" | "admin"
  wireframe: {
    layout: "landing" | "form" | "dashboard" | "list" | "detail" | "settings"
    components: string[]
    primaryAction?: string
  }
  metrics: {
    avgTimeOnPage: string
    bounceRate: string
    conversionRate?: string
  }
  connections: string[]
  status: "live" | "development" | "planned"
}

/* -------------------------------------------------------------------------- */
/*  Pages                                                                     */
/* -------------------------------------------------------------------------- */

export const sitePages: PageNode[] = [
  {
    id: "home",
    title: "Home",
    path: "/",
    description: "Landing page explaining AlignSynch and its benefits for relationships.",
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
    description: "Browse different areas of a relationship to focus on for alignment sessions.",
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
    description: "Shared dashboard for partners to view their connection status and goals.",
    category: "user",
    wireframe: {
      layout: "dashboard",
      components: ["Header", "Connection Score", "Upcoming Check-in", "Shared Goals", "Footer"],
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
    description: "Interactive dialogue to foster understanding and alignment between partners.",
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
    description: "Summary of alignment session with insights and practical action items.",
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
    connections: ["session-new", "profile", "dashboard"],
    status: "live",
  },
  {
    id: "profile",
    title: "Profile",
    path: "/profile",
    description: "Personal dashboard with session history, achievements, and settings link.",
    category: "user",
    wireframe: {
      layout: "dashboard",
      components: ["Header", "Profile Card", "Stats Grid", "Recent Activity", "Badges"],
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
    description: "Manage account, notifications, and relationship preferences for AlignSynch.",
    category: "user",
    wireframe: {
      layout: "settings",
      components: ["Header", "Settings Tabs", "Profile Form", "Partner Connection", "Preferences"],
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
    description: "User sign-in to access their relationship dashboard.",
    category: "auth",
    wireframe: {
      layout: "form",
      components: ["Header", "Login Form", "Social Auth", "Footer"],
      primaryAction: "Sign In",
    },
    metrics: {
      avgTimeOnPage: "1:15",
      bounceRate: "18%",
      conversionRate: "80%",
    },
    connections: ["home", "signup", "profile"],
    status: "live",
  },
  {
    id: "signup",
    title: "Sign Up",
    path: "/signup",
    description: "Create an account to begin the alignment journey.",
    category: "auth",
    wireframe: {
      layout: "form",
      components: ["Header", "Registration Form", "Partner Invite", "Footer"],
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
]

/* -------------------------------------------------------------------------- */
/*  User Flows                                                                */
/* -------------------------------------------------------------------------- */

export const userFlows = [
  {
    id: "onboarding",
    title: "New Couple On-boarding",
    description: "Journey for first-time users from landing page to first alignment session.",
    steps: ["home", "signup", "focus-areas", "session-new", "session-play", "session-results", "dashboard"],
    conversionRate: "38%",
  },
  {
    id: "weekly-sync",
    title: "Weekly Alignment Session",
    description: "Returning partners completing their regular check-in session.",
    steps: ["dashboard", "session-new", "session-play", "session-results", "dashboard"],
    conversionRate: "82%",
  },
  {
    id: "growth-tracking",
    title: "Growth-Tracking Journey",
    description: "Couple reviewing progress and adding new milestones to their journey.",
    steps: ["dashboard", "session-results", "focus-areas", "session-new", "session-play", "dashboard"],
    conversionRate: "54%",
  },
]
