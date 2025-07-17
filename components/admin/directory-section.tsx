"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import type { DirectorySection as DirectorySectionType, DirectoryItem } from "@/lib/admin-directory-data"
import {
  ChevronDown,
  ChevronRight,
  FileText,
  Component,
  Server,
  Settings,
  ImageIcon,
  CheckCircle,
  Clock,
  AlertTriangle,
  XCircle,
  ExternalLink,
  Eye,
  TestTube,
} from "lucide-react"

interface DirectorySectionProps {
  section: DirectorySectionType
}

export function DirectorySection({ section }: DirectorySectionProps) {
  const [isOpen, setIsOpen] = useState(section.criticalPath)
  const completionPercentage = Math.round((section.completedItems / section.totalItems) * 100)

  const getTypeIcon = (type: DirectoryItem["type"]) => {
    switch (type) {
      case "page":
        return <FileText className="w-4 h-4" />
      case "component":
        return <Component className="w-4 h-4" />
      case "api":
        return <Server className="w-4 h-4" />
      case "config":
        return <Settings className="w-4 h-4" />
      case "asset":
        return <ImageIcon className="w-4 h-4" />
      default:
        return <FileText className="w-4 h-4" />
    }
  }

  const getStatusIcon = (status: DirectoryItem["status"]) => {
    switch (status) {
      case "complete":
        return <CheckCircle className="w-4 h-4 text-primary" />
      case "in-progress":
        return <Clock className="w-4 h-4 text-accent" />
      case "pending":
        return <AlertTriangle className="w-4 h-4 text-warning" />
      case "error":
        return <XCircle className="w-4 h-4 text-destructive" />
    }
  }

  const getTestStatusBadge = (testStatus: DirectoryItem["testStatus"]) => {
    const variants = {
      passed: "default",
      failed: "destructive",
      pending: "secondary",
      "not-tested": "outline",
    } as const

    return (
      <Badge variant={variants[testStatus]} className="text-xs">
        {testStatus}
      </Badge>
    )
  }

  const getAccessibilityBadge = (accessibility: DirectoryItem["accessibility"]) => {
    const config = {
      compliant: { variant: "default" as const, text: "A11y ✓" },
      partial: { variant: "secondary" as const, text: "A11y ~" },
      "non-compliant": { variant: "destructive" as const, text: "A11y ✗" },
    }

    const { variant, text } = config[accessibility]
    return (
      <Badge variant={variant} className="text-xs">
        {text}
      </Badge>
    )
  }

  return (
    <Card className="connection-card">
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CollapsibleTrigger asChild>
          <CardHeader className="cursor-pointer hover:bg-muted/30 transition-colors">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {isOpen ? <ChevronDown className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
                <div>
                  <CardTitle className="flex items-center gap-2">
                    {section.title}
                    {section.criticalPath && (
                      <Badge variant="outline" className="empathy-badge">
                        Critical
                      </Badge>
                    )}
                  </CardTitle>
                  <CardDescription className="mt-1">{section.description}</CardDescription>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <p className="text-sm font-medium">
                    {section.completedItems}/{section.totalItems} Complete
                  </p>
                  <p className="text-xs text-muted-foreground">{completionPercentage}% Progress</p>
                </div>
                <div className="w-16">
                  <Progress value={completionPercentage} className="emotional-progress" />
                </div>
              </div>
            </div>
          </CardHeader>
        </CollapsibleTrigger>

        <CollapsibleContent>
          <CardContent className="pt-0">
            <div className="space-y-3">
              {section.items.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between p-4 rounded-lg border bg-card/50 hover:bg-card/80 transition-colors"
                >
                  <div className="flex items-center gap-4 flex-1">
                    <div className="flex items-center gap-2">
                      {getTypeIcon(item.type)}
                      {getStatusIcon(item.status)}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-medium truncate">{item.name}</h4>
                        <code className="text-xs bg-muted px-2 py-1 rounded text-muted-foreground">{item.path}</code>
                      </div>
                      <p className="text-sm text-muted-foreground truncate">{item.description}</p>
                      {item.dependencies.length > 0 && (
                        <div className="flex items-center gap-1 mt-2">
                          <span className="text-xs text-muted-foreground">Deps:</span>
                          {item.dependencies.slice(0, 3).map((dep) => (
                            <Badge key={dep} variant="outline" className="text-xs">
                              {dep}
                            </Badge>
                          ))}
                          {item.dependencies.length > 3 && (
                            <span className="text-xs text-muted-foreground">+{item.dependencies.length - 3} more</span>
                          )}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="flex flex-col gap-1">
                      {getTestStatusBadge(item.testStatus)}
                      {getAccessibilityBadge(item.accessibility)}
                    </div>

                    {item.performance && (
                      <div className="text-center">
                        <div className="text-sm font-medium">{item.performance}</div>
                        <div className="text-xs text-muted-foreground">Perf</div>
                      </div>
                    )}

                    <div className="flex gap-1">
                      <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                        <TestTube className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                        <ExternalLink className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  )
}
