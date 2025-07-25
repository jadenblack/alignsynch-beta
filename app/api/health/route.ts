import { NextResponse } from "next/server"

export async function GET() {
  try {
    // Basic health check: check if environment variables are accessible
    const nextAuthSecret = process.env.NEXTAUTH_SECRET
    const nextAuthUrl = process.env.NEXTAUTH_URL
    const blobReadWriteToken = process.env.BLOB_READ_WRITE_TOKEN

    if (!nextAuthSecret || !nextAuthUrl || !blobReadWriteToken) {
      return NextResponse.json(
        {
          status: "unhealthy",
          message: "Missing critical environment variables",
          details: {
            NEXTAUTH_SECRET: nextAuthSecret ? "set" : "missing",
            NEXTAUTH_URL: nextAuthUrl ? "set" : "missing",
            BLOB_READ_WRITE_TOKEN: blobReadWriteToken ? "set" : "missing",
          },
        },
        { status: 500 },
      )
    }

    // You can add more checks here, e.g., database connection, external service reachability
    // For now, we'll assume if env vars are present, the app is generally healthy.

    return NextResponse.json({
      status: "healthy",
      message: "Application is running and essential environment variables are set.",
      timestamp: new Date().toISOString(),
      uptime: process.uptime(), // Node.js process uptime
      memoryUsage: process.memoryUsage(),
    })
  } catch (error: any) {
    console.error("Health check failed:", error)
    return NextResponse.json(
      {
        status: "unhealthy",
        message: "An error occurred during health check",
        error: error.message,
      },
      { status: 500 },
    )
  }
}
