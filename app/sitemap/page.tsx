"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { WireframeThumbnail } from "@/components/sitemap/wireframe-thumbnail"
import { PageDetailCard } from "@/components/sitemap/page-detail-card"
import { FlowDiagram } from "@/components/sitemap/flow-diagram"
import { Brain, Search, Map, BarChart3, Users, Zap } from "lucide-react"
import { sitePages, userFlows } from "@/lib/sitemap-data"
import type { PageNode } from "@/lib/sitemap-data"

export default function SitemapPage() {
  const [selectedPage, setSelectedPage] = useState<PageNode | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")

  const categories = ["all", "public", "auth", "user", "quiz", "admin"]

  const filteredPages = sitePages.filter((page) => {
    const matchesSearch =
      page.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      page.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      page.path.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesCategory = selectedCategory === "all" || page.category === selectedCategory

    return matchesSearch && matchesCategory
  })

  const stats = {
    totalPages: sitePages.length,
    livePages: sitePages.filter((p) => p.status === "live").length,
    avgConversionRate:
      sitePages
        .filter((p) => p.metrics.conversionRate)
        .reduce((acc, p) => acc + Number.parseFloat(p.metrics.conversionRate!.replace("%", "")), 0) /
      sitePages.filter((p) => p.metrics.conversionRate).length,
    totalFlows: userFlows.length,
  }

  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Link href="/">
              <div className="flex items-center gap-2">
                <Brain className="h-8 w-8 text-primary" />
                <h1 className="text-2xl font-bold">AlignSynch</h1>
              </div>
            </Link>
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
            <Link href="/design-system" className="font-medium hover:text-primary">
              Design System
            </Link>
            <Link href="/sitemap" className="font-medium text-primary">
              Sitemap
            </Link>
          </nav>
          <div className="flex gap-2">
            <Link href="/login">
              <Button variant="outline">Login</Button>
            </Link>
            <Link href="/signup">
              <Button>Sign Up</Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold mb-4">Site Architecture & User Flows</h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Visual representation of AlignSynch's site structure, page wireframes, and user journey flows with
                detailed analytics and insights.
              </p>
            </div>

            {/* Stats Overview */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
              <Card>
                <CardContent className="p-6 text-center">
                  <Map className="h-8 w-8 text-blue-500 mx-auto mb-2" />
                  <div className="text-2xl font-bold">{stats.totalPages}</div>
                  <div className="text-sm text-muted-foreground">Total Pages</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 text-center">
                  <Zap className="h-8 w-8 text-green-500 mx-auto mb-2" />
                  <div className="text-2xl font-bold">{stats.livePages}</div>
                  <div className="text-sm text-muted-foreground">Live Pages</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 text-center">
                  <BarChart3 className="h-8 w-8 text-purple-500 mx-auto mb-2" />
                  <div className="text-2xl font-bold">{stats.avgConversionRate.toFixed(1)}%</div>
                  <div className="text-sm text-muted-foreground">Avg Conversion</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 text-center">
                  <Users className="h-8 w-8 text-orange-500 mx-auto mb-2" />
                  <div className="text-2xl font-bold">{stats.totalFlows}</div>
                  <div className="text-sm text-muted-foreground">User Flows</div>
                </CardContent>
              </Card>
            </div>

            {/* Main Content */}
            <Tabs defaultValue="flow-diagram" className="space-y-8">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="flow-diagram">Flow Diagram</TabsTrigger>
                <TabsTrigger value="page-grid">Page Grid</TabsTrigger>
                <TabsTrigger value="user-flows">User Flows</TabsTrigger>
                <TabsTrigger value="analytics">Analytics</TabsTrigger>
              </TabsList>

              {/* Flow Diagram Tab */}
              <TabsContent value="flow-diagram" className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold mb-4">Interactive Site Flow</h2>
                  <p className="text-muted-foreground mb-6">
                    Click on any page node to view detailed information. Drag to rearrange the layout.
                  </p>
                  <FlowDiagram onNodeClick={setSelectedPage} />
                </div>

                {selectedPage && (
                  <div className="mt-8">
                    <PageDetailCard page={selectedPage} onClose={() => setSelectedPage(null)} />
                  </div>
                )}
              </TabsContent>

              {/* Page Grid Tab */}
              <TabsContent value="page-grid" className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold mb-6">Page Wireframes</h2>

                  {/* Search and Filter */}
                  <div className="flex flex-col sm:flex-row gap-4 mb-6">
                    <div className="relative flex-1">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Search pages..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10"
                      />
                    </div>

                    <div className="flex gap-2">
                      {categories.map((category) => (
                        <Button
                          key={category}
                          variant={selectedCategory === category ? "default" : "outline"}
                          size="sm"
                          onClick={() => setSelectedCategory(category)}
                          className="capitalize"
                        >
                          {category}
                        </Button>
                      ))}
                    </div>
                  </div>

                  {/* Page Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {filteredPages.map((page) => (
                      <Card
                        key={page.id}
                        className="cursor-pointer hover:shadow-md transition-shadow"
                        onClick={() => setSelectedPage(page)}
                      >
                        <CardContent className="p-4">
                          <WireframeThumbnail page={page} size="md" />
                          <div className="mt-4">
                            <h3 className="font-semibold">{page.title}</h3>
                            <p className="text-sm text-muted-foreground mt-1">{page.description}</p>
                            <div className="flex items-center justify-between mt-3">
                              <Badge variant="outline" className="text-xs">
                                {page.metrics.avgTimeOnPage}
                              </Badge>
                              {page.metrics.conversionRate && (
                                <Badge variant="secondary" className="text-xs">
                                  {page.metrics.conversionRate} CVR
                                </Badge>
                              )}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </TabsContent>

              {/* User Flows Tab */}
              <TabsContent value="user-flows" className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold mb-6">User Journey Flows</h2>

                  <div className="grid gap-6">
                    {userFlows.map((flow) => (
                      <Card key={flow.id}>
                        <CardHeader>
                          <div className="flex items-center justify-between">
                            <div>
                              <CardTitle>{flow.title}</CardTitle>
                              <CardDescription>{flow.description}</CardDescription>
                            </div>
                            <Badge variant="outline">{flow.conversionRate} conversion</Badge>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <div className="flex items-center gap-2 overflow-x-auto pb-4">
                            {flow.steps.map((stepId, index) => {
                              const page = sitePages.find((p) => p.id === stepId)
                              if (!page) return null

                              return (
                                <div key={stepId} className="flex items-center gap-2 flex-shrink-0">
                                  <div className="text-center">
                                    <WireframeThumbnail page={page} size="sm" />
                                    <div className="text-xs mt-1 font-medium">{page.title}</div>
                                  </div>
                                  {index < flow.steps.length - 1 && <div className="text-gray-400 text-xl">→</div>}
                                </div>
                              )
                            })}
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </TabsContent>

              {/* Analytics Tab */}
              <TabsContent value="analytics" className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold mb-6">Page Performance Analytics</h2>

                  <div className="grid gap-4">
                    {sitePages.map((page) => (
                      <Card key={page.id}>
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                              <WireframeThumbnail page={page} size="sm" />
                              <div>
                                <h3 className="font-semibold">{page.title}</h3>
                                <p className="text-sm text-muted-foreground">{page.path}</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-6 text-sm">
                              <div className="text-center">
                                <div className="font-semibold">{page.metrics.avgTimeOnPage}</div>
                                <div className="text-muted-foreground">Time on Page</div>
                              </div>
                              <div className="text-center">
                                <div className="font-semibold">{page.metrics.bounceRate}</div>
                                <div className="text-muted-foreground">Bounce Rate</div>
                              </div>
                              {page.metrics.conversionRate && (
                                <div className="text-center">
                                  <div className="font-semibold">{page.metrics.conversionRate}</div>
                                  <div className="text-muted-foreground">Conversion</div>
                                </div>
                              )}
                              <Badge
                                variant={
                                  page.status === "live"
                                    ? "default"
                                    : page.status === "development"
                                      ? "secondary"
                                      : "outline"
                                }
                              >
                                {page.status}
                              </Badge>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>

      <footer className="bg-muted/30 border-t py-8">
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
