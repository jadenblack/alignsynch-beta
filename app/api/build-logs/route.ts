import { NextResponse } from "next/server"

// This is a mock endpoint as direct access to Vercel build logs via API is restricted for security.
// In a real-world scenario, you would integrate with Vercel's API or a CI/CD service's API
// to fetch actual build logs, if permissible and authenticated.
export async function GET() {
  const mockLogs = [
    "INFO: Build initiated...",
    "INFO: Cloning repository...",
    "INFO: Restoring build cache...",
    "INFO: Running install command: npm install --legacy-peer-deps",
    "SUCCESS: Dependencies installed.",
    "INFO: Running build command: npm run build",
    "SUCCESS: Application built successfully.",
    "INFO: Optimizing assets...",
    "SUCCESS: Deployment complete.",
    `Timestamp: ${new Date().toISOString()}`,
  ]

  return NextResponse.json(
    {
      logs: mockLogs,
      message:
        "This is a mock build log endpoint. Actual Vercel build logs are accessed via the Vercel dashboard for security reasons.",
    },
    { status: 200 },
  )
}
