"use client"

import { useState } from "react"
import {
  EmotionalCard,
  EmotionalCardContent,
  EmotionalCardDescription,
  EmotionalCardHeader,
  EmotionalCardTitle,
} from "@/components/ui/emotional-card"
import { CollaborativeButton } from "@/components/ui/collaborative-button"
import { EmpathyBadge } from "@/components/ui/empathy-badge"
import { RelationshipProgress } from "@/components/ui/relationship-progress"
import { Brain, Heart, Users, Sparkles, Target, Trophy, MessageCircle, Star } from "lucide-react"

export function DesignShowcase() {
  const [selectedCategory, setSelectedCategory] = useState("wellness")

  const categories = [
    { id: "wellness", name: "Wellness", icon: Heart, color: "warmth" },
    { id: "relationships", name: "Relationships", icon: Users, color: "connection" },
    { id: "growth", name: "Personal Growth", icon: Target, color: "growth" },
    { id: "celebration", name: "Achievements", icon: Trophy, color: "celebration" },
  ]

  const quizzes = {
    wellness: [
      {
        title: "Morning Mindfulness",
        description: "Start your day with intention and presence",
        progress: 75,
        participants: 1247,
        difficulty: "Beginner",
        duration: "5 min",
      },
      {
        title: "Stress Management Techniques",
        description: "Learn healthy ways to cope with daily stress",
        progress: 45,
        participants: 892,
        difficulty: "Intermediate",
        duration: "10 min",
      },
    ],
    relationships: [
      {
        title: "Active Listening Skills",
        description: "Deepen connections through mindful communication",
        progress: 60,
        participants: 2156,
        difficulty: "Beginner",
        duration: "8 min",
      },
      {
        title: "Conflict Resolution",
        description: "Navigate disagreements with empathy and understanding",
        progress: 30,
        participants: 743,
        difficulty: "Advanced",
        duration: "15 min",
      },
    ],
    growth: [
      {
        title: "Goal Setting Mastery",
        description: "Create meaningful objectives that inspire action",
        progress: 85,
        participants: 1634,
        difficulty: "Intermediate",
        duration: "12 min",
      },
      {
        title: "Emotional Intelligence",
        description: "Understand and manage emotions effectively",
        progress: 55,
        participants: 987,
        difficulty: "Advanced",
        duration: "18 min",
      },
    ],
    celebration: [
      {
        title: "Gratitude Practice",
        description: "Cultivate appreciation for life's moments",
        progress: 90,
        participants: 3421,
        difficulty: "Beginner",
        duration: "5 min",
      },
      {
        title: "Success Reflection",
        description: "Acknowledge and learn from your achievements",
        progress: 70,
        participants: 1876,
        difficulty: "Intermediate",
        duration: "10 min",
      },
    ],
  }

  return (
    <div className="container-emotional py-12 space-y-12">
      {/* Hero Section */}
      <div className="text-center space-y-6">
        <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-r from-primary/10 via-accent/10 to-celebration/10 border border-primary/20">
          <Brain className="h-6 w-6 text-primary animate-warm-pulse" />
          <span className="text-warmth font-medium">AlignSynch Design System</span>
          <Sparkles className="h-5 w-5 text-accent animate-gentle-bounce" />
        </div>

        <h1 className="text-hero bg-gradient-to-r from-primary via-collaboration to-accent bg-clip-text text-transparent">
          Emotional Connection Through Design
        </h1>

        <p className="text-empathy max-w-2xl mx-auto">
          Experience a design system that prioritizes human connection, collaborative engagement, and emotional
          well-being in every interaction.
        </p>
      </div>

      {/* Category Selection */}
      <div className="flex flex-wrap justify-center gap-4">
        {categories.map((category) => {
          const Icon = category.icon
          const isSelected = selectedCategory === category.id

          return (
            <CollaborativeButton
              key={category.id}
              variant={isSelected ? (category.color as any) : "outline"}
              size="lg"
              onClick={() => setSelectedCategory(category.id)}
              className={`gap-3 ${isSelected ? "animate-warm-pulse" : "warmth-glow"}`}
            >
              <Icon className="h-5 w-5" />
              {category.name}
            </CollaborativeButton>
          )
        })}
      </div>

      {/* Quiz Cards */}
      <div className="grid-collaborative">
        {quizzes[selectedCategory as keyof typeof quizzes]?.map((quiz, index) => (
          <EmotionalCard
            key={index}
            variant="interactive"
            className="animate-collaborative-slide"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <EmotionalCardHeader>
              <div className="flex items-start justify-between">
                <EmotionalCardTitle>{quiz.title}</EmotionalCardTitle>
                <EmpathyBadge variant="empathy" size="sm">
                  <Star className="h-3 w-3 mr-1" />
                  4.8
                </EmpathyBadge>
              </div>
              <EmotionalCardDescription>{quiz.description}</EmotionalCardDescription>
            </EmotionalCardHeader>

            <EmotionalCardContent className="space-y-4">
              <RelationshipProgress
                value={quiz.progress}
                variant={categories.find((c) => c.id === selectedCategory)?.color as any}
                showLabel
                label="Progress"
              />

              <div className="flex items-center justify-between">
                <div className="relationship-indicator">
                  <Users className="h-4 w-4 text-connection" />
                  <span className="text-intimate">{quiz.participants.toLocaleString()} learners</span>
                </div>

                <div className="flex gap-2">
                  <EmpathyBadge variant="outline" size="sm">
                    {quiz.difficulty}
                  </EmpathyBadge>
                  <EmpathyBadge variant="secondary" size="sm">
                    {quiz.duration}
                  </EmpathyBadge>
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <CollaborativeButton variant="collaborative" className="flex-1">
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Start Learning
                </CollaborativeButton>
                <CollaborativeButton variant="outline" size="icon">
                  <Heart className="h-4 w-4" />
                </CollaborativeButton>
              </div>
            </EmotionalCardContent>
          </EmotionalCard>
        ))}
      </div>

      {/* Design Principles */}
      <div className="space-y-8">
        <h2 className="text-connection text-center">Design Principles</h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              icon: Heart,
              title: "Emotional Connection",
              description: "Every element is designed to foster genuine human connection and empathy.",
              color: "warmth",
            },
            {
              icon: Users,
              title: "Collaborative Spirit",
              description: "Interfaces that encourage sharing, learning, and growing together.",
              color: "connection",
            },
            {
              icon: Sparkles,
              title: "Joyful Interactions",
              description: "Delightful micro-interactions that celebrate progress and achievements.",
              color: "celebration",
            },
            {
              icon: Target,
              title: "Purposeful Design",
              description: "Every design decision serves the user's journey toward personal growth.",
              color: "growth",
            },
          ].map((principle, index) => {
            const Icon = principle.icon
            return (
              <EmotionalCard
                key={index}
                variant="empathy"
                className="text-center animate-collaborative-slide"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <EmotionalCardContent className="space-y-4">
                  <div
                    className={`mx-auto w-16 h-16 rounded-2xl bg-gradient-to-br from-${principle.color}-400/20 to-${principle.color}-500/20 flex items-center justify-center`}
                  >
                    <Icon className={`h-8 w-8 text-${principle.color}-500`} />
                  </div>
                  <div>
                    <h3 className="text-warmth font-semibold mb-2">{principle.title}</h3>
                    <p className="text-empathy text-sm">{principle.description}</p>
                  </div>
                </EmotionalCardContent>
              </EmotionalCard>
            )
          })}
        </div>
      </div>
    </div>
  )
}
