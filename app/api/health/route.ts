import { NextResponse } from "next/server"
import { validateEnv } from "@/lib/env-validation"

export async function GET() {
  try {
    const envStatus = validateEnv()
    const healthStatus = {
      status: "healthy",
      timestamp: new Date().toISOString(),
      environment: envStatus.data.NODE_ENV,
      nextAuthUrlSet: envStatus.data.NEXTAUTH_URL ? true : false,
      nextAuthSecretSet: envStatus.data.NEXTAUTH_SECRET ? true : false,
      memoryUsage: process.memoryUsage(),
      uptime: process.uptime(),
      platform: process.platform,
      nodeVersion: process.version,
      envValidation: envStatus.success ? "success" : envStatus.error,
    }

    return NextResponse.json(healthStatus, { status: 200 })
  } catch (error) {
    console.error("Health check failed:", error)
    return NextResponse.json(
      {
        status: "unhealthy",
        message: error instanceof Error ? error.message : "Unknown error during health check",
        timestamp: new Date().toISOString(),
      },
      { status: 500 },
    )
  }
}
