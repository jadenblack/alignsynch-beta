"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  Brain,
  Zap,
  Trophy,
  BarChart3,
  Heart,
  MessageCircle,
  Target,
  Settings,
  Users,
  FileText,
  GitBranch,
  Activity,
  Shield,
  Database,
  Globe,
  ExternalLink,
  BookOpen,
  Sparkles,
} from "lucide-react"

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/10 -z-10" />
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center gap-12">
          <div className="md:w-1/2 space-y-6 text-center md:text-left">
            <h1 className="text-4xl md:text-6xl font-bold leading-tight">
              Deepen Your Connection. <span className="text-primary">Grow Together.</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              AlignSynch helps you and your partner explore important aspects of your relationship through guided
              conversations, fostering understanding and stronger alignment.
            </p>
            <div className="flex gap-4 pt-4 justify-center md:justify-start">
              <Link href="/session/new">
                <Button size="lg" className="gap-2">
                  <Zap className="h-5 w-5" />
                  Start an Alignment Session
                </Button>
              </Link>
              <Link href="/focus-areas">
                <Button size="lg" variant="outline">
                  Explore Focus Areas
                </Button>
              </Link>
            </div>
          </div>
          <div className="md:w-1/2 relative">
            <div className="relative w-full h-[400px] bg-gradient-to-br from-primary/20 to-accent/20 rounded-2xl overflow-hidden">
              <div className="absolute top-10 left-10 w-40 h-40 bg-white rounded-lg shadow-lg p-4 rotate-6 animate-gentle-bounce">
                <div className="flex items-center gap-2 mb-2">
                  <Heart className="h-4 w-4 text-red-400" />
                  <div className="h-3 w-24 bg-primary/20 rounded"></div>
                </div>
                <div className="space-y-2">
                  <div className="h-3 w-full bg-accent/30 rounded"></div>
                  <div className="h-3 w-full bg-accent/30 rounded"></div>
                  <div className="h-3 w-full bg-accent/30 rounded"></div>
                </div>
              </div>
              <div className="absolute bottom-10 right-10 w-48 h-48 bg-white rounded-lg shadow-lg p-4 -rotate-3 animate-warm-pulse">
                <div className="flex items-center gap-2 mb-2">
                  <MessageCircle className="h-4 w-4 text-blue-400" />
                  <div className="h-3 w-20 bg-primary/20 rounded"></div>
                </div>
                <div className="space-y-2">
                  <div className="h-3 w-full bg-accent/30 rounded"></div>
                  <div className="h-3 w-full bg-accent/30 rounded"></div>
                  <div className="h-3 w-full bg-accent/30 rounded"></div>
                </div>
              </div>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-white rounded-full shadow-lg flex items-center justify-center">
                <Brain className="h-16 w-16 text-primary" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Application Navigation Grid Section */}
      <section className="py-16 md:py-20 bg-gradient-to-br from-muted/30 via-background to-muted/50 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-10 left-20 w-24 h-24 rounded-full bg-gradient-to-br from-primary/30 to-accent/30 blur-2xl animate-connection-flow"></div>
          <div
            className="absolute bottom-20 right-20 w-32 h-32 rounded-full bg-gradient-to-br from-collaboration/30 to-celebration/30 blur-2xl animate-connection-flow"
            style={{ animationDelay: "3s" }}
          ></div>
          <div
            className="absolute top-1/2 left-1/3 w-20 h-20 rounded-full bg-gradient-to-br from-warmth/30 to-empathy/30 blur-2xl animate-connection-flow"
            style={{ animationDelay: "1.5s" }}
          ></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          {/* Section Header */}
          <div className="text-center mb-12 md:mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
              <Globe className="h-4 w-4" />
              <span>Application Hub</span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-primary via-collaboration to-accent bg-clip-text text-transparent">
              Explore AlignSynch
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Quick access to all key sections, dashboards, and management tools. Navigate seamlessly between learning,
              analytics, and administration.
            </p>
          </div>

          {/* Navigation Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
            {/* Core Application Pages */}
            <Link href="/focus-areas" className="group">
              <div className="bg-card hover:bg-card/80 border border-border/50 rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300 group-hover:scale-[1.02] group-hover:border-primary/30">
                <div className="flex items-center justify-between mb-4">
                  <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
                    <Target className="h-5 w-5 text-white" />
                  </div>
                  <div className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded-full">Core</div>
                </div>
                <h3 className="font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                  Focus Areas
                </h3>
                <p className="text-sm text-muted-foreground">
                  Browse and select from various focus areas for your relationship
                </p>
              </div>
            </Link>

            <Link href="/session/new" className="group">
              <div className="bg-card hover:bg-card/80 border border-border/50 rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300 group-hover:scale-[1.02] group-hover:border-primary/30">
                <div className="flex items-center justify-between mb-4">
                  <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center">
                    <Zap className="h-5 w-5 text-white" />
                  </div>
                  <div className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded-full">Session</div>
                </div>
                <h3 className="font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                  Alignment Session
                </h3>
                <p className="text-sm text-muted-foreground">
                  Start a new alignment session tailored to your relationship needs
                </p>
              </div>
            </Link>

            <Link href="/leaderboard" className="group">
              <div className="bg-card hover:bg-card/80 border border-border/50 rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300 group-hover:scale-[1.02] group-hover:border-primary/30">
                <div className="flex items-center justify-between mb-4">
                  <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-yellow-500 to-orange-500 flex items-center justify-center">
                    <Trophy className="h-5 w-5 text-white" />
                  </div>
                  <div className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded-full">Social</div>
                </div>
                <h3 className="font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                  Leaderboard
                </h3>
                <p className="text-sm text-muted-foreground">View global rankings and compete with other partners</p>
              </div>
            </Link>

            <Link href="/profile" className="group">
              <div className="bg-card hover:bg-card/80 border border-border/50 rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300 group-hover:scale-[1.02] group-hover:border-primary/30">
                <div className="flex items-center justify-between mb-4">
                  <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center">
                    <Users className="h-5 w-5 text-white" />
                  </div>
                  <div className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded-full">User</div>
                </div>
                <h3 className="font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                  User Profile
                </h3>
                <p className="text-sm text-muted-foreground">
                  View your progress, achievements, and relationship statistics
                </p>
              </div>
            </Link>

            {/* Dashboard & Analytics */}
            <Link href="/dashboard" className="group">
              <div className="bg-card hover:bg-card/80 border border-border/50 rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300 group-hover:scale-[1.02] group-hover:border-primary/30">
                <div className="flex items-center justify-between mb-4">
                  <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-indigo-500 to-indigo-600 flex items-center justify-center">
                    <BarChart3 className="h-5 w-5 text-white" />
                  </div>
                  <div className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded-full">Analytics</div>
                </div>
                <h3 className="font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                  Project Dashboard
                </h3>
                <p className="text-sm text-muted-foreground">GitHub workflow management and project approval system</p>
              </div>
            </Link>

            <Link href="/cicd" className="group">
              <div className="bg-card hover:bg-card/80 border border-border/50 rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300 group-hover:scale-[1.02] group-hover:border-primary/30">
                <div className="flex items-center justify-between mb-4">
                  <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-teal-500 to-teal-600 flex items-center justify-center">
                    <GitBranch className="h-5 w-5 text-white" />
                  </div>
                  <div className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded-full">DevOps</div>
                </div>
                <h3 className="font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                  CI/CD Pipeline
                </h3>
                <p className="text-sm text-muted-foreground">Monitor build status, deployments, and pipeline health</p>
              </div>
            </Link>

            <Link href="/sitemap" className="group">
              <div className="bg-card hover:bg-card/80 border border-border/50 rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300 group-hover:scale-[1.02] group-hover:border-primary/30">
                <div className="flex items-center justify-between mb-4">
                  <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-pink-500 to-rose-500 flex items-center justify-center">
                    <FileText className="h-5 w-5 text-white" />
                  </div>
                  <div className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded-full">Structure</div>
                </div>
                <h3 className="font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                  Site Architecture
                </h3>
                <p className="text-sm text-muted-foreground">Visual sitemap with user flows and page relationships</p>
              </div>
            </Link>

            <Link href="/integration-analysis" className="group">
              <div className="bg-card hover:bg-card/80 border border-border/50 rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300 group-hover:scale-[1.02] group-hover:border-primary/30">
                <div className="flex items-center justify-between mb-4">
                  <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center">
                    <Activity className="h-5 w-5 text-white" />
                  </div>
                  <div className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded-full">Analysis</div>
                </div>
                <h3 className="font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                  Integration Analysis
                </h3>
                <p className="text-sm text-muted-foreground">
                  Design token compatibility and system integration reports
                </p>
              </div>
            </Link>

            {/* Design & Documentation */}
            <Link href="/design-system" className="group">
              <div className="bg-card hover:bg-card/80 border border-border/50 rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300 group-hover:scale-[1.02] group-hover:border-primary/30">
                <div className="flex items-center justify-between mb-4">
                  <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center">
                    <Sparkles className="h-5 w-5 text-white" />
                  </div>
                  <div className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded-full">Design</div>
                </div>
                <h3 className="font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                  Design System
                </h3>
                <p className="text-sm text-muted-foreground">Component library, tokens, and design documentation</p>
              </div>
            </Link>

            <Link href="/design-showcase" className="group">
              <div className="bg-card hover:bg-card/80 border border-border/50 rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300 group-hover:scale-[1.02] group-hover:border-primary/30">
                <div className="flex items-center justify-between mb-4">
                  <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center">
                    <Target className="h-5 w-5 text-white" />
                  </div>
                  <div className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded-full">Showcase</div>
                </div>
                <h3 className="font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                  Design Showcase
                </h3>
                <p className="text-sm text-muted-foreground">
                  Interactive demonstration of AlignUI emotional design principles
                </p>
              </div>
            </Link>

            <Link href="/settings" className="group">
              <div className="bg-card hover:bg-card/80 border border-border/50 rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300 group-hover:scale-[1.02] group-hover:border-primary/30">
                <div className="flex items-center justify-between mb-4">
                  <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-gray-500 to-gray-600 flex items-center justify-center">
                    <Settings className="h-5 w-5 text-white" />
                  </div>
                  <div className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded-full">Config</div>
                </div>
                <h3 className="font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                  User Settings
                </h3>
                <p className="text-sm text-muted-foreground">Customize preferences, themes, and account settings</p>
              </div>
            </Link>

            <Link href="/admin" className="group">
              <div className="bg-card hover:bg-card/80 border border-border/50 rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300 group-hover:scale-[1.02] group-hover:border-red-300">
                <div className="flex items-center justify-between mb-4">
                  <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center">
                    <Shield className="h-5 w-5 text-white" />
                  </div>
                  <div className="text-xs text-red-600 bg-red-50 px-2 py-1 rounded-full">Admin</div>
                </div>
                <h3 className="font-semibold text-foreground mb-2 group-hover:text-red-600 transition-colors">
                  Admin Directory
                </h3>
                <p className="text-sm text-muted-foreground">
                  System administration, deployment checklist, and monitoring
                </p>
              </div>
            </Link>

            {/* External Vercel Links */}
            <a href="https://vercel.com/dashboard" target="_blank" rel="noopener noreferrer" className="group">
              <div className="bg-gradient-to-br from-black/5 to-black/10 hover:from-black/10 hover:to-black/15 border border-border/50 rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300 group-hover:scale-[1.02] group-hover:border-black/30">
                <div className="flex items-center justify-between mb-4">
                  <div className="h-10 w-10 rounded-lg bg-black flex items-center justify-center">
                    <Globe className="h-5 w-5 text-white" />
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded-full">External</div>
                    <ExternalLink className="h-3 w-3 text-muted-foreground" />
                  </div>
                </div>
                <h3 className="font-semibold text-foreground mb-2 group-hover:text-black transition-colors">
                  Vercel Dashboard
                </h3>
                <p className="text-sm text-muted-foreground">Deployment management, analytics, and project settings</p>
              </div>
            </a>

            <a href="https://vercel.com/analytics" target="_blank" rel="noopener noreferrer" className="group">
              <div className="bg-gradient-to-br from-black/5 to-black/10 hover:from-black/10 hover:to-black/15 border border-border/50 rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300 group-hover:scale-[1.02] group-hover:border-black/30">
                <div className="flex items-center justify-between mb-4">
                  <div className="h-10 w-10 rounded-lg bg-black flex items-center justify-center">
                    <BarChart3 className="h-5 w-5 text-white" />
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded-full">External</div>
                    <ExternalLink className="h-3 w-3 text-muted-foreground" />
                  </div>
                </div>
                <h3 className="font-semibold text-foreground mb-2 group-hover:text-black transition-colors">
                  Vercel Analytics
                </h3>
                <p className="text-sm text-muted-foreground">
                  Real-time performance metrics and user behavior insights
                </p>
              </div>
            </a>

            <a href="https://vercel.com/storage" target="_blank" rel="noopener noreferrer" className="group">
              <div className="bg-gradient-to-br from-black/5 to-black/10 hover:from-black/10 hover:to-black/15 border border-border/50 rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300 group-hover:scale-[1.02] group-hover:border-black/30">
                <div className="flex items-center justify-between mb-4">
                  <div className="h-10 w-10 rounded-lg bg-black flex items-center justify-center">
                    <Database className="h-5 w-5 text-white" />
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded-full">External</div>
                    <ExternalLink className="h-3 w-3 text-muted-foreground" />
                  </div>
                </div>
                <h3 className="font-semibold text-foreground mb-2 group-hover:text-black transition-colors">
                  Vercel Storage
                </h3>
                <p className="text-sm text-muted-foreground">Database management, blob storage, and data services</p>
              </div>
            </a>

            <a href="https://vercel.com/docs" target="_blank" rel="noopener noreferrer" className="group">
              <div className="bg-gradient-to-br from-black/5 to-black/10 hover:from-black/10 hover:to-black/15 border border-border/50 rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300 group-hover:scale-[1.02] group-hover:border-black/30">
                <div className="flex items-center justify-between mb-4">
                  <div className="h-10 w-10 rounded-lg bg-black flex items-center justify-center">
                    <BookOpen className="h-5 w-5 text-white" />
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded-full">External</div>
                    <ExternalLink className="h-3 w-3 text-muted-foreground" />
                  </div>
                </div>
                <h3 className="font-semibold text-foreground mb-2 group-hover:text-black transition-colors">
                  Vercel Documentation
                </h3>
                <p className="text-sm text-muted-foreground">Platform guides, API references, and best practices</p>
              </div>
            </a>
          </div>

          {/* Quick Stats */}
          <div className="mt-12 md:mt-16 grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 rounded-lg bg-card/50 border border-border/30">
              <div className="text-2xl font-bold text-primary mb-1">16</div>
              <div className="text-sm text-muted-foreground">Application Pages</div>
            </div>
            <div className="text-center p-4 rounded-lg bg-card/50 border border-border/30">
              <div className="text-2xl font-bold text-collaboration mb-1">4</div>
              <div className="text-sm text-muted-foreground">External Links</div>
            </div>
            <div className="text-center p-4 rounded-lg bg-card/50 border border-border/30">
              <div className="text-2xl font-bold text-celebration mb-1">8</div>
              <div className="text-sm text-muted-foreground">Dashboard Views</div>
            </div>
            <div className="text-center p-4 rounded-lg bg-card/50 border border-border/30">
              <div className="text-2xl font-bold text-growth mb-1">100%</div>
              <div className="text-sm text-muted-foreground">Responsive</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">A Space for Meaningful Conversations</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              AlignSynch provides the structure to explore, understand, and align on what matters most.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-card rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <MessageCircle className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Guided Dialogues</h3>
              <p className="text-muted-foreground">
                Our AI-assisted prompts help you navigate important topics with empathy and clarity.
              </p>
            </div>

            <div className="bg-card rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <BarChart3 className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Personalized Insights</h3>
              <p className="text-muted-foreground">
                Discover your shared strengths and identify areas for growth with personalized feedback.
              </p>
            </div>

            <div className="bg-card rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Target className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Track Your Journey</h3>
              <p className="text-muted-foreground">
                Celebrate your progress and milestones as you build a stronger, more aligned partnership.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Nurture Your Relationship?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
            Start your first alignment session and discover a new way to connect.
          </p>
          <Link href="/session/new">
            <Button size="lg" variant="secondary" className="gap-2">
              <Heart className="h-5 w-5" />
              Start a Free Session
            </Button>
          </Link>
        </div>
      </section>
    </>
  )
}
