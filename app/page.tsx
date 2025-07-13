"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Heart, MessageCircle, Target, Users, Zap, ArrowRight, CheckCircle, Star, Globe, Sparkles } from "lucide-react"

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative py-24 md:py-32 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-accent/5" />
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-pulse" />
        <div
          className="absolute bottom-20 right-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "2s" }}
        />

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-8">
              <Sparkles className="h-4 w-4" />
              <span>Relationship Alignment Platform</span>
            </div>

            {/* Main Heading */}
            <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-8">
              Deepen Your Connection.{" "}
              <span className="bg-gradient-to-r from-primary via-primary/80 to-accent bg-clip-text text-transparent">
                Grow Together.
              </span>
            </h1>

            {/* Subheading */}
            <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed">
              AlignSynch helps you and your partner explore important aspects of your relationship through guided
              conversations, fostering understanding and stronger alignment.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
              <Link href="/session/new">
                <Button size="lg" className="gap-2 text-lg px-8 py-4 h-auto">
                  <Zap className="h-5 w-5" />
                  Start an Alignment Session
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>
              <Link href="/focus-areas">
                <Button size="lg" variant="outline" className="text-lg px-8 py-4 h-auto bg-transparent">
                  Explore Focus Areas
                </Button>
              </Link>
            </div>

            {/* Social Proof */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-8 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <div className="flex -space-x-2">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 border-2 border-background"></div>
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-green-400 to-green-600 border-2 border-background"></div>
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-400 to-purple-600 border-2 border-background"></div>
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-pink-400 to-pink-600 border-2 border-background"></div>
                </div>
                <span>Trusted by 10,000+ couples</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <span>4.9/5 rating</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-gradient-to-b from-muted/30 to-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4">
              Core Features
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">A Space for Meaningful Conversations</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              AlignSynch provides the structure to explore, understand, and align on what matters most in your
              relationship.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <Card className="group hover:shadow-lg transition-all duration-300 border-0 bg-card/50 backdrop-blur-sm">
              <CardHeader className="text-center pb-4">
                <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <MessageCircle className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-2xl">Guided Dialogues</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <CardDescription className="text-base leading-relaxed">
                  Our AI-assisted prompts help you navigate important topics with empathy and clarity, creating safe
                  spaces for meaningful conversations.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-lg transition-all duration-300 border-0 bg-card/50 backdrop-blur-sm">
              <CardHeader className="text-center pb-4">
                <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Target className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-2xl">Personalized Insights</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <CardDescription className="text-base leading-relaxed">
                  Discover your shared strengths and identify areas for growth with personalized feedback tailored to
                  your unique relationship dynamics.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-lg transition-all duration-300 border-0 bg-card/50 backdrop-blur-sm">
              <CardHeader className="text-center pb-4">
                <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Heart className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-2xl">Track Your Journey</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <CardDescription className="text-base leading-relaxed">
                  Celebrate your progress and milestones as you build a stronger, more aligned partnership through
                  continuous growth and understanding.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4">
              How It Works
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Simple Steps to Deeper Connection</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Our proven process guides you through meaningful conversations that strengthen your relationship.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="text-center">
              <div className="relative mb-8">
                <div className="h-20 w-20 rounded-full bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center mx-auto text-white text-2xl font-bold">
                  1
                </div>
                <div className="absolute top-10 left-1/2 w-full h-0.5 bg-gradient-to-r from-primary/50 to-transparent hidden md:block"></div>
              </div>
              <h3 className="text-2xl font-semibold mb-4">Choose Your Focus</h3>
              <p className="text-muted-foreground text-lg">
                Select from various relationship focus areas that matter most to you and your partner right now.
              </p>
            </div>

            <div className="text-center">
              <div className="relative mb-8">
                <div className="h-20 w-20 rounded-full bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center mx-auto text-white text-2xl font-bold">
                  2
                </div>
                <div className="absolute top-10 left-1/2 w-full h-0.5 bg-gradient-to-r from-primary/50 to-transparent hidden md:block"></div>
              </div>
              <h3 className="text-2xl font-semibold mb-4">Engage Together</h3>
              <p className="text-muted-foreground text-lg">
                Work through guided prompts and exercises designed to foster open, honest communication.
              </p>
            </div>

            <div className="text-center">
              <div className="relative mb-8">
                <div className="h-20 w-20 rounded-full bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center mx-auto text-white text-2xl font-bold">
                  3
                </div>
              </div>
              <h3 className="text-2xl font-semibold mb-4">Grow & Align</h3>
              <p className="text-muted-foreground text-lg">
                Receive insights and track your progress as you build stronger alignment and deeper understanding.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-24 bg-gradient-to-b from-muted/30 to-background">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center max-w-7xl mx-auto">
            <div>
              <Badge variant="outline" className="mb-4">
                Why AlignSynch
              </Badge>
              <h2 className="text-4xl md:text-5xl font-bold mb-8">Built for Real Relationships</h2>
              <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                We understand that every relationship is unique. That's why AlignSynch adapts to your specific needs and
                communication styles.
              </p>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <CheckCircle className="h-6 w-6 text-green-500 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Evidence-Based Approach</h3>
                    <p className="text-muted-foreground">
                      Our methods are grounded in relationship psychology and proven communication techniques.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <CheckCircle className="h-6 w-6 text-green-500 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Privacy First</h3>
                    <p className="text-muted-foreground">
                      Your conversations and insights remain completely private and secure.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <CheckCircle className="h-6 w-6 text-green-500 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Flexible & Adaptive</h3>
                    <p className="text-muted-foreground">
                      Sessions adapt to your schedule and relationship stage, growing with you over time.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="relative bg-gradient-to-br from-primary/10 to-accent/10 rounded-3xl p-8 h-[500px] overflow-hidden">
                {/* Floating Cards Animation */}
                <div className="absolute top-8 left-8 w-48 h-32 bg-white rounded-xl shadow-lg p-4 rotate-3 animate-pulse">
                  <div className="flex items-center gap-2 mb-3">
                    <Heart className="h-4 w-4 text-red-400" />
                    <div className="h-3 w-20 bg-primary/20 rounded"></div>
                  </div>
                  <div className="space-y-2">
                    <div className="h-2 w-full bg-muted rounded"></div>
                    <div className="h-2 w-3/4 bg-muted rounded"></div>
                    <div className="h-2 w-1/2 bg-muted rounded"></div>
                  </div>
                </div>

                <div
                  className="absolute bottom-8 right-8 w-52 h-36 bg-white rounded-xl shadow-lg p-4 -rotate-2 animate-pulse"
                  style={{ animationDelay: "1s" }}
                >
                  <div className="flex items-center gap-2 mb-3">
                    <MessageCircle className="h-4 w-4 text-blue-400" />
                    <div className="h-3 w-24 bg-primary/20 rounded"></div>
                  </div>
                  <div className="space-y-2">
                    <div className="h-2 w-full bg-muted rounded"></div>
                    <div className="h-2 w-4/5 bg-muted rounded"></div>
                    <div className="h-2 w-2/3 bg-muted rounded"></div>
                  </div>
                </div>

                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-white rounded-full shadow-lg flex items-center justify-center">
                  <Users className="h-12 w-12 text-primary" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-primary via-primary/90 to-accent text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-4xl md:text-6xl font-bold mb-6">Ready to Nurture Your Relationship?</h2>
          <p className="text-xl md:text-2xl mb-12 max-w-3xl mx-auto opacity-90 leading-relaxed">
            Start your first alignment session and discover a new way to connect, understand, and grow together.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/session/new">
              <Button size="lg" variant="secondary" className="gap-2 text-lg px-8 py-4 h-auto">
                <Heart className="h-5 w-5" />
                Start a Free Session
                <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
            <Link href="/focus-areas">
              <Button
                size="lg"
                variant="outline"
                className="gap-2 text-lg px-8 py-4 h-auto bg-transparent border-white/30 text-white hover:bg-white/10"
              >
                <Globe className="h-5 w-5" />
                Explore All Features
              </Button>
            </Link>
          </div>

          <div className="mt-12 text-sm opacity-75">No credit card required • Free to start • Cancel anytime</div>
        </div>
      </section>
    </>
  )
}
