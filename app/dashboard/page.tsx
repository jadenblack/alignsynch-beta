"use client"

import Link from "next/link"

import { useSession } from "next-auth/react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
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
      <div className="flex min-h-[calc(100vh-64px-64px)] items-center justify-center bg-gray-50 p-4">
        <p className="text-gray-600">Loading dashboard...</p>
      </div>
    )
  }

  if (!session) {
    return null // Should redirect by useEffect
  }

  const userRole = session.user?.role || "user"

  return (
    <main className="flex flex-col items-center justify-center min-h-[calc(100vh-64px-64px)] p-4 md:p-8 bg-gray-50">
      <section className="text-center mb-12">
        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4">
          Welcome, {session.user?.name || session.user?.email}!
        </h1>
        <p className="text-lg md:text-xl text-gray-700 max-w-2xl mx-auto mb-8">
          Your role: <Badge variant="default">{userRole.toUpperCase()}</Badge>
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild className="px-8 py-3 text-lg">
            <Link href="/quiz/new">Start a Quiz</Link>
          </Button>
          <Button asChild variant="outline" className="px-8 py-3 text-lg bg-transparent">
            <Link href="/leaderboard">View Leaderboard</Link>
          </Button>
        </div>
      </section>

      <section className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card className="p-6">
          <CardHeader>
            <CardTitle className="text-xl font-semibold mb-2">Your Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">Overall completion:</p>
            <Progress value={75} className="w-full" />
            <p className="text-sm text-gray-500 mt-2">75% of modules completed</p>
          </CardContent>
        </Card>
        <Card className="p-6">
          <CardHeader>
            <CardTitle className="text-xl font-semibold mb-2">Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="text-gray-600 space-y-2">
              <li>Completed "Next.js Fundamentals" quiz.</li>
              <li>Scored 90% on "React Hooks" assessment.</li>
              <li>Started "Advanced TypeScript" module.</li>
            </ul>
          </CardContent>
        </Card>
      </section>
    </main>
  )
}
