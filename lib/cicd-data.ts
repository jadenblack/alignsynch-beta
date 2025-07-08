/**
 * CICD mock data used by `/cicd/page.tsx`.
 * Every object includes the fields referenced in that page
 * (commitMessage, author.name, version, status, stages, …)
 */

export type PipelineStatus = "success" | "failed" | "running" | "queued"

export interface PipelineStage {
  id: string
  name: string
  status: PipelineStatus
  startedAt: string
  finishedAt?: string
  isLive: boolean
  logs: string[]
}

export interface PipelineRun {
  /** Unique build / workflow id */
  id: string
  /** Typically the first line of the git commit */
  commitMessage: string
  /** Short SHA or build number */
  version: string
  /** Commit / build author */
  author: {
    name: string
    avatarUrl: string
  }
  /** Overall pipeline status */
  status: PipelineStatus
  /** ISO timestamp when the pipeline started */
  createdAt: string
  /** Duration in seconds (helpful for UI sparklines) */
  duration: number
  /** List of stages / jobs in this pipeline */
  stages: PipelineStage[]
}

/**
 * A small but realistic-looking in-memory dataset.
 * Feel free to expand or replace with real API data later.
 */
export const mockPipelineRuns: PipelineRun[] = [
  {
    id: "build_240708_001",
    commitMessage: "feat: initial AlignSynch onboarding flow",
    version: "a1b2c3d",
    author: {
      name: "Riley Summers",
      avatarUrl: "/placeholder.svg?height=64&width=64",
    },
    status: "success",
    createdAt: "2025-07-08T17:02:00Z",
    duration: 178,
    stages: [
      {
        id: "install",
        name: "Install",
        status: "success",
        startedAt: "2025-07-08T17:02:00Z",
        finishedAt: "2025-07-08T17:03:05Z",
        isLive: false,
        logs: ["Installing dependencies…", "PNPM install completed (45 s)"],
      },
      {
        id: "build",
        name: "Build",
        status: "success",
        startedAt: "2025-07-08T17:03:05Z",
        finishedAt: "2025-07-08T17:04:58Z",
        isLive: false,
        logs: ["Running `pnpm run build`…", "Next.js compiled successfully"],
      },
      {
        id: "unit-tests",
        name: "Unit Tests",
        status: "success",
        startedAt: "2025-07-08T17:04:58Z",
        finishedAt: "2025-07-08T17:05:58Z",
        isLive: false,
        logs: ["jest — passed 132 tests"],
      },
    ],
  },
  {
    id: "build_240708_002",
    commitMessage: "chore: bump shadcn/ui & add EmpathyBadge",
    version: "d4e5f6g",
    author: {
      name: "Jordan Blake",
      avatarUrl: "/placeholder.svg?height=64&width=64",
    },
    status: "running",
    createdAt: "2025-07-08T18:01:15Z",
    duration: 62,
    stages: [
      {
        id: "install",
        name: "Install",
        status: "success",
        startedAt: "2025-07-08T18:01:15Z",
        finishedAt: "2025-07-08T18:01:50Z",
        isLive: false,
        logs: ["Installing dependencies…"],
      },
      {
        id: "build",
        name: "Build",
        status: "running",
        startedAt: "2025-07-08T18:01:50Z",
        isLive: true,
        logs: ["Running `pnpm run build`…", "Compiling …"],
      },
    ],
  },
  {
    id: "build_240707_017",
    commitMessage: "fix: resolve ThreadDetail N+1 query 🔧",
    version: "h7i8j9k",
    author: {
      name: "Cass Kim",
      avatarUrl: "/placeholder.svg?height=64&width=64",
    },
    status: "failed",
    createdAt: "2025-07-07T22:40:22Z",
    duration: 95,
    stages: [
      {
        id: "install",
        name: "Install",
        status: "success",
        startedAt: "2025-07-07T22:40:22Z",
        finishedAt: "2025-07-07T22:41:07Z",
        isLive: false,
        logs: ["Installing dependencies…"],
      },
      {
        id: "build",
        name: "Build",
        status: "failed",
        startedAt: "2025-07-07T22:41:07Z",
        finishedAt: "2025-07-07T22:42:57Z",
        isLive: false,
        logs: [
          "Running `pnpm run build`…",
          "⛔ error — src/components/relationship-progress.tsx:42:17 — undefined is not iterable",
        ],
      },
    ],
  },
]
