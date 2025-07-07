import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { deploymentChecklist } from "@/lib/admin-directory-data"
import { CheckCircle, Clock, AlertTriangle, Play, RefreshCw } from "lucide-react"

export function DeploymentChecklist() {
  const completedItems = deploymentChecklist.filter((item) => item.status === "complete").length
  const totalItems = deploymentChecklist.length
  const completionPercentage = Math.round((completedItems / totalItems) * 100)
  const criticalIncomplete = deploymentChecklist.filter((item) => item.critical && item.status !== "complete").length

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "complete":
        return <CheckCircle className="w-5 h-5 text-primary" />
      case "in-progress":
        return <RefreshCw className="w-5 h-5 text-accent animate-spin" />
      case "pending":
        return <Clock className="w-5 h-5 text-muted-foreground" />
      default:
        return <AlertTriangle className="w-5 h-5 text-warning" />
    }
  }

  const getStatusBadge = (status: string, critical: boolean) => {
    const baseVariant = status === "complete" ? "default" : status === "in-progress" ? "secondary" : "outline"

    return (
      <Badge variant={baseVariant} className={critical ? "border-accent" : ""}>
        {status} {critical && "⚡"}
      </Badge>
    )
  }

  return (
    <Card className="connection-card">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              Deployment Readiness Checklist
              {criticalIncomplete > 0 && <Badge variant="destructive">{criticalIncomplete} Critical Pending</Badge>}
            </CardTitle>
            <CardDescription>Pre-deployment validation and testing requirements</CardDescription>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-primary">
              {completedItems}/{totalItems}
            </div>
            <div className="text-sm text-muted-foreground">{completionPercentage}% Complete</div>
          </div>
        </div>
        <Progress value={completionPercentage} className="emotional-progress" />
      </CardHeader>

      <CardContent>
        <div className="space-y-4">
          {deploymentChecklist.map((item) => (
            <div
              key={item.id}
              className={`flex items-center justify-between p-4 rounded-lg border transition-colors ${
                item.status === "complete"
                  ? "bg-primary/5 border-primary/20"
                  : item.critical
                    ? "bg-accent/5 border-accent/20"
                    : "bg-muted/30"
              }`}
            >
              <div className="flex items-center gap-4">
                {getStatusIcon(item.status)}
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-medium">{item.name}</h4>
                    {getStatusBadge(item.status, item.critical)}
                  </div>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {item.status !== "complete" && (
                  <Button size="sm" variant="outline" className="h-8 bg-transparent">
                    <Play className="w-4 h-4 mr-1" />
                    Run Check
                  </Button>
                )}
                {item.status === "complete" && (
                  <Button size="sm" variant="ghost" className="h-8">
                    <RefreshCw className="w-4 h-4 mr-1" />
                    Re-run
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 p-4 bg-gradient-to-r from-primary/10 to-accent/10 rounded-lg border border-primary/20">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-primary">Ready for Deployment?</h4>
              <p className="text-sm text-muted-foreground">
                {criticalIncomplete === 0
                  ? "All critical checks passed. System ready for testing deployment."
                  : `${criticalIncomplete} critical items must be completed before deployment.`}
              </p>
            </div>
            <Button className="collaborative-button" disabled={criticalIncomplete > 0}>
              {criticalIncomplete === 0 ? "Deploy to Testing" : "Complete Critical Items"}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
