"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import {
  Clock,
  GitPullRequest,
  CheckCircle,
  XCircle,
  AlertCircle,
  FileText,
  Users,
  Calendar,
  ExternalLink,
} from "lucide-react"
import type { GitHubProject } from "@/lib/github-workflow-data"

interface ProjectCardProps {
  project: GitHubProject
  onViewDetails: (project: GitHubProject) => void
}

export function ProjectCard({ project, onViewDetails }: ProjectCardProps) {
  const getStatusIcon = () => {
    switch (project.status) {
      case "approved":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "rejected":
        return <XCircle className="h-4 w-4 text-red-500" />
      case "pending":
        return <Clock className="h-4 w-4 text-yellow-500" />
      case "draft":
        return <FileText className="h-4 w-4 text-gray-500" />
      case "merged":
        return <CheckCircle className="h-4 w-4 text-blue-500" />
      default:
        return <AlertCircle className="h-4 w-4 text-gray-500" />
    }
  }

  const getStatusColor = () => {
    switch (project.status) {
      case "approved":
        return "bg-green-100 text-green-800 border-green-200"
      case "rejected":
        return "bg-red-100 text-red-800 border-red-200"
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "draft":
        return "bg-gray-100 text-gray-800 border-gray-200"
      case "merged":
        return "bg-blue-100 text-blue-800 border-blue-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getPriorityColor = () => {
    switch (project.priority) {
      case "critical":
        return "bg-red-100 text-red-800 border-red-200"
      case "high":
        return "bg-orange-100 text-orange-800 border-orange-200"
      case "medium":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "low":
        return "bg-gray-100 text-gray-800 border-gray-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const approvedReviewers = project.reviewers.filter((r) => r.status === "approved").length
  const totalReviewers = project.reviewers.length
  const approvalProgress = totalReviewers > 0 ? (approvedReviewers / totalReviewers) * 100 : 0

  const isOverdue = project.dueDate && new Date(project.dueDate) < new Date()

  return (
    <Card className={`hover:shadow-md transition-shadow ${isOverdue ? "border-red-200" : ""}`}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <GitPullRequest className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-mono text-muted-foreground">#{project.pullRequestNumber}</span>
              <Badge className={`${getStatusColor()} text-xs`}>
                {getStatusIcon()}
                <span className="ml-1 capitalize">{project.status}</span>
              </Badge>
              <Badge className={`${getPriorityColor()} text-xs capitalize`}>{project.priority}</Badge>
            </div>
            <CardTitle className="text-lg leading-tight">{project.title}</CardTitle>
            <CardDescription className="mt-1">{project.description}</CardDescription>
          </div>
        </div>

        <div className="flex items-center gap-4 mt-3 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Avatar className="h-5 w-5">
              <AvatarImage src={project.author.avatar || "/placeholder.svg"} />
              <AvatarFallback className="text-xs">
                {project.author.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <span>{project.author.name}</span>
          </div>
          <div className="flex items-center gap-1">
            <Calendar className="h-3 w-3" />
            <span>{new Date(project.createdAt).toLocaleDateString()}</span>
          </div>
          {project.dueDate && (
            <div className={`flex items-center gap-1 ${isOverdue ? "text-red-600" : ""}`}>
              <Clock className="h-3 w-3" />
              <span>Due {new Date(project.dueDate).toLocaleDateString()}</span>
            </div>
          )}
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        {/* Approval Progress */}
        {totalReviewers > 0 && (
          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">Approval Progress</span>
              <span className="text-sm text-muted-foreground">
                {approvedReviewers}/{totalReviewers} approved
              </span>
            </div>
            <Progress value={approvalProgress} className="h-2" />
          </div>
        )}

        {/* Reviewers */}
        {project.reviewers.length > 0 && (
          <div className="mb-4">
            <div className="flex items-center gap-2 mb-2">
              <Users className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium">Reviewers</span>
            </div>
            <div className="flex items-center gap-2">
              {project.reviewers.map((reviewer) => (
                <div key={reviewer.username} className="flex items-center gap-1">
                  <Avatar className="h-6 w-6">
                    <AvatarImage src={reviewer.avatar || "/placeholder.svg"} />
                    <AvatarFallback className="text-xs">
                      {reviewer.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex items-center">
                    {reviewer.status === "approved" && <CheckCircle className="h-3 w-3 text-green-500" />}
                    {reviewer.status === "rejected" && <XCircle className="h-3 w-3 text-red-500" />}
                    {reviewer.status === "pending" && <Clock className="h-3 w-3 text-yellow-500" />}
                    {reviewer.status === "commented" && <AlertCircle className="h-3 w-3 text-blue-500" />}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Labels */}
        <div className="flex flex-wrap gap-1 mb-4">
          {project.labels.map((label) => (
            <Badge key={label} variant="outline" className="text-xs">
              {label}
            </Badge>
          ))}
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={() => onViewDetails(project)} className="flex-1">
            View Details
          </Button>
          <Button variant="ghost" size="sm" className="gap-1">
            <ExternalLink className="h-3 w-3" />
            GitHub
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
