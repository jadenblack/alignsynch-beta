"use client"

import type React from "react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useSession, signOut } from "next-auth/react"
import { useRouter } from "next/navigation"
import { hasPermission } from "@/lib/auth"
import { useEffect, useState } from "react"
import { Progress } from "@/components/ui/progress"
import { CloudUpload, FileText, Users, BarChart } from "lucide-react"
import { FileUpload } from "@/components/ui/file-upload"

export default function DashboardPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [uploadStatus, setUploadStatus] = useState<string | null>(null)

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/signin")
    }
  }, [status, router])

  if (status === "loading") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-secondary-default">
        <p>Loading dashboard...</p>
      </div>
    )
  }

  const userRole = (session?.user as any)?.role || "user"

  const handleUploadSuccess = (url: string, pathname: string) => {
    setUploadStatus(`File uploaded successfully: ${pathname}`)
    console.log("Uploaded file URL:", url)
  }

  const handleUploadError = (error: string) => {
    setUploadStatus(`Upload failed: ${error}`)
    console.error("Upload error:", error)
  }

  return (
    <div className="flex min-h-[calc(100vh-64px)] flex-col items-center justify-center bg-secondary-default p-4">
      <Card className="w-full max-w-4xl">
        <CardHeader>
          <CardTitle className="text-center text-primary-default">
            Welcome to your Dashboard, {session?.user?.name || "Guest"}!
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <p className="text-center text-lg text-gray-700">
            Your current role: <span className="font-semibold capitalize">{userRole}</span>
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <DashboardCard
              icon={<CloudUpload className="h-6 w-6 text-primary-default" />}
              title="File Upload"
              description="Upload and manage your project files securely."
            >
              <FileUpload onUploadSuccess={handleUploadSuccess} onUploadError={handleUploadError} />
              {uploadStatus && <p className="mt-2 text-sm text-center text-gray-600">{uploadStatus}</p>}
            </DashboardCard>

            {hasPermission(userRole, "users") && (
              <DashboardCard
                icon={<Users className="h-6 w-6 text-primary-default" />}
                title="User Management"
                description="Manage user accounts and roles within the system."
              >
                <Button onClick={() => router.push("/admin/users")} className="w-full">
                  Go to Users
                </Button>
              </DashboardCard>
            )}

            {hasPermission(userRole, "insights") && (
              <DashboardCard
                icon={<BarChart className="h-6 w-6 text-primary-default" />}
                title="Insights & Analytics"
                description="View performance metrics and application insights."
              >
                <Button onClick={() => router.push("/insights")} className="w-full">
                  View Insights
                </Button>
              </DashboardCard>
            )}

            <DashboardCard
              icon={<FileText className="h-6 w-6 text-primary-default" />}
              title="Documentation"
              description="Access comprehensive guides and resources."
            >
              <Button onClick={() => router.push("/design-system")} className="w-full">
                Read Docs
              </Button>
            </DashboardCard>
          </div>

          <div className="text-center">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Overall Progress</h3>
            <Progress value={85} className="w-full" />
            <p className="text-sm text-gray-600 mt-1">85% of project goals achieved. Keep pushing!</p>
          </div>

          <div className="flex justify-center mt-6">
            <Button onClick={() => signOut()} variant="destructive">
              Sign Out
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

interface DashboardCardProps {
  icon: React.ReactNode
  title: string
  description: string
  children: React.ReactNode
}

function DashboardCard({ icon, title, description, children }: DashboardCardProps) {
  return (
    <Card className="flex flex-col items-center p-6 text-center">
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-semibold text-gray-800 mb-2">{title}</h3>
      <p className="text-gray-600 mb-4">{description}</p>
      {children}
    </Card>
  )
}
