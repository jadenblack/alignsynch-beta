"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TokenComparison } from "@/components/integration/token-comparison"
import { Brain, ArrowLeft, GitBranch, Figma, Code, CheckCircle, AlertTriangle } from "lucide-react"

export default function IntegrationAnalysisPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <Link href="/dashboard">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Dashboard
              </Button>
            </Link>
            <div className="flex items-center gap-2">
              <Brain className="h-8 w-8 text-primary" />
              <h1 className="text-2xl font-bold">AlignSynch</h1>
            </div>
          </div>
          <nav className="hidden md:flex gap-6">
            <Link href="/" className="font-medium hover:text-primary">
              Home
            </Link>
            <Link href="/dashboard" className="font-medium hover:text-primary">
              Dashboard
            </Link>
            <Link href="/design-system" className="font-medium hover:text-primary">
              Design System
            </Link>
            <Link href="/integration-analysis" className="font-medium text-primary">
              Integration Analysis
            </Link>
          </nav>
        </div>
      </header>

      <main className="flex-1 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold mb-4">AlignU! Integration Analysis</h1>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                Comprehensive feasibility assessment for integrating the open-source AlignU! design system and token set
                into the AlignSynch project, including Figma design system compatibility analysis.
              </p>
            </div>

            {/* Executive Summary */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <GitBranch className="h-5 w-5" />
                  Executive Summary
                </CardTitle>
                <CardDescription>Key findings and recommendations for AlignU! integration</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <CheckCircle className="h-8 w-8 text-green-600 mx-auto mb-2" />
                    <h3 className="font-semibold text-green-800">Feasible Integration</h3>
                    <p className="text-sm text-green-700 mt-1">
                      75% token compatibility with selective integration approach
                    </p>
                  </div>
                  <div className="text-center p-4 bg-yellow-50 rounded-lg">
                    <AlertTriangle className="h-8 w-8 text-yellow-600 mx-auto mb-2" />
                    <h3 className="font-semibold text-yellow-800">Medium Complexity</h3>
                    <p className="text-sm text-yellow-700 mt-1">6-7 weeks estimated integration timeline</p>
                  </div>
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <Figma className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                    <h3 className="font-semibold text-blue-800">Figma Compatible</h3>
                    <p className="text-sm text-blue-700 mt-1">Design system can be imported with token mapping</p>
                  </div>
                </div>

                <div className="mt-6 p-4 border-l-4 border-blue-500 bg-blue-50">
                  <h4 className="font-semibold text-blue-800 mb-2">Recommended Approach</h4>
                  <p className="text-sm text-blue-700">
                    <strong>Selective Integration:</strong> Adopt compatible AlignU! tokens and components while
                    maintaining AlignSynch brand identity. Focus on expanding the design system with AlignU! patterns
                    that enhance functionality without compromising visual consistency.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Integration Analysis */}
            <TokenComparison />

            {/* Implementation Roadmap */}
            <Card className="mt-8">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Code className="h-5 w-5" />
                  Implementation Roadmap
                </CardTitle>
                <CardDescription>Step-by-step integration plan with timeline and deliverables</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-semibold text-sm">
                      1
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold mb-1">Token Analysis & Extraction</h4>
                      <p className="text-sm text-gray-600 mb-2">
                        Extract AlignU! design tokens, analyze compatibility, and create mapping utilities
                      </p>
                      <div className="flex gap-2">
                        <Badge variant="outline">1-2 weeks</Badge>
                        <Badge variant="secondary">Design Tokens</Badge>
                        <Badge variant="secondary">Figma API</Badge>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-semibold text-sm">
                      2
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold mb-1">Component Integration</h4>
                      <p className="text-sm text-gray-600 mb-2">
                        Selectively integrate high-value AlignU! components with AlignSynch adaptations
                      </p>
                      <div className="flex gap-2">
                        <Badge variant="outline">2-3 weeks</Badge>
                        <Badge variant="secondary">React Components</Badge>
                        <Badge variant="secondary">shadcn/ui</Badge>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-semibold text-sm">
                      3
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold mb-1">Design System Harmonization</h4>
                      <p className="text-sm text-gray-600 mb-2">
                        Integrate Figma design system and establish automated token synchronization
                      </p>
                      <div className="flex gap-2">
                        <Badge variant="outline">1-2 weeks</Badge>
                        <Badge variant="secondary">Figma Integration</Badge>
                        <Badge variant="secondary">Documentation</Badge>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center text-green-600 font-semibold text-sm">
                      ✓
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold mb-1">Testing & Validation</h4>
                      <p className="text-sm text-gray-600 mb-2">
                        Comprehensive testing of integrated components and design system consistency
                      </p>
                      <div className="flex gap-2">
                        <Badge variant="outline">1 week</Badge>
                        <Badge variant="secondary">Quality Assurance</Badge>
                        <Badge variant="secondary">User Testing</Badge>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
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
