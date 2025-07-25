import { NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { hasPermission } from "@/lib/auth"

export async function GET() {
  const session = await auth()

  if (!session || !session.user || !hasPermission((session.user as any).role, "admin")) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  // In a real application, you would integrate with Vercel's API
  // or a logging service (e.g., Log Drains) to fetch actual build logs.
  // For this example, we'll return mock data.
  const mockBuildLogs = [
    { timestamp: new Date(Date.now() - 60000).toISOString(), level: "INFO", message: "Starting build process..." },
    { timestamp: new Date(Date.now() - 50000).toISOString(), level: "INFO", message: "Installing dependencies..." },
    {
      timestamp: new Date(Date.now() - 40000).toISOString(),
      level: "INFO",
      message: "Running `npm install --legacy-peer-deps`",
    },
    {
      timestamp: new Date(Date.now() - 30000).toISOString(),
      level: "INFO",
      message: "Dependencies installed successfully.",
    },
    {
      timestamp: new Date(Date.now() - 20000).toISOString(),
      level: "INFO",
      message: "Building Next.js application...",
    },
    { timestamp: new Date(Date.now() - 10000).toISOString(), level: "INFO", message: "Static assets optimized." },
    { timestamp: new Date().toISOString(), level: "INFO", message: "Build completed successfully." },
  ]

  return NextResponse.json({ logs: mockBuildLogs })
}
