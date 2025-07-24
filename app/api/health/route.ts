import { NextResponse } from "next/server"
import { validateEnv } from "@/lib/env-validation"

export async function GET() {
  try {
    const env = validateEnv()

    const health = {
      status: "healthy",
      timestamp: new Date().toISOString(),
      version: env.NEXT_PUBLIC_VERSION,
      environment: env.NODE_ENV,
      checks: {
        nextauth: {
          configured: !!(env.NEXTAUTH_SECRET && env.NEXTAUTH_URL),
          url: env.NEXTAUTH_URL || "not configured",
        },
        database: {
          configured: !!env.DATABASE_URL,
          connected: false, // Would need actual DB connection test
        },
        email: {
          configured: !!(env.SMTP_HOST && env.SMTP_USER),
          host: env.SMTP_HOST || "not configured",
        },
      },
    }

    return NextResponse.json(health)
  } catch (error) {
    return NextResponse.json(
      {
        status: "unhealthy",
        timestamp: new Date().toISOString(),
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}
