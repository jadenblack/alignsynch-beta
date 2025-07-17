"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import {
  alignUTokens,
  alignSynchTokens,
  compatibilityAnalysis,
  integrationChallenges,
  integrationStrategy,
  type AlignUToken,
} from "@/lib/alignu-integration-analysis"
import { CheckCircle, XCircle, AlertTriangle, ArrowRight, Layers, Copy, Download } from "lucide-react"

export function TokenComparison() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [comparisonMode, setComparisonMode] = useState<"side-by-side" | "overlay">("side-by-side")

  const getTokensByCategory = (tokens: AlignUToken[], category: string) => {
    if (category === "all") return tokens
    return tokens.filter((token) => token.category === category)
  }

  const getCompatibilityColor = (percentage: number) => {
    if (percentage >= 80) return "text-green-600"
    if (percentage >= 60) return "text-yellow-600"
    return "text-red-600"
  }

  const getCompatibilityIcon = (percentage: number) => {
    if (percentage >= 80) return <CheckCircle className="h-4 w-4 text-green-600" />
    if (percentage >= 60) return <AlertTriangle className="h-4 w-4 text-yellow-600" />
    return <XCircle className="h-4 w-4 text-red-600" />
  }

  return (
    <div className="space-y-6">
      {/* Compatibility Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Layers className="h-5 w-5" />
            AlignU! Integration Compatibility Analysis
          </CardTitle>
          <CardDescription>Feasibility assessment for integrating AlignU! open-source design system</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Token Compatibility</span>
                {getCompatibilityIcon(compatibilityAnalysis.tokenCompatibility)}
              </div>
              <Progress value={compatibilityAnalysis.tokenCompatibility} className="h-2" />
              <span className={`text-sm ${getCompatibilityColor(compatibilityAnalysis.tokenCompatibility)}`}>
                {compatibilityAnalysis.tokenCompatibility}% Compatible
              </span>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Component Compatibility</span>
                {getCompatibilityIcon(compatibilityAnalysis.componentCompatibility)}
              </div>
              <Progress value={compatibilityAnalysis.componentCompatibility} className="h-2" />
              <span className={`text-sm ${getCompatibilityColor(compatibilityAnalysis.componentCompatibility)}`}>
                {compatibilityAnalysis.componentCompatibility}% Compatible
              </span>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Design System Alignment</span>
                {getCompatibilityIcon(compatibilityAnalysis.designSystemAlignment)}
              </div>
              <Progress value={compatibilityAnalysis.designSystemAlignment} className="h-2" />
              <span className={`text-sm ${getCompatibilityColor(compatibilityAnalysis.designSystemAlignment)}`}>
                {compatibilityAnalysis.designSystemAlignment}% Aligned
              </span>
            </div>
          </div>

          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Badge
                variant={
                  compatibilityAnalysis.integrationComplexity === "low"
                    ? "default"
                    : compatibilityAnalysis.integrationComplexity === "medium"
                      ? "secondary"
                      : "destructive"
                }
              >
                {compatibilityAnalysis.integrationComplexity.toUpperCase()} COMPLEXITY
              </Badge>
              <span className="text-sm font-medium">Recommended Approach:</span>
            </div>
            <p className="text-sm text-gray-700">{compatibilityAnalysis.recommendedApproach}</p>
          </div>
        </CardContent>
      </Card>

      {/* Token Comparison */}
      <Tabs defaultValue="comparison" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="comparison">Token Comparison</TabsTrigger>
          <TabsTrigger value="challenges">Integration Challenges</TabsTrigger>
          <TabsTrigger value="strategy">Implementation Strategy</TabsTrigger>
          <TabsTrigger value="figma">Figma Integration</TabsTrigger>
        </TabsList>

        <TabsContent value="comparison" className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-3 py-2 border rounded-md"
              >
                <option value="all">All Categories</option>
                <option value="semantic">Semantic</option>
                <option value="neutral">Neutral</option>
                <option value="size">Typography</option>
                <option value="scale">Spacing</option>
                <option value="elevation">Shadows</option>
              </select>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Copy className="h-4 w-4 mr-2" />
                Copy Tokens
              </Button>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export Analysis
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* AlignU! Tokens */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">AlignU! Tokens</CardTitle>
                <CardDescription>Open-source design system tokens</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {getTokensByCategory(alignUTokens, selectedCategory).map((token) => (
                    <div key={token.name} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-3">
                        {token.type === "color" && (
                          <div className="w-6 h-6 rounded border" style={{ backgroundColor: token.value }} />
                        )}
                        <div>
                          <div className="font-medium text-sm">{token.name}</div>
                          <div className="text-xs text-gray-500">{token.value}</div>
                        </div>
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {token.type}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* AlignSynch Tokens */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">AlignSynch Tokens</CardTitle>
                <CardDescription>Current design system tokens</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {getTokensByCategory(alignSynchTokens, selectedCategory).map((token) => (
                    <div key={token.name} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-3">
                        {token.type === "color" && (
                          <div className="w-6 h-6 rounded border" style={{ backgroundColor: token.value }} />
                        )}
                        <div>
                          <div className="font-medium text-sm">{token.name}</div>
                          <div className="text-xs text-gray-500">{token.value}</div>
                        </div>
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {token.type}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="challenges" className="space-y-4">
          <div className="grid gap-4">
            {integrationChallenges.map((challenge, index) => (
              <Card key={index}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{challenge.category}</CardTitle>
                    <Badge
                      variant={
                        challenge.impact === "high"
                          ? "destructive"
                          : challenge.impact === "medium"
                            ? "secondary"
                            : "default"
                      }
                    >
                      {challenge.impact.toUpperCase()} IMPACT
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div>
                      <h4 className="font-medium text-sm mb-1">Challenge:</h4>
                      <p className="text-sm text-gray-600">{challenge.challenge}</p>
                    </div>
                    <div>
                      <h4 className="font-medium text-sm mb-1">Recommended Solution:</h4>
                      <p className="text-sm text-gray-600">{challenge.solution}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="strategy" className="space-y-4">
          <div className="space-y-6">
            {Object.entries(integrationStrategy).map(([phaseKey, phase]) => (
              <Card key={phaseKey}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{phase.name}</CardTitle>
                    <Badge variant="outline">{phase.duration}</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {phase.tasks.map((task, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <span className="text-sm">{task}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="figma" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Figma Design System Integration</CardTitle>
              <CardDescription>Analysis of importing AlignU! Figma design system into AlignSynch</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium mb-3">Integration Benefits</h4>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        Automated token synchronization
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        Design-to-code consistency
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        Component library expansion
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        Collaborative design workflow
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-medium mb-3">Technical Requirements</h4>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-center gap-2">
                        <ArrowRight className="h-4 w-4 text-blue-600" />
                        Figma API access token
                      </li>
                      <li className="flex items-center gap-2">
                        <ArrowRight className="h-4 w-4 text-blue-600" />
                        Token extraction pipeline
                      </li>
                      <li className="flex items-center gap-2">
                        <ArrowRight className="h-4 w-4 text-blue-600" />
                        CSS/Tailwind generation
                      </li>
                      <li className="flex items-center gap-2">
                        <ArrowRight className="h-4 w-4 text-blue-600" />
                        Automated sync workflow
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="p-4 bg-yellow-50 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <AlertTriangle className="h-4 w-4 text-yellow-600" />
                    <span className="font-medium text-sm">Compatibility Considerations</span>
                  </div>
                  <p className="text-sm text-gray-700">
                    AlignU! Figma components use different naming conventions and structure compared to shadcn/ui. A
                    mapping layer will be required to maintain compatibility with existing AlignSynch components while
                    leveraging AlignU! design patterns.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
