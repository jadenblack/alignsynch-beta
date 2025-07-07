"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { ProjectCard } from "@/components/dashboard/project-card"
import { ProjectDetailModal } from "@/components/dashboard/project-detail-modal"
import {
  Brain,
  Search,
  GitPullRequest,
  CheckCircle,
  XCircle,
  Clock,
  AlertTriangle,
  TrendingUp,
  Filter,
  Plus,
} from "lucide-react"
import { mockProjects, workflowStats } from "@/lib/github-workflow-data"
import type { GitHubProject } from "@/lib/github-workflow-data"

export default function DashboardPage() {
  const [selectedProject, setSelectedProject] = useState<GitHubProject | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [priorityFilter, setPriorityFilter] = useState("all")
  const [typeFilter, setTypeFilter] = useState("all")

  const filteredProjects = useMemo(() => {
    return mockProjects.filter((project) => {
      const matchesSearch =
        project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.author.name.toLowerCase().includes(searchTerm.toLowerCase())

      const matchesStatus = statusFilter === "all" || project.status === statusFilter
      const matchesPriority = priorityFilter === "all" || project.priority === priorityFilter
      const matchesType = typeFilter === "all" || project.type === typeFilter

      return matchesSearch && matchesStatus && matchesPriority && matchesType
    })
  }, [searchTerm, statusFilter, priorityFilter, typeFilter])

  const statusCounts = useMemo(() => {
    return {
      pending: mockProjects.filter((p) => p.status === "pending").length,
      approved: mockProjects.filter((p) => p.status === "approved").length,
      rejected: mockProjects.filter((p) => p.status === "rejected").length,
      draft: mockProjects.filter((p) => p.status === "draft").length,
      merged: mockProjects.filter((p) => p.status === "merged").length,
    }
  }, [])

  const priorityCounts = useMemo(() => {
    return {
      critical: mockProjects.filter((p) => p.priority === "critical").length,
      high: mockProjects.filter((p) => p.priority === "high").length,
      medium: mockProjects.filter((p) => p.priority === "medium").length,
      low: mockProjects.filter((p) => p.priority === "low").length,
    }
  }, [])

  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b bg-white">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Link href="/">
              <div className="flex items-center gap-2">
                <Brain className="h-8 w-8 text-primary" />
                <h1 className="text-2xl font-bold">AlignSynch</h1>
              </div>
            </Link>
            <Badge variant="outline" className="ml-4">
              Project Dashboard
            </Badge>
          </div>
          <nav className="hidden md:flex gap-6">
            <Link href="/" className="font-medium hover:text-primary">
              Home
            </Link>
            <Link href="/categories" className="font-medium hover:text-primary">
              Categories
            </Link>
            <Link href="/leaderboard" className="font-medium hover:text-primary">
              Leaderboard
            </Link>
            <Link href="/profile" className="font-medium hover:text-primary">
              Profile
            </Link>
            <Link href="/dashboard" className="font-medium text-primary">
              Dashboard
            </Link>
          </nav>
          <div className="flex gap-2">
            <Button variant="outline" className="gap-2 bg-transparent">
              <Plus className="h-4 w-4" />
              New Project
            </Button>
            <Link href="/login">
              <Button variant="outline">Login</Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1 py-8 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold mb-2">GitHub Project Approval Dashboard</h1>
              <p className="text-muted-foreground">
                Manage content updates and track approval workflows across all AlignSynch projects
              </p>
            </div>

            {/* Stats Overview */}
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-8">
              <Card>
                <CardContent className="p-4 text-center">
                  <GitPullRequest className="h-6 w-6 text-blue-500 mx-auto mb-2" />
                  <div className="text-2xl font-bold">{workflowStats.totalProjects}</div>
                  <div className="text-xs text-muted-foreground">Total Projects</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <Clock className="h-6 w-6 text-yellow-500 mx-auto mb-2" />
                  <div className="text-2xl font-bold">{workflowStats.pendingApprovals}</div>
                  <div className="text-xs text-muted-foreground">Pending</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <CheckCircle className="h-6 w-6 text-green-500 mx-auto mb-2" />
                  <div className="text-2xl font-bold">{workflowStats.approvedToday}</div>
                  <div className="text-xs text-muted-foreground">Approved Today</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <XCircle className="h-6 w-6 text-red-500 mx-auto mb-2" />
                  <div className="text-2xl font-bold">{workflowStats.rejectedThisWeek}</div>
                  <div className="text-xs text-muted-foreground">Rejected</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <TrendingUp className="h-6 w-6 text-purple-500 mx-auto mb-2" />
                  <div className="text-2xl font-bold">{workflowStats.averageApprovalTime}</div>
                  <div className="text-xs text-muted-foreground">Avg Approval</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <AlertTriangle className="h-6 w-6 text-orange-500 mx-auto mb-2" />
                  <div className="text-2xl font-bold">{workflowStats.criticalPending}</div>
                  <div className="text-xs text-muted-foreground">Critical</div>
                </CardContent>
              </Card>
            </div>

            {/* Filters and Search */}
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Filter className="h-5 w-5" />
                  Filters & Search
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search projects..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-sm font-medium">Status</label>
                    <select
                      value={statusFilter}
                      onChange={(e) => setStatusFilter(e.target.value)}
                      className="w-full p-2 border rounded-md text-sm"
                    >
                      <option value="all">All Status ({mockProjects.length})</option>
                      <option value="pending">Pending ({statusCounts.pending})</option>
                      <option value="approved">Approved ({statusCounts.approved})</option>
                      <option value="rejected">Rejected ({statusCounts.rejected})</option>
                      <option value="draft">Draft ({statusCounts.draft})</option>
                      <option value="merged">Merged ({statusCounts.merged})</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-sm font-medium">Priority</label>
                    <select
                      value={priorityFilter}
                      onChange={(e) => setPriorityFilter(e.target.value)}
                      className="w-full p-2 border rounded-md text-sm"
                    >
                      <option value="all">All Priority</option>
                      <option value="critical">Critical ({priorityCounts.critical})</option>
                      <option value="high">High ({priorityCounts.high})</option>
                      <option value="medium">Medium ({priorityCounts.medium})</option>
                      <option value="low">Low ({priorityCounts.low})</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-sm font-medium">Type</label>
                    <select
                      value={typeFilter}
                      onChange={(e) => setTypeFilter(e.target.value)}
                      className="w-full p-2 border rounded-md text-sm"
                    >
                      <option value="all">All Types</option>
                      <option value="content">Content</option>
                      <option value="feature">Feature</option>
                      <option value="bugfix">Bug Fix</option>
                      <option value="design">Design</option>
                      <option value="documentation">Documentation</option>
                    </select>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Projects Grid */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">Projects ({filteredProjects.length})</h2>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    Sort by Date
                  </Button>
                  <Button variant="outline" size="sm">
                    Sort by Priority
                  </Button>
                </div>
              </div>

              {filteredProjects.length > 0 ? (
                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                  {filteredProjects.map((project) => (
                    <ProjectCard key={project.id} project={project} onViewDetails={setSelectedProject} />
                  ))}
                </div>
              ) : (
                <Card>
                  <CardContent className="p-12 text-center">
                    <GitPullRequest className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-medium mb-2">No projects found</h3>
                    <p className="text-muted-foreground mb-4">Try adjusting your search criteria or filters</p>
                    <Button
                      variant="outline"
                      onClick={() => {
                        setSearchTerm("")
                        setStatusFilter("all")
                        setPriorityFilter("all")
                        setTypeFilter("all")
                      }}
                    >
                      Clear Filters
                    </Button>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Project Detail Modal */}
      <ProjectDetailModal project={selectedProject} open={!!selectedProject} onClose={() => setSelectedProject(null)} />

      <footer className="bg-white border-t py-8">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Brain className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">AlignSynch</span>
          </div>
          <p className="text-muted-foreground text-sm">
            &copy; {new Date().getFullYear()} AlignSynch. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}
