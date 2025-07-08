/**
 * --------------------------------------------------------------------------
 * AlignSynch · Mock CI/CD Pipeline Runs
 * --------------------------------------------------------------------------
 * These are consumed by the <PipelineStatus /> component for demos and tests.
 * --------------------------------------------------------------------------
 */

export interface PipelineRun {
  id: string
  status: "success" | "failed" | "running" | "queued"
  branch: string
  commit: string
  author: string
  startTime: string
  duration: string
  logsUrl: string
}

export const mockPipelineRuns: PipelineRun[] = [
  {
    id: "build-1027",
    status: "success",
    branch: "main",
    commit: "2a57c1e",
    author: "alice",
    startTime: "2025-07-07T14:23:00Z",
    duration: "2m 31s",
    logsUrl: "https://example.com/logs/build-1027",
  },
  {
    id: "build-1028",
    status: "failed",
    branch: "main",
    commit: "c4d9b35",
    author: "bob",
    startTime: "2025-07-08T08:02:00Z",
    duration: "1m 45s",
    logsUrl: "https://example.com/logs/build-1028",
  },
  {
    id: "build-1029",
    status: "running",
    branch: "feature/session-export",
    commit: "e7f12ab",
    author: "carol",
    startTime: "2025-07-08T18:10:00Z",
    duration: "—", // still running
    logsUrl: "https://example.com/logs/build-1029",
  },
  {
    id: "build-1030",
    status: "queued",
    branch: "dependabot/npm-updates",
    commit: "1d3f5d0",
    author: "dependabot",
    startTime: "—",
    duration: "—",
    logsUrl: "https://example.com/logs/build-1030",
  },
]
