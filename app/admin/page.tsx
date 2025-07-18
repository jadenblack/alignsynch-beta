"use client"

import { useState } from "react"
import { DirectoryHeader } from "@/components/admin/directory-header"
import { DirectorySection } from "@/components/admin/directory-section"
import { DeploymentChecklist } from "@/components/admin/deployment-checklist"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { adminDirectoryData } from "@/lib/admin-directory-data"
import { Search, Filter, Download, RefreshCw, Settings } from "lucide-react"

export default function AdminDirectoryPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedFilter, setSelectedFilter] = useState("all")
  const [isRefreshing, setIsRefreshing] = useState(false)

  const handleRefresh = async () => {
    setIsRefreshing(true)
    // Simulate refresh
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setIsRefreshing(false)
  }

  const filteredSections = adminDirectoryData.filter((section) => {
    if (selectedFilter === "critical") return section.criticalPath
    if (selectedFilter === "incomplete") return section.completedItems < section.totalItems
    return true
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">
      <div className="container mx-auto px-4 py-8 space-y-8">
        <DirectoryHeader />

        {/* Controls */}
        <div className="flex items-center justify-between gap-4 p-4 bg-muted/30 rounded-xl">
          <div className="flex items-center gap-4 flex-1">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search files, components, or features..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-muted-foreground" />
              <div className="flex gap-1">
                {[
                  { id: "all", label: "All" },
                  { id: "critical", label: "Critical" },
                  { id: "incomplete", label: "Incomplete" },
                ].map((filter) => (
                  <Button
                    key={filter.id}
                    size="sm"
                    variant={selectedFilter === filter.id ? "default" : "outline"}
                    onClick={() => setSelectedFilter(filter.id)}
                    className="h-8"
                  >
                    {filter.label}
                  </Button>
                ))}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button
              size="sm"
              variant="outline"
              onClick={handleRefresh}
              disabled={isRefreshing}
              className="h-8 bg-transparent"
            >
              <RefreshCw className={`w-4 h-4 mr-1 ${isRefreshing ? "animate-spin" : ""}`} />
              Refresh
            </Button>
            <Button size="sm" variant="outline" className="h-8 bg-transparent">
              <Download className="w-4 h-4 mr-1" />
              Export
            </Button>
            <Button size="sm" variant="outline" className="h-8 bg-transparent">
              <Settings className="w-4 h-4 mr-1" />
              Settings
            </Button>
          </div>
        </div>

        {/* Main Content */}
        <div className="space-y-6">
          {filteredSections.map((section) => (
            <DirectorySection key={section.id} section={section} />
          ))}
        </div>

        <DeploymentChecklist />
      </div>
    </div>
  )
}
