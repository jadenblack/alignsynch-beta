"use client"

import { useSession } from "next-auth/react"
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { FileUpload } from "@/components/ui/file-upload"
import Link from "next/link"

export default function DashboardPage() {
  const { data: session, status } = useSession()

  if (status === "loading") {
    return (
      <div className="flex min-h-[calc(100vh-64px-64px)] items-center justify-center">
        <p>Loading dashboard...</p>
      </div>
    )
  }

  if (status === "unauthenticated") {
    return (
      <div className="flex min-h-[calc(100vh-64px-64px)] flex-col items-center justify-center p-4 text-center">
        <h2 className="text-2xl font-bold mb-4">Access Denied</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6">You need to be signed in to view this page.</p>
        <Button asChild>
          <Link href="/auth/signin">Sign In</Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6">Welcome, {session?.user?.name || "User"}!</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Your Role</CardTitle>
            <CardDescription>Your current access level.</CardDescription>
          </CardHeader>
          <CardContent>
            <Badge variant="default" className="text-lg px-4 py-1">
              {session?.user?.role ? session.user.role.charAt(0).toUpperCase() + session.user.role.slice(1) : "N/A"}
            </Badge>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Project Progress</CardTitle>
            <CardDescription>Overall completion of your active projects.</CardDescription>
          </CardHeader>
          <CardContent>
            <Progress value={75} className="w-full" />
            <p className="text-sm text-muted-foreground mt-2">75% Complete</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest updates from your team.</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="text-sm text-muted-foreground space-y-2">
              <li>Task "Implement Auth" completed by Admin.</li>
              <li>New file "design-v2.pdf" uploaded.</li>
              <li>Moderator reviewed "User Feedback" section.</li>
            </ul>
          </CardContent>
        </Card>
      </div>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>File Management</CardTitle>
          <CardDescription>Upload and manage your project files.</CardDescription>
        </CardHeader>
        <CardContent>
          <FileUpload />
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Jump to important sections.</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-3">
            <Button asChild variant="outline">
              <Link href="/admin">Admin Dashboard</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/settings">User Settings</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/quiz/new">Start New Quiz</Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Support</CardTitle>
            <CardDescription>Need help? Contact our support team.</CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="secondary">Contact Support</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
