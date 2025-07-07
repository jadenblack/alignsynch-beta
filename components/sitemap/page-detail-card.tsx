"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { WireframeThumbnail } from "./wireframe-thumbnail"
import { Clock, TrendingDown, TrendingUp, ExternalLink } from "lucide-react"
import type { PageNode } from "@/lib/sitemap-data"

interface PageDetailCardProps {
  page: PageNode
  onClose?: () => void
}

export function PageDetailCard({ page, onClose }: PageDetailCardProps) {
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <CardTitle className="text-2xl">{page.title}</CardTitle>
              <Badge
                variant={page.status === "live" ? "default" : page.status === "development" ? "secondary" : "outline"}
                className="capitalize"
              >
                {page.status}
              </Badge>
              <Badge
                variant="outline"
                className={`capitalize ${
                  page.category === "public"
                    ? "border-blue-200 text-blue-700"
                    : page.category === "auth"
                      ? "border-green-200 text-green-700"
                      : page.category === "user"
                        ? "border-purple-200 text-purple-700"
                        : page.category === "quiz"
                          ? "border-orange-200 text-orange-700"
                          : "border-gray-200 text-gray-700"
                }`}
              >
                {page.category}
              </Badge>
            </div>
            <CardDescription className="text-base">{page.description}</CardDescription>
            <div className="flex items-center gap-4 mt-3 text-sm text-muted-foreground">
              <span className="font-mono">{page.path}</span>
              <Button variant="ghost" size="sm" className="h-6 px-2 gap-1">
                <ExternalLink className="h-3 w-3" />
                Visit Page
              </Button>
            </div>
          </div>
          {onClose && (
            <Button variant="ghost" size="sm" onClick={onClose}>
              ×
            </Button>
          )}
        </div>
      </CardHeader>

      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="wireframe">Wireframe</TabsTrigger>
            <TabsTrigger value="metrics">Metrics</TabsTrigger>
            <TabsTrigger value="connections">Connections</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-3">Page Components</h4>
                <div className="space-y-2">
                  {page.wireframe.components.map((component, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                      <span className="text-sm">{component}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-3">Key Metrics</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-gray-500" />
                      <span className="text-sm">Avg. Time on Page</span>
                    </div>
                    <span className="font-mono text-sm">{page.metrics.avgTimeOnPage}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <TrendingDown className="h-4 w-4 text-gray-500" />
                      <span className="text-sm">Bounce Rate</span>
                    </div>
                    <span className="font-mono text-sm">{page.metrics.bounceRate}</span>
                  </div>
                  {page.metrics.conversionRate && (
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <TrendingUp className="h-4 w-4 text-gray-500" />
                        <span className="text-sm">Conversion Rate</span>
                      </div>
                      <span className="font-mono text-sm">{page.metrics.conversionRate}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {page.wireframe.primaryAction && (
              <div>
                <h4 className="font-semibold mb-2">Primary Action</h4>
                <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                  {page.wireframe.primaryAction}
                </Badge>
              </div>
            )}
          </TabsContent>

          <TabsContent value="wireframe" className="space-y-6">
            <div className="flex justify-center">
              <WireframeThumbnail page={page} size="lg" />
            </div>
            <div>
              <h4 className="font-semibold mb-3">Layout Type</h4>
              <p className="text-sm text-muted-foreground capitalize">{page.wireframe.layout}</p>
            </div>
          </TabsContent>

          <TabsContent value="metrics" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardContent className="p-4 text-center">
                  <Clock className="h-8 w-8 text-blue-500 mx-auto mb-2" />
                  <div className="text-2xl font-bold">{page.metrics.avgTimeOnPage}</div>
                  <div className="text-sm text-muted-foreground">Average Time</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <TrendingDown className="h-8 w-8 text-orange-500 mx-auto mb-2" />
                  <div className="text-2xl font-bold">{page.metrics.bounceRate}</div>
                  <div className="text-sm text-muted-foreground">Bounce Rate</div>
                </CardContent>
              </Card>
              {page.metrics.conversionRate && (
                <Card>
                  <CardContent className="p-4 text-center">
                    <TrendingUp className="h-8 w-8 text-green-500 mx-auto mb-2" />
                    <div className="text-2xl font-bold">{page.metrics.conversionRate}</div>
                    <div className="text-sm text-muted-foreground">Conversion Rate</div>
                  </CardContent>
                </Card>
              )}
            </div>

            <div>
              <h4 className="font-semibold mb-3">Performance Insights</h4>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <span>Page loads within 2 seconds</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <span>Mobile-optimized layout</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                  <span>Could improve accessibility score</span>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="connections" className="space-y-6">
            <div>
              <h4 className="font-semibold mb-3">Connected Pages</h4>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {page.connections.map((connectionId) => (
                  <div key={connectionId} className="p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
                    <div className="font-medium text-sm capitalize">{connectionId.replace("-", " ")}</div>
                    <div className="text-xs text-muted-foreground">/{connectionId}</div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-3">User Flow Position</h4>
              <p className="text-sm text-muted-foreground">
                This page is typically visited {page.category === "public" ? "early" : "later"} in the user journey and
                serves as a {page.wireframe.primaryAction ? "conversion" : "information"} point.
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
