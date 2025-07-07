"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  CheckCircle,
  XCircle,
  Clock,
  Play,
  Pause,
  RotateCcw,
  Download,
  ExternalLink,
  GitCommit,
  Timer,
  AlertTriangle,
} from "lucide-react"
import type { PipelineRun } from "@/lib/cicd-data"

interface PipelineStatusProps {
  pipelineRun: PipelineRun
  onViewLogs: (stageId: string) => void
  onDownloadArtifact: (artifactName: string) => void
  onTriggerRollback?: () => void
}

export function PipelineStatus({
  pipelineRun,
  onViewLogs,
  onDownloadArtifact,
  onTriggerRollback,
}: PipelineStatusProps) {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "success":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "failure":
        return <XCircle className="h-4 w-4 text-red-500" />
      case "running":
        return <Play className="h-4 w-4 text-blue-500 animate-pulse" />
      case "pending":
        return <Clock className="h-4 w-4 text-yellow-500" />
      case "cancelled":
        return <Pause className="h-4 w-4 text-gray-500" />
      default:
        return <Clock className="h-4 w-4 text-gray-500" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "success":
        return "bg-green-100 text-green-800 border-green-200"
      case "failure":
        return "bg-red-100 text-red-800 border-red-200"
      case "running":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "cancelled":
        return "bg-gray-100 text-gray-800 border-gray-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const formatDuration = (seconds?: number) => {
    if (!seconds) return "0s"
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return minutes > 0 ? `${minutes}m ${remainingSeconds}s` : `${remainingSeconds}s`
  }

  const completedStages = pipelineRun.stages.filter((stage) => stage.status === "success").length
  const totalStages = pipelineRun.stages.length
  const progress = (completedStages / totalStages) * 100

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <div className="flex items-center gap-2">
                {getStatusIcon(pipelineRun.status)}
                <CardTitle className="text-lg">Pipeline Run #{pipelineRun.runNumber}</CardTitle>
              </div>
              <Badge className={`${getStatusColor(pipelineRun.status)} text-xs capitalize`}>{pipelineRun.status}</Badge>
              <Badge variant="outline" className="text-xs">
                v{pipelineRun.version}
              </Badge>
            </div>
            <CardDescription className="flex items-center gap-4 text-sm">
              <span className="flex items-center gap-1">
                <GitCommit className="h-3 w-3" />
                {pipelineRun.commitSha.substring(0, 8)}
              </span>
              <span>{pipelineRun.commitMessage}</span>
              <span className="flex items-center gap-1">
                <Timer className="h-3 w-3" />
                {formatDuration(pipelineRun.duration)}
              </span>
            </CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <Avatar className="h-8 w-8">
              <AvatarImage src={pipelineRun.author.avatar || "/placeholder.svg"} />
              <AvatarFallback className="text-xs">
                {pipelineRun.author.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div className="text-right">
              <div className="text-sm font-medium">{pipelineRun.author.name}</div>
              <div className="text-xs text-muted-foreground">{pipelineRun.branch}</div>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mt-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">Progress</span>
            <span className="text-sm text-muted-foreground">
              {completedStages}/{totalStages} stages completed
            </span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Pipeline Stages */}
        <div>
          <h4 className="font-medium mb-3">Pipeline Stages</h4>
          <div className="space-y-2">
            {pipelineRun.stages.map((stage, index) => (
              <div key={stage.id} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-6 h-6 rounded-full bg-gray-100 text-xs font-medium">
                    {index + 1}
                  </div>
                  {getStatusIcon(stage.status)}
                  <div>
                    <div className="font-medium text-sm">{stage.name}</div>
                    {stage.duration && (
                      <div className="text-xs text-muted-foreground">Duration: {formatDuration(stage.duration)}</div>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge className={`${getStatusColor(stage.status)} text-xs capitalize`}>{stage.status}</Badge>
                  {stage.logs && stage.logs.length > 0 && (
                    <Button variant="ghost" size="sm" onClick={() => onViewLogs(stage.id)} className="h-6 text-xs">
                      View Logs
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Test Results */}
        {pipelineRun.tests.length > 0 && (
          <div>
            <h4 className="font-medium mb-3">Test Results</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {pipelineRun.tests.map((test) => (
                <div key={test.id} className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      {getStatusIcon(test.status)}
                      <span className="font-medium text-sm">{test.name}</span>
                    </div>
                    <Badge variant="outline" className="text-xs capitalize">
                      {test.type}
                    </Badge>
                  </div>
                  <div className="space-y-1 text-sm text-muted-foreground">
                    <div className="flex justify-between">
                      <span>Passed:</span>
                      <span className="text-green-600 font-medium">{test.passedTests}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Failed:</span>
                      <span className={`font-medium ${test.failedTests > 0 ? "text-red-600" : "text-gray-600"}`}>
                        {test.failedTests}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Total:</span>
                      <span className="font-medium">{test.totalTests}</span>
                    </div>
                    {test.coverage && (
                      <div className="flex justify-between">
                        <span>Coverage:</span>
                        <span className="font-medium">{test.coverage}%</span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span>Duration:</span>
                      <span className="font-medium">{formatDuration(test.duration)}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Deployments */}
        {pipelineRun.deployments.length > 0 && (
          <div>
            <h4 className="font-medium mb-3">Deployments</h4>
            <div className="space-y-3">
              {pipelineRun.deployments.map((deployment) => (
                <div key={deployment.id} className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      {getStatusIcon(deployment.status)}
                      <span className="font-medium text-sm capitalize">{deployment.environment}</span>
                      <Badge variant="outline" className="text-xs">
                        v{deployment.version}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2">
                      {deployment.url && (
                        <Button variant="ghost" size="sm" className="h-6 text-xs gap-1">
                          <ExternalLink className="h-3 w-3" />
                          Visit
                        </Button>
                      )}
                      {deployment.status === "failure" && onTriggerRollback && (
                        <Button variant="ghost" size="sm" onClick={onTriggerRollback} className="h-6 text-xs gap-1">
                          <RotateCcw className="h-3 w-3" />
                          Rollback
                        </Button>
                      )}
                    </div>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    <div>Author: {deployment.author}</div>
                    <div>Started: {new Date(deployment.startTime).toLocaleString()}</div>
                    {deployment.duration && <div>Duration: {formatDuration(deployment.duration)}</div>}
                    {deployment.rollbackReason && (
                      <div className="flex items-center gap-1 text-red-600 mt-1">
                        <AlertTriangle className="h-3 w-3" />
                        Rollback reason: {deployment.rollbackReason}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Artifacts */}
        {pipelineRun.artifacts.length > 0 && (
          <div>
            <h4 className="font-medium mb-3">Artifacts</h4>
            <div className="space-y-2">
              {pipelineRun.artifacts.map((artifact) => (
                <div key={artifact.name} className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <div className="font-medium text-sm">{artifact.name}</div>
                    <div className="text-xs text-muted-foreground">{artifact.size}</div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onDownloadArtifact(artifact.name)}
                    className="h-6 text-xs gap-1"
                  >
                    <Download className="h-3 w-3" />
                    Download
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
