import { NextResponse } from "next/server"
import { validateEnv } from "@/lib/env-validation"

export async function GET() {
  try {
    const envStatus = validateEnv()
    const healthStatus = {
      status: "ok",
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      memoryUsage: process.memoryUsage(),
      environment: process.env.NODE_ENV,
      vercel: {
        env: process.env.VERCEL_ENV || "development",
        region: process.env.VERCEL_REGION || "local",
        url: process.env.VERCEL_URL || "http://localhost:3000",
        gitCommitSha: process.env.VERCEL_GIT_COMMIT_SHA || "N/A",
        gitCommitRef: process.env.VERCEL_GIT_COMMIT_REF || "N/A",
        gitCommitTimestamp: process.env.VERCEL_GIT_COMMIT_TIMESTAMP || "N/A",
        buildId: process.env.VERCEL_BUILD_ID || "N/A",
      },
      envValidation: envStatus,
    }
    return NextResponse.json(healthStatus, { status: 200 })
  } catch (error: any) {
    console.error("Health check failed:", error)
    return NextResponse.json({ status: "error", message: error.message }, { status: 500 })
  }
}
