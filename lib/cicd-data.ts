/* ------------------------------------------------------------------
 * AlignSynch · Mock CI/CD Pipeline Runs
 * ------------------------------------------------------------------
 *  These records back the /cicd page in development environments.
 *  All string fields are non-optional to avoid runtime undefined errors.
 * ------------------------------------------------------------------ */

export interface PipelineRun {
  id: string
  branch: string
  commitSha: string
  commitMessage: string
  author: string
  durationSeconds: number
  status: "success" | "failed" | "running"
  finishedAt: string
  version: string
}

export const mockPipelineRuns: PipelineRun[] = [
  {
    id: "run-241",
    branch: "main",
    commitSha: "a1b2c3d",
    commitMessage: "feat: introduce relationship dashboard widgets",
    author: "Sara Lee",
    durationSeconds: 125,
    status: "success",
    finishedAt: "2025-07-07T14:22:00Z",
    version: "v0.9.3",
  },
  {
    id: "run-240",
    branch: "feature/partner-invites",
    commitSha: "d4e5f6g",
    commitMessage: "chore: add partner invite validation",
    author: "Miguel Diaz",
    durationSeconds: 310,
    status: "failed",
    finishedAt: "2025-07-07T13:55:00Z",
    version: "v0.9.2",
  },
  {
    id: "run-239",
    branch: "main",
    commitSha: "h7i8j9k",
    commitMessage: "refactor: extract session timer logic",
    author: "Sara Lee",
    durationSeconds: 212,
    status: "success",
    finishedAt: "2025-07-07T12:10:00Z",
    version: "v0.9.1",
  },
]
