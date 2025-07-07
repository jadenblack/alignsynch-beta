export interface PipelineStage {
  id: string
  name: string
  status: "pending" | "running" | "success" | "failure" | "cancelled" | "skipped"
  startTime?: string
  endTime?: string
  duration?: number
  logs?: string[]
  artifacts?: string[]
  dependencies?: string[]
}

export interface TestResult {
  id: string
  name: string
  type: "unit" | "integration" | "e2e" | "performance" | "security"
  status: "pending" | "running" | "passed" | "failed" | "skipped"
  duration: number
  coverage?: number
  passedTests: number
  failedTests: number
  totalTests: number
  details?: {
    file: string
    line?: number
    message?: string
    stack?: string
  }[]
}

export interface Deployment {
  id: string
  version: string
  environment: "staging" | "production"
  status: "pending" | "deploying" | "success" | "failure" | "rolled_back"
  url?: string
  commitSha: string
  commitMessage: string
  author: string
  startTime: string
  endTime?: string
  duration?: number
  previousVersion?: string
  rollbackReason?: string
}

export interface PipelineRun {
  id: string
  runNumber: number
  version: string
  branch: string
  commitSha: string
  commitMessage: string
  author: {
    name: string
    email: string
    avatar: string
  }
  trigger: "push" | "pull_request" | "manual" | "schedule"
  status: "pending" | "running" | "success" | "failure" | "cancelled"
  startTime: string
  endTime?: string
  duration?: number
  stages: PipelineStage[]
  tests: TestResult[]
  deployments: Deployment[]
  artifacts: {
    name: string
    size: string
    downloadUrl: string
  }[]
}

export interface PipelineMetrics {
  totalRuns: number
  successRate: number
  averageDuration: string
  deploymentFrequency: string
  leadTime: string
  mttr: string // Mean Time To Recovery
  changeFailureRate: number
}

