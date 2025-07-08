/**
 * Temporary mock CI/CD data so the dashboard and related components
 * compile. Replace or extend with real AlignSynch pipeline data later.
 */

export interface PipelineStage {
  id: string
  name: string
  status: "pending" | "running" | "success" | "failure" | "cancelled" | "skipped"
  duration?: number
}

export interface PipelineRun {
  id: string
  runNumber: number
  branch: string
  status: "pending" | "running" | "success" | "failure"
  startTime: string
  endTime?: string
  stages: PipelineStage[]
}

export interface PipelineMetrics {
  totalRuns: number
  successRate: number
  averageDuration: string
}

/* ------------------------------------------------------------------ */
/*  ✔ REQUIRED EXPORTS                                                */
/* ------------------------------------------------------------------ */

export const mockPipelineRuns: PipelineRun[] = [
  {
    id: "run-001",
    runNumber: 21,
    branch: "main",
    status: "running",
    startTime: "2025-07-08T18:00:00Z",
    stages: [
      { id: "lint", name: "Lint & Type-check", status: "success", duration: 120 },
      { id: "unit", name: "Unit Tests", status: "success", duration: 180 },
      { id: "build", name: "Build", status: "running" },
    ],
  },
]

export const pipelineMetrics: PipelineMetrics = {
  totalRuns: 21,
  successRate: 90,
  averageDuration: "4 m 50 s",
}
