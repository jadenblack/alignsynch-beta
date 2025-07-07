"use client"

import { useState, useEffect } from "react"
import { mockPipelineRuns } from "@/lib/cicd-data"
import type { PipelineRun } from "@/lib/cicd-data"

export default function CICDPage() {
  const [selectedPipeline, setSelectedPipeline] = useState<PipelineRun | null>(null)
  const [logsModal, setLogsModal] = useState<{
    open: boolean
    stageName: string
    stageId: string
    logs: string[]
    isLive: boolean
  }>({
    open: false,
    stageName: "",
    stageId: "",
    logs: [],
    isLive: false,
  })
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [autoRefresh, setAutoRefresh] = useState(true)

  // Auto-refresh pipeline data every 30 seconds
  useEffect(() => {
    if (!autoRefresh) return

    const interval = setInterval(() => {
      // In a real app, this would fetch fresh data from the API
      console.log("Refreshing pipeline data...")
    }, 30000)

    return () => clearInterval(interval)
  }, [autoRefresh])

  const filteredPipelines = mockPipelineRuns.filter((pipeline) => {
    const matchesSearch =
      pipeline.commitMessage.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pipeline.author.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pipeline.version.includes(searchTerm)

    const matchesStatus = statusFilter === "all" || pipeline.status === statusFilter

    return matchesSearch && matchesStatus
  })

  const handleViewLogs = (stageId: string) => {
    const pipeline = selectedPipeline || mockPipelineRuns[0]
    const stage = pipeline.stages.find((stage) => stage.id === stageId)
    if (stage) {
      setLogsModal({
        open: true,
        stageName: stage.name,
        stageId: stage.id,
        logs: stage.logs,
        isLive: stage.isLive,
      })
    }
  }

  // Additional code can be added here if needed
}
