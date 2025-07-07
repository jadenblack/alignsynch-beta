"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Brain, Zap, Trophy, BarChart3, Plus, ArrowRight } from "lucide-react"

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Brain className="h-8 w-8 text-primary" />
            <h1 className="text-2xl font-bold">AlignSynch</h1>
          </div>
          <nav className="hidden md:flex gap-6">
            <Link href="/" className="font-medium hover:text-primary">
              Home
            </Link>
            <Link href="/categories" className="font-medium hover:text-primary">
              Languages
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
            <Link href="/design-showcase" className="font-medium hover:text-primary">
              Design Showcase
            </Link>
            <Link href="/sitemap" className="font-medium hover:text-primary">
              Sitemap
            </Link>
            <Link href="/dashboard" className="font-medium hover:text-primary">
              Dashboard
            </Link>
            <Link href="/admin" className="font-medium hover:text-primary">
              Admin
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

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative py-20 md:py-32 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/10 -z-10" />
          <div className="container mx-auto px-4 flex flex-col md:flex-row items-center gap-12">
            <div className="md:w-1/2 space-y-6">
              <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                Master Programming with <span className="text-primary">AI-Powered</span> Quizzes
              </h1>
              <p className="text-lg text-muted-foreground">
                AlignSynch generates fresh, challenging questions across various programming languages, adapting to your
                skill level for a personalized learning experience.
              </p>
              <div className="flex gap-4 pt-4">
                <Link href="/quiz/new">
                  <Button size="lg" className="gap-2">
                    <Zap className="h-5 w-5" />
                    Start Coding Quiz
                  </Button>
                </Link>
                <Link href="/categories">
                  <Button size="lg" variant="outline">
                    Explore Languages
                  </Button>
                </Link>
              </div>
            </div>
            <div className="md:w-1/2 relative">
              <div className="relative w-full h-[400px] bg-gradient-to-br from-primary/20 to-accent/20 rounded-2xl overflow-hidden">
                <div className="absolute top-10 left-10 w-40 h-40 bg-white rounded-lg shadow-lg p-4 rotate-6 animate-gentle-bounce">
                  <div className="h-4 w-32 bg-primary/20 rounded mb-2"></div>
                  <div className="h-3 w-28 bg-primary/20 rounded mb-4"></div>
                  <div className="space-y-2">
                    <div className="h-3 w-full bg-accent/30 rounded"></div>
                    <div className="h-3 w-full bg-accent/30 rounded"></div>
                    <div className="h-3 w-full bg-accent/30 rounded"></div>
                  </div>
                </div>
                <div className="absolute bottom-10 right-10 w-48 h-48 bg-white rounded-lg shadow-lg p-4 -rotate-3 animate-warm-pulse">
                  <div className="h-4 w-32 bg-primary/20 rounded mb-2"></div>
                  <div className="h-3 w-28 bg-primary/20 rounded mb-4"></div>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="h-8 w-full bg-accent/30 rounded"></div>
                    <div className="h-8 w-full bg-accent/30 rounded"></div>
                    <div className="h-8 w-full bg-accent/30 rounded"></div>
                    <div className="h-8 w-full bg-accent/30 rounded"></div>
                  </div>
                </div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-white rounded-full shadow-lg flex items-center justify-center">
                  <Brain className="h-16 w-16 text-primary" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* New Customizable Content Section */}
        <section className="py-16 md:py-24 bg-gradient-to-br from-background via-muted/30 to-background relative overflow-hidden">
          {/* Background decoration */}
          <div className="absolute inset-0 opacity-30">
            <div className="absolute top-20 left-10 w-32 h-32 rounded-full bg-gradient-to-br from-warmth/20 to-connection/20 blur-3xl animate-connection-flow"></div>
            <div
              className="absolute bottom-20 right-10 w-40 h-40 rounded-full bg-gradient-to-br from-collaboration/20 to-empathy/20 blur-3xl animate-connection-flow"
              style={{ animationDelay: "2s" }}
            ></div>
          </div>

          <div className="container-emotional relative z-10">
            {/* Section Header - Customizable */}
            <div className="text-center mb-12 md:mb-16">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                <Plus className="h-4 w-4" />
                <span>Customizable Content Area</span>
              </div>
              <h2 className="text-connection text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
                Ready for Your Content
              </h2>
              <p className="text-empathy text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
                This flexible section is designed to accommodate any type of content you want to showcase. From
                announcements to featured content, testimonials to interactive elements.
              </p>
            </div>

            {/* Content Grid - Fully Customizable */}
            <div className="grid-collaborative">
              {/* Content Block 1 */}
              <div className="connection-card p-8 group cursor-pointer">
                <div className="flex items-center justify-between mb-6">
                  <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-primary to-collaboration flex items-center justify-center">
                    <Plus className="h-6 w-6 text-white" />
                  </div>
                  <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
                <h3 className="text-warmth text-xl font-semibold mb-3">Content Block One</h3>
                <p className="text-empathy mb-4">
                  This is a placeholder for your first piece of content. You can add anything here - from feature
                  highlights to user testimonials.
                </p>
                <div className="empathy-badge">
                  <span>Customizable</span>
                </div>
              </div>

              {/* Content Block 2 */}
              <div className="connection-card p-8 group cursor-pointer">
                <div className="flex items-center justify-between mb-6">
                  <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-accent to-celebration flex items-center justify-center">
                    <Plus className="h-6 w-6 text-white" />
                  </div>
                  <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
                <h3 className="text-warmth text-xl font-semibold mb-3">Content Block Two</h3>
                <p className="text-empathy mb-4">
                  Another flexible content area that adapts to your needs. Perfect for showcasing different aspects of
                  your platform or service.
                </p>
                <div className="empathy-badge">
                  <span>Flexible</span>
                </div>
              </div>

              {/* Content Block 3 */}
              <div className="connection-card p-8 group cursor-pointer">
                <div className="flex items-center justify-between mb-6">
                  <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-growth to-warmth flex items-center justify-center">
                    <Plus className="h-6 w-6 text-white" />
                  </div>
                  <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
                <h3 className="text-warmth text-xl font-semibold mb-3">Content Block Three</h3>
                <p className="text-empathy mb-4">
                  The third customizable area in this responsive grid. Easily modify or replace with your own content
                  and styling.
                </p>
                <div className="empathy-badge">
                  <span>Responsive</span>
                </div>
              </div>
            </div>

            {/* Call-to-Action Area - Customizable */}
            <div className="text-center mt-12 md:mt-16">
              <div className="inline-flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="collaborative-button">
                  <span>Primary Action</span>
                  <ArrowRight className="h-5 w-5 ml-2" />
                </Button>
                <Button size="lg" variant="outline" className="warmth-glow bg-transparent">
                  Secondary Action
                </Button>
              </div>
              <p className="text-intimate text-muted-foreground mt-4">
                Customize these buttons and actions to match your specific needs
              </p>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 bg-muted/50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Powerful Features</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                AlignSynch combines cutting-edge AI with engaging gameplay to create a unique coding quiz experience
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-card rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Brain className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">AI-Generated Questions</h3>
                <p className="text-muted-foreground">
                  Our AI creates fresh, original coding questions that adapt to your skill level and learning pace
                </p>
              </div>

              <div className="bg-card rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <BarChart3 className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Personalized Learning</h3>
                <p className="text-muted-foreground">
                  Track your coding progress and receive personalized recommendations based on your performance
                </p>
              </div>

              <div className="bg-card rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Trophy className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Competitive Leaderboards</h3>
                <p className="text-muted-foreground">
                  Compete with fellow coders and climb the global and language-specific leaderboards
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-primary text-primary-foreground">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Level Up Your Coding Skills?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
              Start your first coding quiz now and discover the power of AI-generated learning
            </p>
            <Link href="/quiz/new">
              <Button size="lg" variant="secondary" className="gap-2">
                <Zap className="h-5 w-5" />
                Start Coding Quiz Now
              </Button>
            </Link>
          </div>
        </section>
      </main>

      <footer className="bg-muted/30 border-t py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
              <Brain className="h-6 w-6 text-primary" />
              <span className="text-xl font-bold">AlignSynch</span>
            </div>
            <div className="flex gap-8">
              <Link href="/about" className="text-muted-foreground hover:text-primary">
                About
              </Link>
              <Link href="/privacy" className="text-muted-foreground hover:text-primary">
                Privacy
              </Link>
              <Link href="/terms" className="text-muted-foreground hover:text-primary">
                Terms
              </Link>
              <Link href="/contact" className="text-muted-foreground hover:text-primary">
                Contact
              </Link>
            </div>
          </div>
          <div className="mt-8 text-center text-muted-foreground text-sm">
            &copy; {new Date().getFullYear()} AlignSynch. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  )
}
