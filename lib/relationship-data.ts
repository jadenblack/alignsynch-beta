export interface RelationshipData {
  partner: {
    name: string
    avatar: string
  }
  connectionScore: number
  alignmentHistory: {
    date: string
    score: number
    focusArea: string
  }[]
  upcomingCheckIn?: {
    date: string
    focusArea: string
  }
  sharedGoals: {
    title: string
    status: "in-progress" | "completed"
    targetDate: string
  }[]
  strengths: string[]
  growthAreas: string[]
}

export const mockRelationshipData: RelationshipData = {
  partner: {
    name: "Jordan",
    avatar: "/placeholder.svg?height=48&width=48",
  },
  connectionScore: 88,
  alignmentHistory: [
    { date: "2024-07-01", score: 92, focusArea: "Communication" },
    { date: "2024-06-24", score: 85, focusArea: "Future Goals" },
    { date: "2024-06-17", score: 89, focusArea: "Finances" },
    { date: "2024-06-10", score: 82, focusArea: "Communication" },
  ],
  upcomingCheckIn: {
    date: "2024-07-08",
    focusArea: "Shared Values",
  },
  sharedGoals: [
    { title: "Plan a vacation", status: "in-progress", targetDate: "2024-09-01" },
    { title: "Start a weekly date night", status: "completed", targetDate: "2024-05-01" },
    { title: "Save for a house down payment", status: "in-progress", targetDate: "2025-12-31" },
  ],
  strengths: ["Mutual Respect", "Shared Humor", "Supportive Partnership"],
  growthAreas: ["Financial Planning", "Making Time for Connection"],
}

export const mockUserAccount = {
  name: "Alex",
  email: "alex@alignsynch.com",
  joinDate: "Jan 2023",
  sessionsCompleted: 28,
  averageAlignment: 86,
  badges: ["Communication Pro", "Goal Setter", "Consistent Connection", "Empathy Expert"],
  recentSessions: [
    { id: "1", category: "Communication", score: 92, total: 100, date: "2024-07-01" },
    { id: "2", category: "Future Goals", score: 85, total: 100, date: "2024-06-24" },
    { id: "3", category: "Finances", score: 89, total: 100, date: "2024-06-17" },
  ],
  categoryPerformance: [
    { category: "Communication", score: 91 },
    { category: "Finances", score: 88 },
    { category: "Future Goals", score: 85 },
    { category: "Shared Values", score: 82 },
    { category: "Intimacy", score: 80 },
  ],
}
