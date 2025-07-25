import { NextResponse } from "next/server"
import { validateEnv } from "@/lib/env-validation"

export async function GET() {
  try {
    // Validate environment variables
    const envStatus = validateEnv()

    // Basic system health checks
    const uptime = process.uptime()
    const memoryUsage = process.memoryUsage()

    return NextResponse.json({
      status: "ok",
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV,
      uptime: `${uptime.toFixed(2)} seconds`,
      memoryUsage: {
        rss: `${(memoryUsage.rss / 1024 / 1024).toFixed(2)} MB`,
        heapTotal: `${(memoryUsage.heapTotal / 1024 / 1024).toFixed(2)} MB`,
        heapUsed: `${(memoryUsage.heapUsed / 1024 / 1024).toFixed(2)} MB`,
        external: `${(memoryUsage.external / 1024 / 1024).toFixed(2)} MB`,
      },
      envValidation: envStatus,
    })
  } catch (error: any) {
    console.error("Health check failed:", error)
    return NextResponse.json(
      {
        status: "error",
        message: "Health check failed",
        details: error.message,
      },
      { status: 500 },
    )
  }
}
