"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Copy, Download, RefreshCw } from "lucide-react"

interface LogsModalProps {
  open: boolean
  onClose: () => void
  stageName: string
  stageId: string
  logs: string[]
  isLive?: boolean
}

export function LogsModal({ open, onClose, stageName, stageId, logs, isLive = false }: LogsModalProps) {
  const [currentLogs, setCurrentLogs] = useState(logs)
  const [autoScroll, setAutoScroll] = useState(true)

  useEffect(() => {
    setCurrentLogs(logs)
  }, [logs])

  // Simulate live log updates for running stages
  useEffect(() => {
    if (!isLive || !open) return

    const interval = setInterval(() => {
      const newLogMessages = [
        "Processing deployment...",
        "Uploading assets to CDN...",
        "Configuring load balancer...",
        "Running health checks...",
        "Updating DNS records...",
        "Deployment verification in progress...",
      ]

      const randomMessage = newLogMessages[Math.floor(Math.random() * newLogMessages.length)]
      const timestamp = new Date().toISOString().substring(11, 19)

      setCurrentLogs((prev) => [...prev, `[${timestamp}] ${randomMessage}`])
    }, 2000)

    return () => clearInterval(interval)
  }, [isLive, open])

  const copyLogs = () => {
    navigator.clipboard.writeText(currentLogs.join("\n"))
  }

  const downloadLogs = () => {
    const blob = new Blob([currentLogs.join("\n")], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `${stageId}-logs.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[80vh]">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <div>
              <DialogTitle className="flex items-center gap-2">
                {stageName} - Logs
                {isLive && (
                  <Badge variant="outline" className="text-xs bg-green-50 text-green-700 border-green-200">
                    Live
                  </Badge>
                )}
              </DialogTitle>
              <DialogDescription>
                Stage ID: {stageId} • {currentLogs.length} log entries
              </DialogDescription>
            </div>
            <div className="flex items-center gap-2">
              {isLive && (
                <Button variant="ghost" size="sm" className="gap-1">
                  <RefreshCw className="h-3 w-3" />
                  Auto-refresh
                </Button>
              )}
              <Button variant="ghost" size="sm" onClick={copyLogs} className="gap-1">
                <Copy className="h-3 w-3" />
                Copy
              </Button>
              <Button variant="ghost" size="sm" onClick={downloadLogs} className="gap-1">
                <Download className="h-3 w-3" />
                Download
              </Button>
            </div>
          </div>
        </DialogHeader>

        <div className="flex-1">
          <ScrollArea className="h-[500px] w-full border rounded-md">
            <div className="p-4 font-mono text-sm space-y-1">
              {currentLogs.length > 0 ? (
                currentLogs.map((log, index) => (
                  <div
                    key={index}
                    className={`whitespace-pre-wrap ${
                      log.includes("✓") || log.includes("SUCCESS")
                        ? "text-green-600"
                        : log.includes("✗") || log.includes("ERROR") || log.includes("FAILED")
                          ? "text-red-600"
                          : log.includes("WARNING") || log.includes("⚠")
                            ? "text-yellow-600"
                            : "text-gray-700"
                    }`}
                  >
                    {log}
                  </div>
                ))
              ) : (
                <div className="text-muted-foreground text-center py-8">No logs available for this stage.</div>
              )}
              {isLive && (
                <div className="flex items-center gap-2 text-blue-600 animate-pulse">
                  <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                  <span>Streaming live logs...</span>
                </div>
              )}
            </div>
          </ScrollArea>
        </div>

        <div className="flex justify-between items-center pt-4 border-t">
          <div className="flex items-center gap-2">
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={autoScroll}
                onChange={(e) => setAutoScroll(e.target.checked)}
                className="rounded"
              />
              Auto-scroll to bottom
            </label>
          </div>
          <Button onClick={onClose}>Close</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
