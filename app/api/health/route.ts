import { NextResponse } from "next/server"
import { validateEnv } from "@/lib/env-validation"

export async function GET() {
  try {
    const envValidation = validateEnv()

    const healthStatus = {
      status: "ok",
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV || "development",
      vercelRegion: process.env.VERCEL_REGION || "unknown",
      envValidation: envValidation.success ? "success" : "failed",
      envErrors: envValidation.errors || [],
      // Add more checks as needed, e.g., database connection, external service reachability
    }

    if (!envValidation.success) {
      return NextResponse.json(healthStatus, { status: 500 })
    }

    return NextResponse.json(healthStatus, { status: 200 })
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
