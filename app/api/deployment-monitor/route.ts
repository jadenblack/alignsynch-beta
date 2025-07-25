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
      message: "Application is running and serving requests.",
      timestamp: new Date().toISOString(),
      commitSha: process.env.VERCEL_GIT_COMMIT_SHA || "N/A",
      commitRef: process.env.VERCEL_GIT_COMMIT_REF || "N/A",
      buildId: process.env.VERCEL_BUILD_ID || "N/A",
      vercelUrl: process.env.VERCEL_URL || "N/A",
      nextAuthUrl: process.env.NEXTAUTH_URL || "N/A",
      nodeVersion: process.version,
      dependencies: {
        next: require("next/package.json").version,
        "next-auth": require("next-auth/package.json").version,
        "@vercel/blob": require("@vercel/blob/package.json").version,
        // Add other key dependencies you want to monitor
      },
    }

    return NextResponse.json(deploymentStatus, { status: 200 })
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
