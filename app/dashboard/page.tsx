"use client"

import { useSession } from "next-auth/react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function DashboardPage() {
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/signin")
    }
  }, [status, router])

  if (status === "loading") {
    return (
      <div className="flex min-h-[calc(100vh-64px)] items-center justify-center">
        <p className="text-lg text-gray-500 dark:text-gray-400">Loading dashboard...</p>
      </div>
    )
  }

  if (!session) {
    return null // Should redirect via useEffect
  }

  const userRole = (session.user as any)?.role || "user"

  return (
    <div className="flex flex-col min-h-[calc(100vh-64px)] p-4 sm:p-6 lg:p-8 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto w-full space-y-8">
        <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 dark:text-gray-50">
          Welcome, {session.user?.name || "User"}!
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Your role: <Badge variant="secondary">{userRole}</Badge>
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="bg-white dark:bg-gray-800 shadow-md">
            <CardHeader>
              <CardTitle>Project Progress</CardTitle>
              <CardDescription>Overview of your current projects.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm text-gray-700 dark:text-gray-300">
                  <span>Frontend Development</span>
                  <span>75%</span>
                </div>
                <Progress value={75} className="w-full" />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm text-gray-700 dark:text-gray-300">
                  <span>Backend API Integration</span>
                  <span>50%</span>
                </div>
                <Progress value={50} className="w-full" />
              </div>
              <Button className="w-full">View All Projects</Button>
            </CardContent>
          </Card>

          <Card className="bg-white dark:bg-gray-800 shadow-md">
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Latest updates and notifications.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-gray-700 dark:text-gray-300">
              <p>• Task "Implement Auth" completed by Admin User.</p>
              <p>• New file "report.pdf" uploaded by Moderator User.</p>
              <p>• User "John Doe" updated profile information.</p>
              <Button variant="outline" className="w-full bg-transparent">
                View Activity Log
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-white dark:bg-gray-800 shadow-md">
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Perform common tasks quickly.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full">Create New Task</Button>
              <Button variant="secondary" className="w-full">
                Upload Document
              </Button>
              <Button variant="ghost" className="w-full">
                Access Settings
              </Button>
            </CardContent>
          </Card>
        </div>

        {userRole === "admin" && (
          <Card className="bg-white dark:bg-gray-800 shadow-md border-blue-500 dark:border-blue-400 border-l-4">
            <CardHeader>
              <CardTitle className="text-blue-600 dark:text-blue-400">Admin Panel Access</CardTitle>
              <CardDescription>Manage users, settings, and system configurations.</CardDescription>
            </CardHeader>
            <CardContent>
              <Button
                onClick={() => router.push("/admin/dashboard")}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white dark:bg-blue-500 dark:hover:bg-blue-600"
              >
                Go to Admin Dashboard
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
