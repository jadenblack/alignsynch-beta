import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { systemHealthMetrics } from "@/lib/admin-directory-data"
import { Activity, CheckCircle, Clock, Zap, Shield } from "lucide-react"

export function DirectoryHeader() {
  const {
    overallHealth,
    criticalPathCompletion,
    testCoverage,
    accessibilityScore,
    performanceAverage,
    totalFiles,
    completedFiles,
    pendingFiles,
    errorFiles,
    lastFullScan,
  } = systemHealthMetrics

  return (
    <div className="space-y-6">
      {/* Hero Section */}
      <div className="connection-card p-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-hero bg-gradient-to-r from-primary via-accent to-collaboration bg-clip-text text-transparent">
              AlignSynch Admin Directory
            </h1>
            <p className="text-warmth text-muted-foreground mt-2">
              Comprehensive system overview and deployment readiness dashboard
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Badge variant="outline" className="empathy-badge">
              <Activity className="w-4 h-4 mr-1" />
              Live System
            </Badge>
            <Button className="collaborative-button">Deploy to Testing</Button>
          </div>
        </div>

        {/* System Health Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card className="warmth-glow">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Overall Health</p>
                  <p className="text-2xl font-bold text-primary">{overallHealth}%</p>
                </div>
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-primary" />
                </div>
              </div>
              <Progress value={overallHealth} className="mt-2 emotional-progress" />
            </CardContent>
          </Card>

          <Card className="warmth-glow">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Critical Path</p>
                  <p className="text-2xl font-bold text-accent">{criticalPathCompletion}%</p>
                </div>
                <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center">
                  <Zap className="w-6 h-6 text-accent" />
                </div>
              </div>
              <Progress value={criticalPathCompletion} className="mt-2 emotional-progress" />
            </CardContent>
          </Card>

          <Card className="warmth-glow">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Accessibility</p>
                  <p className="text-2xl font-bold text-connection">{accessibilityScore}%</p>
                </div>
                <div className="w-12 h-12 rounded-full bg-connection/10 flex items-center justify-center">
                  <Shield className="w-6 h-6 text-connection" />
                </div>
              </div>
              <Progress value={accessibilityScore} className="mt-2 emotional-progress" />
            </CardContent>
          </Card>

          <Card className="warmth-glow">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Performance</p>
                  <p className="text-2xl font-bold text-growth">{performanceAverage}%</p>
                </div>
                <div className="w-12 h-12 rounded-full bg-growth/10 flex items-center justify-center">
                  <Activity className="w-6 h-6 text-growth" />
                </div>
              </div>
              <Progress value={performanceAverage} className="mt-2 emotional-progress" />
            </CardContent>
          </Card>
        </div>

        {/* File Status Summary */}
        <div className="flex items-center justify-between p-4 bg-muted/30 rounded-xl">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-primary"></div>
              <span className="text-sm font-medium">{completedFiles} Complete</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-accent"></div>
              <span className="text-sm font-medium">{pendingFiles} Pending</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-destructive"></div>
              <span className="text-sm font-medium">{errorFiles} Errors</span>
            </div>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Clock className="w-4 h-4" />
            Last scan: {lastFullScan.toLocaleString()}
          </div>
        </div>
      </div>
    </div>
  )
}
