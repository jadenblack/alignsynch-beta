"use client"

import { useEffect } from "react"
import { DashboardLayout } from "@/components/admin/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { useAnalyticsStore } from "@/lib/store"
import { Users, FileText, BarChart3, TrendingUp, Activity, Clock, AlertCircle, CheckCircle } from "lucide-react"

// Dashboard metrics component
function MetricsCards() {
  const { metrics } = useAnalyticsStore()

  const metricsData = [
    {
      title: "Total Users",
      value: metrics.totalUsers.toLocaleString(),
      change: "+12%",
      changeType: "positive" as const,
      icon: Users,
      description: "Active user accounts",
    },
    {
      title: "Active Users",
      value: metrics.activeUsers.toLocaleString(),
      change: "+8%",
      changeType: "positive" as const,
      icon: Activity,
      description: "Users active in last 30 days",
    },
    {
      title: "Total Content",
      value: metrics.totalContent.toLocaleString(),
      change: "+23%",
      changeType: "positive" as const,
      icon: FileText,
      description: "Published content items",
    },
    {
      title: "Conversion Rate",
      value: "3.2%",
      change: "-0.5%",
      changeType: "negative" as const,
      icon: TrendingUp,
      description: "Visitor to user conversion",
    },
  ]

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {metricsData.map((metric, index) => (
        <Card key={index}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{metric.title}</CardTitle>
            <metric.icon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metric.value}</div>
            <div className="flex items-center space-x-2 text-xs text-muted-foreground">
              <Badge variant={metric.changeType === "positive" ? "default" : "destructive"} className="text-xs">
                {metric.change}
              </Badge>
              <span>{metric.description}</span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

// Recent activity component
function RecentActivity() {
  const { metrics } = useAnalyticsStore()

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Clock className="h-5 w-5" />
          Recent Activity
        </CardTitle>
        <CardDescription>Latest system activities and user actions</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {metrics.recentActivity.map((activity) => (
            <div key={activity.id} className="flex items-center space-x-4">
              <div className="flex-shrink-0">
                {activity.type === "user_login" ? (
                  <CheckCircle className="h-4 w-4 text-green-500" />
                ) : (
                  <AlertCircle className="h-4 w-4 text-blue-500" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium">{activity.message}</p>
                <p className="text-xs text-muted-foreground">{activity.user}</p>
              </div>
              <div className="text-xs text-muted-foreground">{new Date(activity.timestamp).toLocaleTimeString()}</div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

// System status component
function SystemStatus() {
  const systemMetrics = [
    { name: "API Response Time", value: 245, max: 1000, unit: "ms", status: "good" },
    { name: "Database Performance", value: 78, max: 100, unit: "%", status: "good" },
    { name: "Memory Usage", value: 65, max: 100, unit: "%", status: "warning" },
    { name: "Storage Usage", value: 42, max: 100, unit: "%", status: "good" },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BarChart3 className="h-5 w-5" />
          System Status
        </CardTitle>
        <CardDescription>Real-time system performance metrics</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {systemMetrics.map((metric, index) => (
            <div key={index} className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="font-medium">{metric.name}</span>
                <span className="text-muted-foreground">
                  {metric.value}
                  {metric.unit}
                </span>
              </div>
              <Progress value={(metric.value / metric.max) * 100} className="h-2" />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

export default function AdminDashboardPage() {
  const { updateMetrics } = useAnalyticsStore()

  // Simulate real-time data updates
  useEffect(() => {
    const interval = setInterval(() => {
      updateMetrics({
        activeUsers: Math.floor(Math.random() * 20) + 80,
        totalUsers: 1247 + Math.floor(Math.random() * 10),
      })
    }, 30000) // Update every 30 seconds

    return () => clearInterval(interval)
  }, [updateMetrics])

  return (
    <DashboardLayout
      title="Dashboard Overview"
      breadcrumbs={[{ label: "Admin", href: "/admin" }, { label: "Dashboard" }]}
    >
      <div className="space-y-6">
        {/* Metrics Cards */}
        <MetricsCards />

        {/* Main Content Grid */}
        <div className="grid gap-6 md:grid-cols-2">
          <RecentActivity />
          <SystemStatus />
        </div>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common administrative tasks</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              <Button variant="outline" size="sm">
                <Users className="h-4 w-4 mr-2" />
                Manage Users
              </Button>
              <Button variant="outline" size="sm">
                <FileText className="h-4 w-4 mr-2" />
                Create Content
              </Button>
              <Button variant="outline" size="sm">
                <BarChart3 className="h-4 w-4 mr-2" />
                View Reports
              </Button>
              <Button variant="outline" size="sm">
                <AlertCircle className="h-4 w-4 mr-2" />
                System Alerts
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
