import { NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { hasPermission } from "@/lib/auth"

export async function GET() {
  try {
    const session = await auth()

    if (!session || !session.user || !hasPermission((session.user as any).role, "admin")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const deploymentStatus = {
      status: "active",
      lastDeployment: new Date().toISOString(),
      environment: process.env.VERCEL_ENV || "development",
      region: process.env.VERCEL_REGION || "local",
      buildId: process.env.VERCEL_BUILD_ID || "N/A",
      gitCommitSha: process.env.VERCEL_GIT_COMMIT_SHA || "N/A",
      gitCommitRef: process.env.VERCEL_GIT_COMMIT_REF || "N/A",
      gitCommitTimestamp: process.env.VERCEL_GIT_COMMIT_TIMESTAMP || "N/A",
      message: "Application is running and serving requests.",
    }

    return NextResponse.json(deploymentStatus, {
      status: 200,
      headers: {
        "Cache-Control": "no-cache, no-store, must-revalidate",
        Pragma: "no-cache",
        Expires: "0",
      },
    })
  } catch (error) {
    return NextResponse.json(
      {
        status: "error",
        message: error instanceof Error ? error.message : "Deployment monitoring failed",
        timestamp: new Date().toISOString(),
        error: true,
      },
      { status: 500 },
    )
  }
}