// Mock data for the CI/CD dashboard
export const mockPipelineRuns: PipelineRun[] = [
  {
    id: "run-001",
    runNumber: 142,
    version: "2.01.1",
    branch: "main",
    commitSha: "abc123def456",
    commitMessage: "feat: Add CI/CD pipeline integration to dashboard",
    author: {
      name: "Sarah Johnson",
      email: "sarah@alignsynch.com",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    trigger: "push",
    status: "running",
    startTime: "2024-01-15T14:30:00Z",
    stages: [
      {
        id: "code-quality",
        name: "Code Quality & Linting",
        status: "success",
        startTime: "2024-01-15T14:30:00Z",
        endTime: "2024-01-15T14:32:30Z",
        duration: 150,
        logs: [
          "✓ ESLint passed with 0 errors",
          "✓ Prettier check passed",
          "✓ TypeScript compilation successful",
          "✓ Security audit completed - no vulnerabilities found",
        ],
      },
      {
        id: "unit-tests",
        name: "Unit Tests",
        status: "success",
        startTime: "2024-01-15T14:32:30Z",
        endTime: "2024-01-15T14:35:45Z",
        duration: 195,
        logs: ["Running unit tests...", "✓ 127 tests passed", "✓ Coverage: 85.2%", "✓ Test report generated"],
        artifacts: ["unit-test-results", "coverage-report"],
      },
      {
        id: "integration-tests",
        name: "Integration Tests",
        status: "success",
        startTime: "2024-01-15T14:32:30Z",
        endTime: "2024-01-15T14:37:15Z",
        duration: 285,
        logs: [
          "Setting up test database...",
          "Running integration tests...",
          "✓ 45 integration tests passed",
          "✓ Database cleanup completed",
        ],
      },
      {
        id: "build",
        name: "Build Application",
        status: "success",
        startTime: "2024-01-15T14:37:15Z",
        endTime: "2024-01-15T14:40:30Z",
        duration: 195,
        logs: [
          "Installing dependencies...",
          "Building Next.js application...",
          "✓ Build completed successfully",
          "✓ Static files generated",
        ],
        artifacts: ["build-files"],
      },
      {
        id: "security-scan",
        name: "Security Scanning",
        status: "success",
        startTime: "2024-01-15T14:40:30Z",
        endTime: "2024-01-15T14:42:00Z",
        duration: 90,
        logs: [
          "Running Snyk security scan...",
          "✓ No high-severity vulnerabilities found",
          "✓ Security report generated",
        ],
      },
      {
        id: "deploy-staging",
        name: "Deploy to Staging",
        status: "running",
        startTime: "2024-01-15T14:42:00Z",
        logs: ["Deploying to Vercel staging...", "Building deployment...", "Uploading assets..."],
      },
      {
        id: "e2e-tests",
        name: "End-to-End Tests",
        status: "pending",
        dependencies: ["deploy-staging"],
      },
      {
        id: "performance-tests",
        name: "Performance Tests",
        status: "pending",
        dependencies: ["deploy-staging"],
      },
      {
        id: "deploy-production",
        name: "Deploy to Production",
        status: "pending",
        dependencies: ["e2e-tests", "performance-tests"],
      },
    ],
    tests: [
      {
        id: "unit-tests-result",
        name: "Unit Tests",
        type: "unit",
        status: "passed",
        duration: 195,
        coverage: 85.2,
        passedTests: 127,
        failedTests: 0,
        totalTests: 127,
      },
      {
        id: "integration-tests-result",
        name: "Integration Tests",
        type: "integration",
        status: "passed",
        duration: 285,
        passedTests: 45,
        failedTests: 0,
        totalTests: 45,
      },
      {
        id: "e2e-tests-result",
        name: "End-to-End Tests",
        type: "e2e",
        status: "pending",
        duration: 0,
        passedTests: 0,
        failedTests: 0,
        totalTests: 24,
      },
    ],
    deployments: [
      {
        id: "staging-deploy-001",
        version: "2.01.1",
        environment: "staging",
        status: "deploying",
        commitSha: "abc123def456",
        commitMessage: "feat: Add CI/CD pipeline integration to dashboard",
        author: "Sarah Johnson",
        startTime: "2024-01-15T14:42:00Z",
      },
    ],
    artifacts: [
      {
        name: "unit-test-results",
        size: "2.4 MB",
        downloadUrl: "/api/artifacts/unit-test-results",
      },
      {
        name: "coverage-report",
        size: "1.8 MB",
        downloadUrl: "/api/artifacts/coverage-report",
      },
      {
        name: "build-files",
        size: "45.2 MB",
        downloadUrl: "/api/artifacts/build-files",
      },
    ],
  },
  {
    id: "run-002",
    runNumber: 141,
    version: "2.01.0",
    branch: "main",
    commitSha: "def456ghi789",
    commitMessage: "fix: Resolve quiz timer memory leak issue",
    author: {
      name: "Tom Wilson",
      email: "tom@alignsynch.com",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    trigger: "push",
    status: "success",
    startTime: "2024-01-15T12:15:00Z",
    endTime: "2024-01-15T12:45:30Z",
    duration: 1830,
    stages: [
      {
        id: "code-quality",
        name: "Code Quality & Linting",
        status: "success",
        startTime: "2024-01-15T12:15:00Z",
        endTime: "2024-01-15T12:17:15Z",
        duration: 135,
      },
      {
        id: "unit-tests",
        name: "Unit Tests",
        status: "success",
        startTime: "2024-01-15T12:17:15Z",
        endTime: "2024-01-15T12:20:30Z",
        duration: 195,
      },
      {
        id: "integration-tests",
        name: "Integration Tests",
        status: "success",
        startTime: "2024-01-15T12:17:15Z",
        endTime: "2024-01-15T12:22:00Z",
        duration: 285,
      },
      {
        id: "build",
        name: "Build Application",
        status: "success",
        startTime: "2024-01-15T12:22:00Z",
        endTime: "2024-01-15T12:25:15Z",
        duration: 195,
      },
      {
        id: "security-scan",
        name: "Security Scanning",
        status: "success",
        startTime: "2024-01-15T12:25:15Z",
        endTime: "2024-01-15T12:26:45Z",
        duration: 90,
      },
      {
        id: "deploy-staging",
        name: "Deploy to Staging",
        status: "success",
        startTime: "2024-01-15T12:26:45Z",
        endTime: "2024-01-15T12:30:00Z",
        duration: 195,
      },
      {
        id: "e2e-tests",
        name: "End-to-End Tests",
        status: "success",
        startTime: "2024-01-15T12:30:00Z",
        endTime: "2024-01-15T12:38:30Z",
        duration: 510,
      },
      {
        id: "performance-tests",
        name: "Performance Tests",
        status: "success",
        startTime: "2024-01-15T12:30:00Z",
        endTime: "2024-01-15T12:35:15Z",
        duration: 315,
      },
      {
        id: "deploy-production",
        name: "Deploy to Production",
        status: "success",
        startTime: "2024-01-15T12:38:30Z",
        endTime: "2024-01-15T12:45:30Z",
        duration: 420,
      },
    ],
    tests: [
      {
        id: "unit-tests-result",
        name: "Unit Tests",
        type: "unit",
        status: "passed",
        duration: 195,
        coverage: 87.1,
        passedTests: 125,
        failedTests: 0,
        totalTests: 125,
      },
      {
        id: "integration-tests-result",
        name: "Integration Tests",
        type: "integration",
        status: "passed",
        duration: 285,
        passedTests: 43,
        failedTests: 0,
        totalTests: 43,
      },
      {
        id: "e2e-tests-result",
        name: "End-to-End Tests",
        type: "e2e",
        status: "passed",
        duration: 510,
        passedTests: 24,
        failedTests: 0,
        totalTests: 24,
      },
      {
        id: "performance-tests-result",
        name: "Performance Tests",
        type: "performance",
        status: "passed",
        duration: 315,
        passedTests: 8,
        failedTests: 0,
        totalTests: 8,
      },
    ],
    deployments: [
      {
        id: "staging-deploy-002",
        version: "2.01.0",
        environment: "staging",
        status: "success",
        url: "https://staging.alignsynch.com",
        commitSha: "def456ghi789",
        commitMessage: "fix: Resolve quiz timer memory leak issue",
        author: "Tom Wilson",
        startTime: "2024-01-15T12:26:45Z",
        endTime: "2024-01-15T12:30:00Z",
        duration: 195,
      },
      {
        id: "production-deploy-002",
        version: "2.01.0",
        environment: "production",
        status: "success",
        url: "https://alignsynch.com",
        commitSha: "def456ghi789",
        commitMessage: "fix: Resolve quiz timer memory leak issue",
        author: "Tom Wilson",
        startTime: "2024-01-15T12:38:30Z",
        endTime: "2024-01-15T12:45:30Z",
        duration: 420,
      },
    ],
    artifacts: [
      {
        name: "test-results",
        size: "3.2 MB",
        downloadUrl: "/api/artifacts/test-results",
      },
      {
        name: "performance-report",
        size: "1.1 MB",
        downloadUrl: "/api/artifacts/performance-report",
      },
    ],
  },
  {
    id: "run-003",
    runNumber: 140,
    version: "2.00.9",
    branch: "main",
    commitSha: "ghi789jkl012",
    commitMessage: "feat: Add dark mode toggle to settings page",
    author: {
      name: "Lisa Wang",
      email: "lisa@alignsynch.com",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    trigger: "push",
    status: "failure",
    startTime: "2024-01-15T10:20:00Z",
    endTime: "2024-01-15T10:35:45Z",
    duration: 945,
    stages: [
      {
        id: "code-quality",
        name: "Code Quality & Linting",
        status: "success",
        startTime: "2024-01-15T10:20:00Z",
        endTime: "2024-01-15T10:22:15Z",
        duration: 135,
      },
      {
        id: "unit-tests",
        name: "Unit Tests",
        status: "failure",
        startTime: "2024-01-15T10:22:15Z",
        endTime: "2024-01-15T10:25:30Z",
        duration: 195,
        logs: [
          "Running unit tests...",
          "✗ 3 tests failed",
          "✓ 122 tests passed",
          "Error: Theme toggle component tests failing",
        ],
      },
      {
        id: "integration-tests",
        name: "Integration Tests",
        status: "skipped",
      },
      {
        id: "build",
        name: "Build Application",
        status: "skipped",
      },
    ],
    tests: [
      {
        id: "unit-tests-result",
        name: "Unit Tests",
        type: "unit",
        status: "failed",
        duration: 195,
        coverage: 82.5,
        passedTests: 122,
        failedTests: 3,
        totalTests: 125,
        details: [
          {
            file: "components/theme-toggle.test.tsx",
            line: 45,
            message: "Expected theme to be 'dark' but received 'light'",
            stack: "at ThemeToggle.test.tsx:45:23",
          },
        ],
      },
    ],
    deployments: [],
    artifacts: [
      {
        name: "failed-test-results",
        size: "1.8 MB",
        downloadUrl: "/api/artifacts/failed-test-results",
      },
    ],
  },
]

export const pipelineMetrics: PipelineMetrics = {
  totalRuns: 142,
  successRate: 89.4,
  averageDuration: "18m 32s",
  deploymentFrequency: "3.2 per day",
  leadTime: "2h 15m",
  mttr: "45m",
  changeFailureRate: 10.6,
}
