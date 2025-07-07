export interface GitHubProject {
  id: string
  title: string
  description: string
  repository: string
  branch: string
  pullRequestNumber: number
  status: "pending" | "approved" | "rejected" | "draft" | "merged"
  priority: "low" | "medium" | "high" | "critical"
  type: "content" | "feature" | "bugfix" | "design" | "documentation"
  author: {
    username: string
    avatar: string
    name: string
  }
  assignees: Array<{
    username: string
    avatar: string
    name: string
  }>
  reviewers: Array<{
    username: string
    avatar: string
    name: string
    status: "pending" | "approved" | "rejected" | "commented"
    reviewedAt?: string
    comment?: string
  }>
  createdAt: string
  updatedAt: string
  dueDate?: string
  labels: string[]
  changedFiles: Array<{
    filename: string
    status: "added" | "modified" | "deleted"
    additions: number
    deletions: number
    patch?: string
  }>
  commits: Array<{
    sha: string
    message: string
    author: string
    date: string
  }>
  checks: Array<{
    name: string
    status: "pending" | "success" | "failure" | "cancelled"
    conclusion?: string
    url?: string
  }>
  contentChanges: {
    pageId: string
    pageName: string
    section: string
    oldContent: string
    newContent: string
    changeType: "text" | "image" | "component" | "layout"
  }[]
}

export interface WorkflowStats {
  totalProjects: number
  pendingApprovals: number
  approvedToday: number
  rejectedThisWeek: number
  averageApprovalTime: string
  criticalPending: number
}

