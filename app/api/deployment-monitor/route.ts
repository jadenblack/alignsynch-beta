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
      status: "monitoring_active",
      message: "Deployment monitoring endpoint is active.",
      buildId: process.env.VERCEL_BUILD_ID || "N/A",
      commitSha: process.env.VERCEL_GIT_COMMIT_SHA || "N/A",
      commitRef: process.env.VERCEL_GIT_COMMIT_REF || "N/A",
      commitTimestamp: process.env.VERCEL_GIT_COMMIT_TIMESTAMP || "N/A",
      region: process.env.VERCEL_REGION || "N/A",
      environment: process.env.VERCEL_ENV || "N/A",
      // Add more checks for critical components if needed
      // e.g., 'authServiceStatus': await checkAuthService(),
      timestamp: new Date().toISOString(),
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
    console.error("Deployment monitor failed:", error)
    return NextResponse.json({ status: "error", message: (error as Error).message }, { status: 500 })
  }
}
