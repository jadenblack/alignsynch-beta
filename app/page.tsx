import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import Link from "next/link"
import { ArrowRight, Heart, Users, Target, Zap } from "lucide-react"

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 px-4 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-blue-900 dark:to-indigo-900">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center space-y-6">
            <Badge variant="secondary" className="mb-4">
              <Zap className="w-4 h-4 mr-2" />
              Beta Version 2.01.1
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              AlignSynch Beta
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              A comprehensive platform for relationship alignment and synchronization
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-8">
              <Button size="lg" asChild>
                <Link href="/dashboard">
                  Get Started
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href="/design-system">Explore Design System</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Platform Features</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Discover the comprehensive tools and features designed to enhance relationship alignment
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <Heart className="w-8 h-8 text-red-500 mb-2" />
                <CardTitle>Relationship Insights</CardTitle>
                <CardDescription>Deep analytics and insights into relationship dynamics</CardDescription>
              </CardHeader>
              <CardContent>
                <Progress value={85} className="mb-2" />
                <p className="text-sm text-gray-600 dark:text-gray-400">85% compatibility analysis complete</p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <Users className="w-8 h-8 text-blue-500 mb-2" />
                <CardTitle>Collaborative Tools</CardTitle>
                <CardDescription>Work together with shared goals and synchronized progress</CardDescription>
              </CardHeader>
              <CardContent>
                <Progress value={72} className="mb-2" />
                <p className="text-sm text-gray-600 dark:text-gray-400">72% of goals synchronized</p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <Target className="w-8 h-8 text-green-500 mb-2" />
                <CardTitle>Goal Alignment</CardTitle>
                <CardDescription>Align your objectives and track progress together</CardDescription>
              </CardHeader>
              <CardContent>
                <Progress value={91} className="mb-2" />
                <p className="text-sm text-gray-600 dark:text-gray-400">91% alignment achieved</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Navigation Section */}
      <section className="py-20 px-4 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Explore the Platform</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Navigate through different sections of the AlignSynch Beta platform
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Button variant="outline" size="lg" asChild className="h-auto p-6 flex-col bg-transparent">
              <Link href="/dashboard">
                <div className="text-center">
                  <div className="text-2xl mb-2">📊</div>
                  <div className="font-semibold">Dashboard</div>
                  <div className="text-sm text-gray-500 mt-1">Main control center</div>
                </div>
              </Link>
            </Button>

            <Button variant="outline" size="lg" asChild className="h-auto p-6 flex-col bg-transparent">
              <Link href="/quiz/new">
                <div className="text-center">
                  <div className="text-2xl mb-2">🎯</div>
                  <div className="font-semibold">Quiz System</div>
                  <div className="text-sm text-gray-500 mt-1">Interactive assessments</div>
                </div>
              </Link>
            </Button>

            <Button variant="outline" size="lg" asChild className="h-auto p-6 flex-col bg-transparent">
              <Link href="/design-system">
                <div className="text-center">
                  <div className="text-2xl mb-2">🎨</div>
                  <div className="font-semibold">Design System</div>
                  <div className="text-sm text-gray-500 mt-1">UI components</div>
                </div>
              </Link>
            </Button>

            <Button variant="outline" size="lg" asChild className="h-auto p-6 flex-col bg-transparent">
              <Link href="/admin">
                <div className="text-center">
                  <div className="text-2xl mb-2">⚙️</div>
                  <div className="font-semibold">Admin Panel</div>
                  <div className="text-sm text-gray-500 mt-1">System management</div>
                </div>
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