// Mock data for the dashboard
export const mockProjects: GitHubProject[] = [
  {
    id: "pr-001",
    title: "Update Quiz Categories Page Content",
    description: "Refresh the programming language descriptions and add new JavaScript frameworks section",
    repository: "alignsynch/website",
    branch: "feature/update-categories",
    pullRequestNumber: 142,
    status: "pending",
    priority: "high",
    type: "content",
    author: {
      username: "sarah-dev",
      avatar: "/placeholder.svg?height=32&width=32",
      name: "Sarah Johnson",
    },
    assignees: [
      {
        username: "alex-lead",
        avatar: "/placeholder.svg?height=32&width=32",
        name: "Alex Chen",
      },
    ],
    reviewers: [
      {
        username: "mike-content",
        avatar: "/placeholder.svg?height=32&width=32",
        name: "Mike Rodriguez",
        status: "approved",
        reviewedAt: "2024-01-15T10:30:00Z",
        comment: "Content looks great! LGTM 👍",
      },
      {
        username: "lisa-design",
        avatar: "/placeholder.svg?height=32&width=32",
        name: "Lisa Wang",
        status: "pending",
      },
    ],
    createdAt: "2024-01-14T09:15:00Z",
    updatedAt: "2024-01-15T10:30:00Z",
    dueDate: "2024-01-18T17:00:00Z",
    labels: ["content", "high-priority", "categories"],
    changedFiles: [
      {
        filename: "app/categories/page.tsx",
        status: "modified",
        additions: 45,
        deletions: 12,
      },
      {
        filename: "lib/category-data.ts",
        status: "modified",
        additions: 23,
        deletions: 5,
      },
    ],
    commits: [
      {
        sha: "abc123",
        message: "Update JavaScript category description",
        author: "sarah-dev",
        date: "2024-01-14T09:15:00Z",
      },
      {
        sha: "def456",
        message: "Add React and Vue.js subcategories",
        author: "sarah-dev",
        date: "2024-01-14T11:20:00Z",
      },
    ],
    checks: [
      {
        name: "Build / build",
        status: "success",
        conclusion: "success",
      },
      {
        name: "Test / unit-tests",
        status: "success",
        conclusion: "success",
      },
      {
        name: "Lint / eslint",
        status: "success",
        conclusion: "success",
      },
    ],
    contentChanges: [
      {
        pageId: "categories",
        pageName: "Categories",
        section: "JavaScript Description",
        oldContent: "JavaScript is a versatile programming language used for web development.",
        newContent:
          "JavaScript is a versatile programming language used for web development, mobile apps, and server-side applications. Popular frameworks include React, Vue.js, and Angular.",
        changeType: "text",
      },
    ],
  },
  {
    id: "pr-002",
    title: "Add Dark Mode Toggle to Settings",
    description: "Implement dark mode toggle functionality in user settings with theme persistence",
    repository: "alignsynch/website",
    branch: "feature/dark-mode-toggle",
    pullRequestNumber: 143,
    status: "approved",
    priority: "medium",
    type: "feature",
    author: {
      username: "tom-frontend",
      avatar: "/placeholder.svg?height=32&width=32",
      name: "Tom Wilson",
    },
    assignees: [
      {
        username: "alex-lead",
        avatar: "/placeholder.svg?height=32&width=32",
        name: "Alex Chen",
      },
    ],
    reviewers: [
      {
        username: "sarah-dev",
        avatar: "/placeholder.svg?height=32&width=32",
        name: "Sarah Johnson",
        status: "approved",
        reviewedAt: "2024-01-15T14:20:00Z",
        comment: "Great implementation! Theme switching works perfectly.",
      },
      {
        username: "lisa-design",
        avatar: "/placeholder.svg?height=32&width=32",
        name: "Lisa Wang",
        status: "approved",
        reviewedAt: "2024-01-15T15:45:00Z",
        comment: "UI looks consistent with our design system.",
      },
    ],
    createdAt: "2024-01-13T16:30:00Z",
    updatedAt: "2024-01-15T15:45:00Z",
    labels: ["feature", "ui", "settings"],
    changedFiles: [
      {
        filename: "app/settings/page.tsx",
        status: "modified",
        additions: 67,
        deletions: 8,
      },
      {
        filename: "components/theme-toggle.tsx",
        status: "added",
        additions: 34,
        deletions: 0,
      },
    ],
    commits: [
      {
        sha: "ghi789",
        message: "Add theme toggle component",
        author: "tom-frontend",
        date: "2024-01-13T16:30:00Z",
      },
      {
        sha: "jkl012",
        message: "Integrate toggle into settings page",
        author: "tom-frontend",
        date: "2024-01-14T10:15:00Z",
      },
    ],
    checks: [
      {
        name: "Build / build",
        status: "success",
        conclusion: "success",
      },
      {
        name: "Test / unit-tests",
        status: "success",
        conclusion: "success",
      },
    ],
    contentChanges: [
      {
        pageId: "settings",
        pageName: "Settings",
        section: "Appearance Tab",
        oldContent: "Theme selection with light/dark/system options",
        newContent: "Enhanced theme selection with toggle switch and preview",
        changeType: "component",
      },
    ],
  },
  {
    id: "pr-003",
    title: "Fix Quiz Timer Bug",
    description: "Resolve issue where quiz timer continues after quiz completion",
    repository: "alignsynch/website",
    branch: "bugfix/quiz-timer",
    pullRequestNumber: 144,
    status: "rejected",
    priority: "critical",
    type: "bugfix",
    author: {
      username: "emma-qa",
      avatar: "/placeholder.svg?height=32&width=32",
      name: "Emma Davis",
    },
    assignees: [
      {
        username: "tom-frontend",
        avatar: "/placeholder.svg?height=32&width=32",
        name: "Tom Wilson",
      },
    ],
    reviewers: [
      {
        username: "alex-lead",
        avatar: "/placeholder.svg?height=32&width=32",
        name: "Alex Chen",
        status: "rejected",
        reviewedAt: "2024-01-15T12:00:00Z",
        comment: "This approach might cause memory leaks. Please use useEffect cleanup function instead.",
      },
    ],
    createdAt: "2024-01-15T08:45:00Z",
    updatedAt: "2024-01-15T12:00:00Z",
    labels: ["bugfix", "critical", "quiz"],
    changedFiles: [
      {
        filename: "app/quiz/play/page.tsx",
        status: "modified",
        additions: 15,
        deletions: 3,
      },
    ],
    commits: [
      {
        sha: "mno345",
        message: "Fix timer cleanup on quiz completion",
        author: "emma-qa",
        date: "2024-01-15T08:45:00Z",
      },
    ],
    checks: [
      {
        name: "Build / build",
        status: "success",
        conclusion: "success",
      },
      {
        name: "Test / unit-tests",
        status: "failure",
        conclusion: "failure",
      },
    ],
    contentChanges: [],
  },
  {
    id: "pr-004",
    title: "Update Homepage Hero Section",
    description: "Refresh hero content with new messaging and improved CTA buttons",
    repository: "alignsynch/website",
    branch: "content/homepage-hero",
    pullRequestNumber: 145,
    status: "draft",
    priority: "low",
    type: "content",
    author: {
      username: "marketing-team",
      avatar: "/placeholder.svg?height=32&width=32",
      name: "Marketing Team",
    },
    assignees: [],
    reviewers: [],
    createdAt: "2024-01-15T16:20:00Z",
    updatedAt: "2024-01-15T16:20:00Z",
    labels: ["content", "homepage", "draft"],
    changedFiles: [
      {
        filename: "app/page.tsx",
        status: "modified",
        additions: 28,
        deletions: 15,
      },
    ],
    commits: [
      {
        sha: "pqr678",
        message: "Draft: Update hero messaging",
        author: "marketing-team",
        date: "2024-01-15T16:20:00Z",
      },
    ],
    checks: [
      {
        name: "Build / build",
        status: "pending",
        conclusion: undefined,
      },
    ],
    contentChanges: [
      {
        pageId: "home",
        pageName: "Homepage",
        section: "Hero Section",
        oldContent: "Master Programming with AI-Powered Quizzes",
        newContent: "Accelerate Your Coding Journey with AI-Powered Learning",
        changeType: "text",
      },
    ],
  },
]

export const workflowStats: WorkflowStats = {
  totalProjects: 24,
  pendingApprovals: 8,
  approvedToday: 3,
  rejectedThisWeek: 2,
  averageApprovalTime: "2.4 days",
  criticalPending: 1,
}
