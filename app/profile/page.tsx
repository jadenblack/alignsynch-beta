"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { User, BarChart3, Calendar, ArrowUpRight, Heart } from "lucide-react"
import { mockUserAccount } from "@/lib/relationship-data"

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("overview")
  const userData = mockUserAccount

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 py-12 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            {/* Profile Header */}
            <div className="bg-card rounded-xl p-6 shadow-sm mb-8 flex flex-col md:flex-row gap-6 items-center md:items-start">
              <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center">
                <User className="h-12 w-12 text-primary" />
              </div>
              <div className="flex-1 text-center md:text-left">
                <h1 className="text-3xl font-bold">{userData.name}</h1>
                <p className="text-muted-foreground">{userData.email}</p>
                <div className="flex flex-wrap gap-2 mt-4 justify-center md:justify-start">
                  <Badge variant="outline" className="gap-1">
                    <Calendar className="h-3 w-3" />
                    Joined {userData.joinDate}
                  </Badge>
                  <Badge variant="outline" className="gap-1">
                    <Heart className="h-3 w-3" />
                    {userData.averageAlignment}% avg. alignment
                  </Badge>
                  <Badge variant="outline" className="gap-1">
                    <BarChart3 className="h-3 w-3" />
                    {userData.sessionsCompleted} sessions
                  </Badge>
                </div>
              </div>
              <div className="flex gap-2">
                <Link href="/settings">
                  <Button variant="outline">Settings</Button>
                </Link>
                <Link href="/session/new">
                  <Button>Start New Session</Button>
                </Link>
              </div>
            </div>

            {/* Profile Tabs */}
            <div className="flex border-b mb-8">
              <button
                className={`px-4 py-2 font-medium ${
                  activeTab === "overview" ? "border-b-2 border-primary text-primary" : "text-muted-foreground"
                }`}
                onClick={() => setActiveTab("overview")}
              >
                Overview
              </button>
              <button
                className={`px-4 py-2 font-medium ${
                  activeTab === "history" ? "border-b-2 border-primary text-primary" : "text-muted-foreground"
                }`}
                onClick={() => setActiveTab("history")}
              >
                Session History
              </button>
              <button
                className={`px-4 py-2 font-medium ${
                  activeTab === "achievements" ? "border-b-2 border-primary text-primary" : "text-muted-foreground"
                }`}
                onClick={() => setActiveTab("achievements")}
              >
                Achievements
              </button>
            </div>

            {/* Tab Content */}
            {activeTab === "overview" && (
              <div className="grid md:grid-cols-2 gap-8">
                {/* Stats Cards */}
                <div className="grid grid-cols-2 gap-4">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium text-muted-foreground">Avg. Alignment</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold">{userData.averageAlignment}%</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium text-muted-foreground">Sessions Done</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold">{userData.sessionsCompleted}</div>
                    </CardContent>
                  </Card>
                </div>

                {/* Category Performance */}
                <Card>
                  <CardHeader>
                    <CardTitle>Focus Area Performance</CardTitle>
                    <CardDescription>Your average alignment scores by area</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {userData.categoryPerformance.map((category) => (
                        <div key={category.category}>
                          <div className="flex justify-between mb-1">
                            <span className="text-sm font-medium">{category.category}</span>
                            <span className="text-sm font-medium">{category.score}%</span>
                          </div>
                          <div className="w-full bg-muted rounded-full h-2.5">
                            <div
                              className="bg-primary h-2.5 rounded-full"
                              style={{ width: `${category.score}%` }}
                            ></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Recent Sessions */}
                <Card className="md:col-span-2">
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <CardTitle>Recent Sessions</CardTitle>
                      <Link href="/profile/history">
                        <Button variant="ghost" size="sm" className="gap-1">
                          View All
                          <ArrowUpRight className="h-4 w-4" />
                        </Button>
                      </Link>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {userData.recentSessions.map((session) => (
                        <div key={session.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                          <div>
                            <p className="font-medium">{session.category}</p>
                            <p className="text-sm text-muted-foreground">
                              {new Date(session.date).toLocaleDateString("en-US", {
                                year: "numeric",
                                month: "short",
                                day: "numeric",
                              })}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="font-bold">{session.score}%</p>
                            <p className="text-sm text-muted-foreground">Alignment</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Badges */}
                <Card className="md:col-span-2">
                  <CardHeader>
                    <CardTitle>Achievements</CardTitle>
                    <CardDescription>Badges you've earned on your journey</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {userData.badges.map((badge) => (
                        <Badge key={badge} variant="secondary" className="px-3 py-1">
                          {badge}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
