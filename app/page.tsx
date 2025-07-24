"use client"

import { useSession } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { ArrowRight, Users, Target, TrendingUp, Heart } from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  const { data: session } = useSession()

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-teal-500 rounded-lg flex items-center justify-center">
              <Heart className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-xl font-bold text-slate-900">AlignSynch</h1>
            <Badge variant="secondary" className="text-xs">
              Beta
            </Badge>
          </div>
          <nav className="flex items-center space-x-4">
            {session ? (
              <>
                <span className="text-sm text-slate-600">Welcome, {session.user?.name}</span>
                <Link href="/dashboard">
                  <Button variant="outline" size="sm">
                    Dashboard
                  </Button>
                </Link>
              </>
            ) : (
              <Link href="/auth/signin">
                <Button size="sm">Sign In</Button>
              </Link>
            )}
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-6xl font-bold text-slate-900 mb-6">
            Align Your
            <span className="bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent">
              {" "}
              Relationships
            </span>
          </h2>
          <p className="text-xl text-slate-600 mb-8 leading-relaxed">
            A comprehensive platform designed to help couples, teams, and communities build stronger connections through
            structured alignment processes.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href={session ? "/dashboard" : "/auth/signin"}>
              <Button
                size="lg"
                className="bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700"
              >
                Get Started
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
            <Link href="/design-system">
              <Button variant="outline" size="lg">
                Explore Features
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-3 gap-8">
          <Card className="border-0 shadow-lg bg-white/60 backdrop-blur-sm">
            <CardHeader>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
              <CardTitle>Relationship Mapping</CardTitle>
              <CardDescription>Visualize and understand the dynamics of your relationships</CardDescription>
            </CardHeader>
            <CardContent>
              <Progress value={85} className="mb-2" />
              <p className="text-sm text-slate-600">85% alignment achieved</p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-white/60 backdrop-blur-sm">
            <CardHeader>
              <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center mb-4">
                <Target className="w-6 h-6 text-teal-600" />
              </div>
              <CardTitle>Goal Alignment</CardTitle>
              <CardDescription>Sync your objectives and work towards common goals</CardDescription>
            </CardHeader>
            <CardContent>
              <Progress value={72} className="mb-2" />
              <p className="text-sm text-slate-600">72% goals aligned</p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-white/60 backdrop-blur-sm">
            <CardHeader>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <TrendingUp className="w-6 h-6 text-purple-600" />
              </div>
              <CardTitle>Progress Tracking</CardTitle>
              <CardDescription>Monitor your relationship growth over time</CardDescription>
            </CardHeader>
            <CardContent>
              <Progress value={91} className="mb-2" />
              <p className="text-sm text-slate-600">91% improvement rate</p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-16">
        <Card className="border-0 shadow-xl bg-gradient-to-r from-blue-600 to-teal-600 text-white">
          <CardContent className="p-12 text-center">
            <h3 className="text-3xl font-bold mb-4">Ready to Transform Your Relationships?</h3>
            <p className="text-xl mb-8 text-blue-100">
              Join thousands of couples and teams who have improved their connections with AlignSynch.
            </p>
            <Link href={session ? "/dashboard" : "/auth/signin"}>
              <Button size="lg" variant="secondary" className="bg-white text-blue-600 hover:bg-blue-50">
                Start Your Journey
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
          </CardContent>
        </Card>
      </section>

      {/* Footer */}
      <footer className="border-t bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <div className="w-6 h-6 bg-gradient-to-br from-blue-500 to-teal-500 rounded flex items-center justify-center">
                <Heart className="w-4 h-4 text-white" />
              </div>
              <span className="font-semibold text-slate-900">AlignSynch Beta</span>
            </div>
            <div className="flex space-x-6 text-sm text-slate-600">
              <Link href="/privacy" className="hover:text-slate-900">
                Privacy
              </Link>
              <Link href="/terms" className="hover:text-slate-900">
                Terms
              </Link>
              <Link href="/support" className="hover:text-slate-900">
                Support
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
