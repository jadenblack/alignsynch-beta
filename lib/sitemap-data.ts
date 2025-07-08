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
    id: "our-journey",
    title: "Our Journey",
    path: "/our-journey",
    description: "A timeline of a couple's shared milestones and growth.",
    category: "user",
    wireframe: {
      layout: "dashboard",
      components: ["Header", "Timeline", "Milestone Cards", "Growth Chart", "Footer"],
    },
    metrics: {
      avgTimeOnPage: "3:20",
      bounceRate: "25%",
    },
    connections: ["home", "profile"],
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
    description: "User registration to start their alignment journey.",
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
    connections: ["home", "login", "profile"],
    status: "live",
  },
  {
    id: "profile",
    title: "Profile",
    path: "/profile",
    description: "Personal dashboard with session history and achievements.",
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
    connections: ["settings", "session-new", "home", "dashboard"],
    status: "live",
  },
  {
    id: "dashboard",
    title: "Relationship Dashboard",
    path: "/dashboard",
    description: "A shared dashboard for a couple to view their connection status.",
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
    id: "settings",
    title: "Settings",
    path: "/settings",
    description: "Manage account, notifications, and relationship preferences.",
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
    description: "Interactive dialogue to foster understanding and alignment.",
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
    description: "Summary of alignment session with insights and action items.",
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
    connections: ["session-new", "profile", "our-journey"],
    status: "live",
  },
]

/* ------------------------------------------------------------------ */
/*  User-journey flows for AlignSynch                                 */
/* ------------------------------------------------------------------ */
export const userFlows = [
  {
    id: "new-user-onboarding",
    title: "New User Onboarding",
    description: "First-time couple journey from landing page to first alignment session.",
    steps: ["home", "signup", "focus-areas", "session-new", "session-play", "session-results", "dashboard"],
    conversionRate: "38%",
  },
  {
    id: "returning-user",
    title: "Returning User Quick Session",
    description: "Existing couple jumping straight into a new alignment session.",
    steps: ["home", "login", "dashboard", "session-new", "session-play", "session-results"],
    conversionRate: "82%",
  },
  {
    id: "growth-tracking",
    title: "Growth-Tracking Journey",
    description: "Couple reviewing progress and adding new milestones.",
    steps: ["dashboard", "our-journey", "session-new", "session-play", "session-results", "dashboard"],
    conversionRate: "54%",
  },
]
