export interface PageNode {
  id: string
  title: string
  path: string
  description: string
  category: "public" | "auth" | "user" | "quiz" | "admin"
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
    description: "Landing page with hero section, features, and call-to-action",
    category: "public",
    wireframe: {
      layout: "landing",
      components: ["Header", "Hero", "Features Grid", "CTA Section", "Footer"],
      primaryAction: "Start Quiz",
    },
    metrics: {
      avgTimeOnPage: "2:34",
      bounceRate: "45%",
      conversionRate: "12%",
    },
    connections: ["categories", "quiz-new", "login", "signup"],
    status: "live",
  },
  {
    id: "categories",
    title: "Categories",
    path: "/categories",
    description: "Browse programming language categories and quiz topics",
    category: "public",
    wireframe: {
      layout: "list",
      components: ["Header", "Category Grid", "Filter Bar", "Footer"],
      primaryAction: "Select Category",
    },
    metrics: {
      avgTimeOnPage: "1:45",
      bounceRate: "35%",
      conversionRate: "25%",
    },
    connections: ["home", "quiz-new"],
    status: "live",
  },
  {
    id: "leaderboard",
    title: "Leaderboard",
    path: "/leaderboard",
    description: "Global rankings and category champions",
    category: "public",
    wireframe: {
      layout: "dashboard",
      components: ["Header", "Top 3 Cards", "Rankings Table", "Category Leaders", "Footer"],
    },
    metrics: {
      avgTimeOnPage: "3:12",
      bounceRate: "28%",
    },
    connections: ["home", "profile"],
    status: "live",
  },
  {
    id: "login",
    title: "Login",
    path: "/login",
    description: "User authentication and sign-in",
    category: "auth",
    wireframe: {
      layout: "form",
      components: ["Header", "Login Form", "Social Auth", "Footer"],
      primaryAction: "Sign In",
    },
    metrics: {
      avgTimeOnPage: "1:20",
      bounceRate: "15%",
      conversionRate: "78%",
    },
    connections: ["home", "signup", "profile"],
    status: "live",
  },
  {
    id: "signup",
    title: "Sign Up",
    path: "/signup",
    description: "User registration and account creation",
    category: "auth",
    wireframe: {
      layout: "form",
      components: ["Header", "Registration Form", "Terms", "Footer"],
      primaryAction: "Create Account",
    },
    metrics: {
      avgTimeOnPage: "2:15",
      bounceRate: "22%",
      conversionRate: "65%",
    },
    connections: ["home", "login", "profile"],
    status: "live",
  },
  {
    id: "profile",
    title: "Profile",
    path: "/profile",
    description: "User dashboard with stats, history, and achievements",
    category: "user",
    wireframe: {
      layout: "dashboard",
      components: ["Header", "Profile Card", "Stats Grid", "Recent Activity", "Achievements"],
      primaryAction: "Start New Quiz",
    },
    metrics: {
      avgTimeOnPage: "4:30",
      bounceRate: "18%",
    },
    connections: ["settings", "quiz-new", "home"],
    status: "live",
  },
  {
    id: "settings",
    title: "Settings",
    path: "/settings",
    description: "User preferences, theme customization, and account settings",
    category: "user",
    wireframe: {
      layout: "settings",
      components: ["Header", "Settings Tabs", "Profile Form", "Theme Picker", "Preferences"],
      primaryAction: "Save Settings",
    },
    metrics: {
      avgTimeOnPage: "3:45",
      bounceRate: "12%",
    },
    connections: ["profile"],
    status: "live",
  },
  {
    id: "quiz-new",
    title: "New Quiz",
    path: "/quiz/new",
    description: "Quiz configuration and setup",
    category: "quiz",
    wireframe: {
      layout: "form",
      components: ["Header", "Category Selector", "Difficulty Options", "Settings Panel"],
      primaryAction: "Start Quiz",
    },
    metrics: {
      avgTimeOnPage: "1:55",
      bounceRate: "8%",
      conversionRate: "85%",
    },
    connections: ["quiz-play", "categories"],
    status: "live",
  },
  {
    id: "quiz-play",
    title: "Quiz Play",
    path: "/quiz/play",
    description: "Interactive quiz gameplay with questions and timer",
    category: "quiz",
    wireframe: {
      layout: "detail",
      components: ["Header", "Progress Bar", "Question Card", "Answer Options", "Timer"],
      primaryAction: "Submit Answer",
    },
    metrics: {
      avgTimeOnPage: "8:20",
      bounceRate: "5%",
      conversionRate: "92%",
    },
    connections: ["quiz-results"],
    status: "live",
  },
  {
    id: "quiz-results",
    title: "Quiz Results",
    path: "/quiz/results",
    description: "Quiz completion summary with score and analysis",
    category: "quiz",
    wireframe: {
      layout: "detail",
      components: ["Header", "Score Card", "Performance Chart", "Recommendations"],
      primaryAction: "Take Another Quiz",
    },
    metrics: {
      avgTimeOnPage: "2:45",
      bounceRate: "25%",
      conversionRate: "45%",
    },
    connections: ["quiz-new", "profile", "leaderboard"],
    status: "live",
  },
  {
    id: "design-system",
    title: "Design System",
    path: "/design-system",
    description: "Component library and design documentation",
    category: "admin",
    wireframe: {
      layout: "dashboard",
      components: ["Header", "Component Grid", "Color Palette", "Typography", "Building Blocks"],
    },
    metrics: {
      avgTimeOnPage: "6:15",
      bounceRate: "20%",
    },
    connections: ["home"],
    status: "live",
  },
]

export const userFlows = [
  {
    id: "new-user-onboarding",
    title: "New User Onboarding",
    description: "First-time user journey from landing to first quiz",
    steps: ["home", "signup", "categories", "quiz-new", "quiz-play", "quiz-results", "profile"],
    conversionRate: "35%",
  },
  {
    id: "returning-user",
    title: "Returning User",
    description: "Existing user taking a quiz",
    steps: ["home", "login", "profile", "quiz-new", "quiz-play", "quiz-results"],
    conversionRate: "78%",
  },
  {
    id: "competitive-user",
    title: "Competitive User",
    description: "User focused on leaderboard rankings",
    steps: ["home", "leaderboard", "login", "quiz-new", "quiz-play", "quiz-results", "leaderboard"],
    conversionRate: "65%",
  },
]
