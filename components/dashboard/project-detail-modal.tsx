"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import {
  CheckCircle,
  XCircle,
  Clock,
  GitCommit,
  FileText,
  MessageSquare,
  ExternalLink,
  Calendar,
  User,
  GitBranch,
  Plus,
  Minus,
  AlertTriangle,
} from "lucide-react"
import type { GitHubProject } from "@/lib/github-workflow-data"

interface ProjectDetailModalProps {
  project: GitHubProject | null
  open: boolean
  onClose: () => void
}

export function ProjectDetailModal({ project, open, onClose }: ProjectDetailModalProps) {
  const [activeTab, setActiveTab] = useState("overview")

  if (!project) return null

  const getStatusIcon = () => {
    switch (project.status) {
      case "approved":
        return <CheckCircle className="h-5 w-5 text-green-500" />
      case "rejected":
        return <XCircle className="h-5 w-5 text-red-500" />
      case "pending":
        return <Clock className="h-5 w-5 text-yellow-500" />
      default:
        return <FileText className="h-5 w-5 text-gray-500" />
    }
  }

  const getCheckIcon = (status: string) => {
    switch (status) {
      case "success":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "failure":
        return <XCircle className="h-4 w-4 text-red-500" />
      case "pending":
        return <Clock className="h-4 w-4 text-yellow-500" />
      default:
        return <AlertTriangle className="h-4 w-4 text-gray-500" />
    }
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-start gap-3">
            {getStatusIcon()}
            <div className="flex-1">
              <DialogTitle className="text-xl">{project.title}</DialogTitle>
              <DialogDescription className="mt-1">{project.description}</DialogDescription>
              <div className="flex items-center gap-4 mt-3 text-sm text-muted-foreground">
                <span className="font-mono">#{project.pullRequestNumber}</span>
                <span>{project.repository}</span>
                <span className="flex items-center gap-1">
                  <GitBranch className="h-3 w-3" />
                  {project.branch}
                </span>
              </div>
            </div>
          </div>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="content">Content Changes</TabsTrigger>
            <TabsTrigger value="files">Files</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
            <TabsTrigger value="checks">Checks</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Project Info */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Project Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Status</span>
                    <Badge
                      className={`capitalize ${
                        project.status === "approved"
                          ? "bg-green-100 text-green-800"
                          : project.status === "rejected"
                            ? "bg-red-100 text-red-800"
                            : project.status === "pending"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {project.status}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Priority</span>
                    <Badge variant="outline" className="capitalize">
                      {project.priority}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Type</span>
                    <Badge variant="secondary" className="capitalize">
                      {project.type}
                    </Badge>
                  </div>
                  <Separator />
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">Created {new Date(project.createdAt).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">Updated {new Date(project.updatedAt).toLocaleDateString()}</span>
                    </div>
                    {project.dueDate && (
                      <div className="flex items-center gap-2">
                        <AlertTriangle className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">Due {new Date(project.dueDate).toLocaleDateString()}</span>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Team */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Team</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <span className="text-sm font-medium mb-2 block">Author</span>
                    <div className="flex items-center gap-2">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={project.author.avatar || "/placeholder.svg"} />
                        <AvatarFallback>
                          {project.author.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium text-sm">{project.author.name}</div>
                        <div className="text-xs text-muted-foreground">@{project.author.username}</div>
                      </div>
                    </div>
                  </div>

                  {project.assignees.length > 0 && (
                    <div>
                      <span className="text-sm font-medium mb-2 block">Assignees</span>
                      <div className="space-y-2">
                        {project.assignees.map((assignee) => (
                          <div key={assignee.username} className="flex items-center gap-2">
                            <Avatar className="h-6 w-6">
                              <AvatarImage src={assignee.avatar || "/placeholder.svg"} />
                              <AvatarFallback className="text-xs">
                                {assignee.name
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            <span className="text-sm">{assignee.name}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Labels */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Labels</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {project.labels.map((label) => (
                    <Badge key={label} variant="outline">
                      {label}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="content" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Content Changes</CardTitle>
                <CardDescription>Review the proposed content modifications for this project</CardDescription>
              </CardHeader>
              <CardContent>
                {project.contentChanges.length > 0 ? (
                  <div className="space-y-4">
                    {project.contentChanges.map((change, index) => (
                      <div key={index} className="border rounded-lg p-4">
                        <div className="flex items-center justify-between mb-3">
                          <div>
                            <h4 className="font-medium">{change.pageName}</h4>
                            <p className="text-sm text-muted-foreground">{change.section}</p>
                          </div>
                          <Badge variant="outline" className="capitalize">
                            {change.changeType}
                          </Badge>
                        </div>

                        <div className="space-y-3">
                          <div>
                            <span className="text-sm font-medium text-red-600 mb-1 block">- Old Content</span>
                            <div className="bg-red-50 border border-red-200 rounded p-3 text-sm">
                              {change.oldContent}
                            </div>
                          </div>
                          <div>
                            <span className="text-sm font-medium text-green-600 mb-1 block">+ New Content</span>
                            <div className="bg-green-50 border border-green-200 rounded p-3 text-sm">
                              {change.newContent}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>No content changes detected for this project.</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="files" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Changed Files</CardTitle>
                <CardDescription>Files modified in this pull request</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {project.changedFiles.map((file, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-2 h-2 rounded-full ${
                            file.status === "added"
                              ? "bg-green-500"
                              : file.status === "modified"
                                ? "bg-yellow-500"
                                : "bg-red-500"
                          }`}
                        />
                        <span className="font-mono text-sm">{file.filename}</span>
                        <Badge variant="outline" className="text-xs capitalize">
                          {file.status}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-4 text-sm">
                        <span className="flex items-center gap-1 text-green-600">
                          <Plus className="h-3 w-3" />
                          {file.additions}
                        </span>
                        <span className="flex items-center gap-1 text-red-600">
                          <Minus className="h-3 w-3" />
                          {file.deletions}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Commits</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {project.commits.map((commit) => (
                    <div key={commit.sha} className="flex items-start gap-3 p-3 border rounded-lg">
                      <GitCommit className="h-4 w-4 mt-0.5 text-muted-foreground" />
                      <div className="flex-1">
                        <p className="text-sm font-medium">{commit.message}</p>
                        <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
                          <span>{commit.author}</span>
                          <span>•</span>
                          <span>{new Date(commit.date).toLocaleDateString()}</span>
                          <span>•</span>
                          <span className="font-mono">{commit.sha.substring(0, 7)}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reviews" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Code Reviews</CardTitle>
                <CardDescription>Review feedback and approval status</CardDescription>
              </CardHeader>
              <CardContent>
                {project.reviewers.length > 0 ? (
                  <div className="space-y-4">
                    {project.reviewers.map((reviewer) => (
                      <div key={reviewer.username} className="border rounded-lg p-4">
                        <div className="flex items-start gap-3">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={reviewer.avatar || "/placeholder.svg"} />
                            <AvatarFallback>
                              {reviewer.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="font-medium">{reviewer.name}</span>
                              <Badge
                                className={`text-xs ${
                                  reviewer.status === "approved"
                                    ? "bg-green-100 text-green-800"
                                    : reviewer.status === "rejected"
                                      ? "bg-red-100 text-red-800"
                                      : reviewer.status === "commented"
                                        ? "bg-blue-100 text-blue-800"
                                        : "bg-yellow-100 text-yellow-800"
                                }`}
                              >
                                {reviewer.status === "approved" && <CheckCircle className="h-3 w-3 mr-1" />}
                                {reviewer.status === "rejected" && <XCircle className="h-3 w-3 mr-1" />}
                                {reviewer.status === "commented" && <MessageSquare className="h-3 w-3 mr-1" />}
                                {reviewer.status === "pending" && <Clock className="h-3 w-3 mr-1" />}
                                {reviewer.status}
                              </Badge>
                            </div>
                            {reviewer.reviewedAt && (
                              <p className="text-xs text-muted-foreground mb-2">
                                Reviewed on {new Date(reviewer.reviewedAt).toLocaleDateString()}
                              </p>
                            )}
                            {reviewer.comment && (
                              <div className="bg-gray-50 border rounded p-3 text-sm">{reviewer.comment}</div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    <User className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>No reviewers assigned to this project.</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="checks" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Status Checks</CardTitle>
                <CardDescription>Automated checks and CI/CD pipeline status</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {project.checks.map((check, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-3">
                        {getCheckIcon(check.status)}
                        <span className="font-medium">{check.name}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge
                          variant="outline"
                          className={`text-xs ${
                            check.status === "success"
                              ? "border-green-200 text-green-800"
                              : check.status === "failure"
                                ? "border-red-200 text-red-800"
                                : "border-yellow-200 text-yellow-800"
                          }`}
                        >
                          {check.status}
                        </Badge>
                        {check.url && (
                          <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                            <ExternalLink className="h-3 w-3" />
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="flex justify-end gap-2 pt-4 border-t">
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
          <Button variant="outline" className="gap-2 bg-transparent">
            <ExternalLink className="h-4 w-4" />
            View on GitHub
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
