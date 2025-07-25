import { NextResponse } from "next/server"

export async function GET() {
  try {
    const healthStatus = {
      status: "ok",
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      memoryUsage: process.memoryUsage(),
      environment: process.env.NODE_ENV,
      vercelRegion: process.env.VERCEL_REGION || "unknown",
      nextAuthUrl: process.env.NEXTAUTH_URL ? "set" : "not set",
      nextAuthSecret: process.env.NEXTAUTH_SECRET ? "set" : "not set",
      blobReadWriteToken: process.env.BLOB_READ_WRITE_TOKEN ? "set" : "not set",
    }
    return NextResponse.json(healthStatus, { status: 200 })
  } catch (error) {
    console.error("Health check failed:", error)
    return NextResponse.json({ status: "error", message: (error as Error).message }, { status: 500 })
  }
}
