"use client"

import { useSession } from "next-auth/react"
import { redirect } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DashboardLayout } from "@/components/admin/dashboard-layout"
import { ErrorBoundary } from "@/components/ui/error-boundary"
import { useDashboardStore } from "@/lib/store"
import { Users, Activity, DollarSign, TrendingUp, CheckCircle, AlertCircle, XCircle } from "lucide-react"

export default function AdminDashboardPage() {
  const { data: session, status } = useSession()
  const { analytics } = useDashboardStore()

  if (status === "loading") {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      </DashboardLayout>
    )
  }

  if (!session) {
    redirect("/auth/signin")
  }

  const stats = [
    {
      title: "Total Users",
      value: analytics.totalUsers.toLocaleString(),
      change: "+12%",
      changeType: "positive" as const,
      icon: Users,
    },
    {
      title: "Active Users",
      value: analytics.activeUsers.toLocaleString(),
      change: "+8%",
      changeType: "positive" as const,
      icon: Activity,
    },
    {
      title: "Revenue",
      value: `$${analytics.totalRevenue.toLocaleString()}`,
      change: "+23%",
      changeType: "positive" as const,
      icon: DollarSign,
    },
    {
      title: "Conversion Rate",
      value: `${analytics.conversionRate}%`,
      change: "-2%",
      changeType: "negative" as const,
      icon: TrendingUp,
    },
  ]

  const recentActivity = [
    {
      id: 1,
      type: "user_signup",
      message: "New user registered: john.doe@example.com",
      timestamp: "2 minutes ago",
      status: "success",
    },
    {
      id: 2,
      type: "system_update",
      message: "System backup completed successfully",
      timestamp: "1 hour ago",
      status: "success",
    },
    {
      id: 3,
      type: "error",
      message: "Failed to send notification email",
      timestamp: "2 hours ago",
      status: "error",
    },
    {
      id: 4,
      type: "user_action",
      message: "User updated profile settings",
      timestamp: "3 hours ago",
      status: "info",
    },
  ]

  const systemStatus = [
    { name: "API Server", status: "operational", uptime: "99.9%" },
    { name: "Database", status: "operational", uptime: "99.8%" },
    { name: "CDN", status: "degraded", uptime: "98.2%" },
    { name: "Email Service", status: "operational", uptime: "99.5%" },
  ]

  return (
    <ErrorBoundary>
      <DashboardLayout>
        <div className="space-y-6">
          {/* Header */}
          <div>
            <h1 className="text-3xl font-bold">Dashboard</h1>
            <p className="text-muted-foreground">
              Welcome back, {session.user?.name}. Here's what's happening with your system.
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat) => (
              <Card key={stat.title}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                  <stat.icon className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <p className="text-xs text-muted-foreground">
                    <span className={stat.changeType === "positive" ? "text-green-600" : "text-red-600"}>
                      {stat.change}
                    </span>{" "}
                    from last month
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Main Content */}
          <div className="grid gap-6 lg:grid-cols-3">
            {/* Recent Activity */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                  <CardDescription>Latest system events and user actions</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentActivity.map((activity) => (
                      <div key={activity.id} className="flex items-start gap-3">
                        <div className="mt-1">
                          {activity.status === "success" && <CheckCircle className="h-4 w-4 text-green-600" />}
                          {activity.status === "error" && <XCircle className="h-4 w-4 text-red-600" />}
                          {activity.status === "info" && <AlertCircle className="h-4 w-4 text-blue-600" />}
                        </div>
                        <div className="flex-1 space-y-1">
                          <p className="text-sm">{activity.message}</p>
                          <p className="text-xs text-muted-foreground">{activity.timestamp}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* System Status */}
            <div>
              <Card>
                <CardHeader>
                  <CardTitle>System Status</CardTitle>
                  <CardDescription>Current status of all services</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {systemStatus.map((service) => (
                      <div key={service.name} className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium">{service.name}</p>
                          <p className="text-xs text-muted-foreground">Uptime: {service.uptime}</p>
                        </div>
                        <Badge
                          variant={
                            service.status === "operational"
                              ? "default"
                              : service.status === "degraded"
                                ? "secondary"
                                : "destructive"
                          }
                        >
                          {service.status}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Analytics Tabs */}
          <Card>
            <CardHeader>
              <CardTitle>Analytics Overview</CardTitle>
              <CardDescription>Detailed insights into your system performance</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="users" className="space-y-4">
                <TabsList>
                  <TabsTrigger value="users">Users</TabsTrigger>
                  <TabsTrigger value="revenue">Revenue</TabsTrigger>
                  <TabsTrigger value="performance">Performance</TabsTrigger>
                </TabsList>
                <TabsContent value="users" className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-base">User Growth</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">+{analytics.activeUsers}</div>
                        <p className="text-xs text-muted-foreground">Active users this month</p>
                        <Progress value={75} className="mt-2" />
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-base">User Retention</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">87%</div>
                        <p className="text-xs text-muted-foreground">7-day retention rate</p>
                        <Progress value={87} className="mt-2" />
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>
                <TabsContent value="revenue" className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-base">Monthly Revenue</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">${analytics.totalRevenue.toLocaleString()}</div>
                        <p className="text-xs text-muted-foreground">+23% from last month</p>
                        <Progress value={85} className="mt-2" />
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-base">Conversion Rate</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">{analytics.conversionRate}%</div>
                        <p className="text-xs text-muted-foreground">-2% from last month</p>
                        <Progress value={analytics.conversionRate * 8} className="mt-2" />
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>
                <TabsContent value="performance" className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-base">Response Time</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">245ms</div>
                        <p className="text-xs text-muted-foreground">Average API response time</p>
                        <Progress value={65} className="mt-2" />
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-base">Uptime</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">99.9%</div>
                        <p className="text-xs text-muted-foreground">System uptime this month</p>
                        <Progress value={99.9} className="mt-2" />
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </DashboardLayout>
    </ErrorBoundary>
  )
}
