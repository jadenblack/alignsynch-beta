import { NextResponse } from "next/server"

export async function GET() {
  try {
    const deploymentStatus = {
      status: "success",
      message: "Deployment is active and running.",
      timestamp: new Date().toISOString(),
      // These environment variables are automatically provided by Vercel during deployment
      // and can be used to monitor the specific deployment.
      commitSha: process.env.VERCEL_GIT_COMMIT_SHA || "N/A",
      commitRef: process.env.VERCEL_GIT_COMMIT_REF || "N/A",
      commitTimestamp: process.env.VERCEL_GIT_COMMIT_TIMESTAMP || "N/A",
      buildId: process.env.VERCEL_BUILD_ID || "N/A",
      region: process.env.VERCEL_REGION || "N/A",
      // Add more checks here if needed, e.g., specific feature flags, database connection status
      // For now, we'll rely on Vercel's provided deployment metadata.
    }
    return NextResponse.json(deploymentStatus, { status: 200 })
  } catch (error) {
    console.error("Deployment monitor failed:", error)
    return NextResponse.json({ status: "error", message: "Deployment monitor failed" }, { status: 500 })
  }
}
