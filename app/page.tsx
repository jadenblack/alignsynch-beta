import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Heart,
  Users,
  Target,
  TrendingUp,
  CheckCircle,
  Star,
  ArrowRight,
  Play,
  MessageCircle,
  Shield,
  Zap,
} from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="community-hero py-20 lg:py-32 relative">
        <div className="container mx-auto px-4 text-center relative z-10">
          {/* Social Proof */}
          <div className="flex items-center justify-center gap-2 mb-6">
            <div className="flex -space-x-2">
              <div className="social-proof-avatar bg-gradient-to-br from-primary/20 to-primary/40"></div>
              <div className="social-proof-avatar bg-gradient-to-br from-primary/30 to-primary/50"></div>
              <div className="social-proof-avatar bg-gradient-to-br from-primary/40 to-primary/60"></div>
              <div className="social-proof-avatar bg-gradient-to-br from-primary/50 to-primary/70"></div>
            </div>
            <div className="flex items-center gap-1 ml-3">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 rating-star fill-current" />
              ))}
              <span className="text-sm text-muted-foreground ml-2">Trusted by 10,000+ couples</span>
            </div>
          </div>

          {/* Main Headline */}
          <h1 className="text-hero gradient-text mb-6 max-w-4xl mx-auto">
            Transform Your Relationships with AI-Powered Alignment
          </h1>

          <p className="text-body text-muted-foreground mb-8 max-w-2xl mx-auto">
            Discover deeper connections, resolve conflicts faster, and build stronger relationships through personalized
            insights and guided conversations.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Link href="/signup">
              <Button className="cta-primary">
                Start Your Journey
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="/demo">
              <Button variant="outline" className="cta-secondary bg-transparent">
                <Play className="mr-2 h-4 w-4" />
                Watch Demo
              </Button>
            </Link>
          </div>

          {/* Trust Indicators */}
          <div className="flex flex-wrap justify-center items-center gap-8 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-primary" />
              <span>Privacy Protected</span>
            </div>
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-primary" />
              <span>Instant Results</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-primary" />
              <span>Science-Backed</span>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">Core Features</Badge>
            <h2 className="text-title mb-4">Everything you need for relationship success</h2>
            <p className="text-subtle max-w-2xl mx-auto">
              Our comprehensive platform provides tools, insights, and guidance to help you build stronger, more aligned
              relationships.
            </p>
          </div>

          <div className="grid-responsive">
            {[
              {
                icon: Heart,
                title: "Relationship Assessment",
                description:
                  "Deep insights into your relationship dynamics, communication patterns, and compatibility factors.",
              },
              {
                icon: MessageCircle,
                title: "Guided Conversations",
                description: "AI-powered conversation starters and conflict resolution tools for meaningful dialogue.",
              },
              {
                icon: Target,
                title: "Goal Alignment",
                description: "Identify shared values, align life goals, and create a roadmap for your future together.",
              },
              {
                icon: TrendingUp,
                title: "Progress Tracking",
                description: "Monitor your relationship growth with detailed analytics and milestone celebrations.",
              },
              {
                icon: Users,
                title: "Community Support",
                description: "Connect with other couples, share experiences, and learn from relationship experts.",
              },
              {
                icon: Shield,
                title: "Privacy First",
                description: "Your relationship data is encrypted, secure, and never shared without your consent.",
              },
            ].map((feature, index) => (
              <Card key={index} className="card-hover themed-card">
                <CardContent className="p-6">
                  <div className="feature-icon mb-4">
                    <feature.icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">How It Works</Badge>
            <h2 className="text-title mb-4">Simple steps to relationship transformation</h2>
            <p className="text-subtle max-w-2xl mx-auto">
              Get started in minutes and begin your journey toward deeper connection and understanding.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            {[
              {
                step: "1",
                title: "Take the Assessment",
                description:
                  "Complete our comprehensive relationship assessment to understand your current dynamics and areas for growth.",
              },
              {
                step: "2",
                title: "Get Personalized Insights",
                description:
                  "Receive AI-powered insights, recommendations, and action plans tailored to your unique relationship.",
              },
              {
                step: "3",
                title: "Grow Together",
                description:
                  "Use guided exercises, track progress, and celebrate milestones as you build a stronger relationship.",
              },
            ].map((step, index) => (
              <div key={index} className="text-center animate-fade-in-up" style={{ animationDelay: `${index * 0.2}s` }}>
                <div className="step-number mx-auto mb-4">{step.step}</div>
                <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 gradient-bg">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">Benefits</Badge>
              <h2 className="text-title mb-6">Why couples choose AlignSynch</h2>
              <div className="space-y-4">
                {[
                  "Improve communication and reduce conflicts",
                  "Discover shared values and life goals",
                  "Build deeper emotional intimacy",
                  "Create actionable relationship plans",
                  "Track progress with detailed insights",
                  "Access expert guidance and resources",
                ].map((benefit, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="benefit-check mt-0.5">
                      <CheckCircle className="w-3 h-3" />
                    </div>
                    <span className="text-foreground">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square bg-gradient-to-br from-primary/20 to-primary/5 rounded-2xl p-8 animate-float">
                <div className="w-full h-full bg-card rounded-xl shadow-lg flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse-glow">
                      <Heart className="w-8 h-8 text-primary-foreground" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">Relationship Score</h3>
                    <div className="text-3xl font-bold gradient-text">87%</div>
                    <p className="text-sm text-muted-foreground">Strong & Growing</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-title mb-4">Ready to transform your relationship?</h2>
          <p className="text-body text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join thousands of couples who have already discovered the power of aligned relationships.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/signup">
              <Button className="cta-primary">
                Get Started Free
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="/contact">
              <Button variant="outline" className="cta-secondary bg-transparent">
                Talk to an Expert
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
