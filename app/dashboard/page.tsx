"use client"

import { useSession } from "next-auth/react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import type { User } from "@/lib/auth" // Import the User type

export default function DashboardPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (status === "loading") {
      setLoading(true)
    } else if (status === "unauthenticated") {
      router.push("/auth/signin")
    } else {
      setLoading(false)
    }
  }, [status, router])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Loading dashboard...</p>
      </div>
    )
  }

  const user = session?.user as User // Cast session.user to User type

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-64px)] bg-gray-50 dark:bg-gray-900 p-4">
      <div className="max-w-4xl w-full space-y-8 text-center">
        <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 dark:text-gray-50 sm:text-5xl md:text-6xl">
          Welcome, <span className="text-primary">{user?.name || "User"}</span>!
        </h1>
        <p className="mt-4 text-xl text-gray-600 dark:text-gray-400 leading-relaxed">
          Your personalized overview of AlignSynch.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          <Card className="flex flex-col items-center p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-primary">My Progress</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-700 dark:text-gray-300">
              <p>Track your alignment journey and see your achievements.</p>
              <Progress value={80} className="mt-4" />
              <Badge className="mt-4 bg-primary text-primary-foreground">On Track</Badge>
            </CardContent>
          </Card>

          <Card className="flex flex-col items-center p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-primary">Recent Activity</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-700 dark:text-gray-300">
              <p>View your latest interactions and updates.</p>
              <ul className="mt-4 text-left space-y-2">
                <li>- Completed "Communication Basics" module</li>
                <li>- Shared insights with partner</li>
                <li>- Reviewed weekly report</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="flex flex-col items-center p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-primary">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-700 dark:text-gray-300 space-y-3">
              <Button className="w-full">Start New Session</Button>
              <Button variant="outline" className="w-full bg-transparent">
                View Reports
              </Button>
              <Button variant="ghost" className="w-full">
                Update Profile
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
