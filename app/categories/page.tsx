"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Code, Search, Filter, Star, Users, TrendingUp, Zap, BookOpen, Target } from "lucide-react"

const programmingLanguages = [
  {
    id: "javascript",
    name: "JavaScript",
    description: "Modern web development with ES6+ features, async/await, and frameworks",
    difficulty: "Beginner",
    topics: 45,
    users: 12500,
    trending: true,
    color: "from-yellow-400 to-yellow-600",
    icon: "🟨",
  },
  {
    id: "python",
    name: "Python",
    description: "Data science, web development, automation, and machine learning",
    difficulty: "Beginner",
    topics: 52,
    users: 15200,
    trending: true,
    color: "from-blue-400 to-blue-600",
    icon: "🐍",
  },
  {
    id: "typescript",
    name: "TypeScript",
    description: "Type-safe JavaScript for large-scale applications and better tooling",
    difficulty: "Intermediate",
    topics: 38,
    users: 8900,
    trending: true,
    color: "from-blue-500 to-blue-700",
    icon: "📘",
  },
  {
    id: "react",
    name: "React",
    description: "Component-based UI library with hooks, context, and modern patterns",
    difficulty: "Intermediate",
    topics: 42,
    users: 11300,
    trending: true,
    color: "from-cyan-400 to-cyan-600",
    icon: "⚛️",
  },
  {
    id: "nodejs",
    name: "Node.js",
    description: "Server-side JavaScript runtime for building scalable applications",
    difficulty: "Intermediate",
    topics: 35,
    users: 9800,
    trending: false,
    color: "from-green-400 to-green-600",
    icon: "🟢",
  },
  {
    id: "java",
    name: "Java",
    description: "Enterprise applications, Android development, and system programming",
    difficulty: "Intermediate",
    topics: 48,
    users: 13700,
    trending: false,
    color: "from-red-400 to-red-600",
    icon: "☕",
  },
  {
    id: "csharp",
    name: "C#",
    description: ".NET development, desktop applications, and web services",
    difficulty: "Intermediate",
    topics: 41,
    users: 7600,
    trending: false,
    color: "from-purple-400 to-purple-600",
    icon: "🔷",
  },
  {
    id: "go",
    name: "Go",
    description: "Cloud-native development, microservices, and concurrent programming",
    difficulty: "Advanced",
    topics: 28,
    users: 5400,
    trending: true,
    color: "from-teal-400 to-teal-600",
    icon: "🐹",
  },
  {
    id: "rust",
    name: "Rust",
    description: "Systems programming with memory safety and zero-cost abstractions",
    difficulty: "Advanced",
    topics: 32,
    users: 4200,
    trending: true,
    color: "from-orange-400 to-orange-600",
    icon: "🦀",
  },
  {
    id: "sql",
    name: "SQL",
    description: "Database queries, data analysis, and relational database management",
    difficulty: "Beginner",
    topics: 36,
    users: 10900,
    trending: false,
    color: "from-indigo-400 to-indigo-600",
    icon: "🗄️",
  },
  {
    id: "docker",
    name: "Docker",
    description: "Containerization, deployment, and DevOps practices",
    difficulty: "Intermediate",
    topics: 24,
    users: 6800,
    trending: true,
    color: "from-blue-400 to-blue-500",
    icon: "🐳",
  },
  {
    id: "aws",
    name: "AWS",
    description: "Cloud computing, serverless architecture, and infrastructure",
    difficulty: "Advanced",
    topics: 39,
    users: 8100,
    trending: true,
    color: "from-orange-500 to-yellow-500",
    icon: "☁️",
  },
]

const difficultyColors = {
  Beginner: "bg-green-100 text-green-800 border-green-200",
  Intermediate: "bg-yellow-100 text-yellow-800 border-yellow-200",
  Advanced: "bg-red-100 text-red-800 border-red-200",
}

export default function CategoriesPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedDifficulty, setSelectedDifficulty] = useState("all")
  const [showTrendingOnly, setShowTrendingOnly] = useState(false)

  const filteredLanguages = programmingLanguages.filter((lang) => {
    const matchesSearch =
      lang.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lang.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesDifficulty = selectedDifficulty === "all" || lang.difficulty === selectedDifficulty
    const matchesTrending = !showTrendingOnly || lang.trending

    return matchesSearch && matchesDifficulty && matchesTrending
  })

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
          <Code className="h-4 w-4" />
          <span>Programming Categories</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold">
          Choose Your <span className="text-primary">Programming Language</span>
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Select from our comprehensive collection of programming languages and technologies. Each category offers
          AI-generated quizzes tailored to your skill level.
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between p-4 bg-muted/30 rounded-xl">
        <div className="flex items-center gap-4 flex-1 w-full md:w-auto">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search languages and technologies..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <Filter className="w-4 h-4 text-muted-foreground" />
          <div className="flex gap-1">
            {["all", "Beginner", "Intermediate", "Advanced"].map((difficulty) => (
              <Button
                key={difficulty}
                size="sm"
                variant={selectedDifficulty === difficulty ? "default" : "outline"}
                onClick={() => setSelectedDifficulty(difficulty)}
                className="h-8"
              >
                {difficulty === "all" ? "All Levels" : difficulty}
              </Button>
            ))}
          </div>
          <Button
            size="sm"
            variant={showTrendingOnly ? "default" : "outline"}
            onClick={() => setShowTrendingOnly(!showTrendingOnly)}
            className="h-8 gap-1"
          >
            <TrendingUp className="w-3 h-3" />
            Trending
          </Button>
        </div>
      </div>

      {/* Results Count */}
      <div className="flex items-center justify-between">
        <p className="text-muted-foreground">
          Showing {filteredLanguages.length} of {programmingLanguages.length} categories
        </p>
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Users className="w-4 h-4" />
            <span>{programmingLanguages.reduce((sum, lang) => sum + lang.users, 0).toLocaleString()} learners</span>
          </div>
          <div className="flex items-center gap-1">
            <BookOpen className="w-4 h-4" />
            <span>{programmingLanguages.reduce((sum, lang) => sum + lang.topics, 0)} topics</span>
          </div>
        </div>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredLanguages.map((language) => (
          <Card
            key={language.id}
            className="group hover:shadow-lg transition-all duration-300 hover:scale-[1.02] border-border/50"
          >
            <CardHeader className="pb-4">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-12 h-12 rounded-lg bg-gradient-to-br ${language.color} flex items-center justify-center text-2xl`}
                  >
                    {language.icon}
                  </div>
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      {language.name}
                      {language.trending && (
                        <Badge variant="secondary" className="text-xs gap-1">
                          <TrendingUp className="w-3 h-3" />
                          Trending
                        </Badge>
                      )}
                    </CardTitle>
                    <Badge
                      variant="outline"
                      className={`text-xs mt-1 ${difficultyColors[language.difficulty as keyof typeof difficultyColors]}`}
                    >
                      {language.difficulty}
                    </Badge>
                  </div>
                </div>
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              <CardDescription className="text-sm leading-relaxed">{language.description}</CardDescription>

              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1">
                    <BookOpen className="w-4 h-4" />
                    <span>{language.topics} topics</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    <span>{language.users.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              <div className="flex gap-2 pt-2">
                <Link href={`/quiz/new?category=${language.id}`} className="flex-1">
                  <Button className="w-full gap-2 group-hover:bg-primary/90 transition-colors">
                    <Zap className="w-4 h-4" />
                    Start Quiz
                  </Button>
                </Link>
                <Link href={`/categories/${language.id}`}>
                  <Button variant="outline" size="icon" className="shrink-0 bg-transparent">
                    <Target className="w-4 h-4" />
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {filteredLanguages.length === 0 && (
        <div className="text-center py-12">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-muted flex items-center justify-center">
            <Search className="w-8 h-8 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-semibold mb-2">No categories found</h3>
          <p className="text-muted-foreground mb-4">
            Try adjusting your search terms or filters to find what you're looking for.
          </p>
          <Button
            variant="outline"
            onClick={() => {
              setSearchQuery("")
              setSelectedDifficulty("all")
              setShowTrendingOnly(false)
            }}
          >
            Clear Filters
          </Button>
        </div>
      )}

      {/* CTA Section */}
      <div className="mt-16 text-center p-8 bg-gradient-to-r from-primary/10 to-accent/10 rounded-2xl border border-primary/20">
        <h2 className="text-2xl font-bold mb-4">Can't find what you're looking for?</h2>
        <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
          We're constantly adding new programming languages and technologies. Suggest a category or start with our most
          popular options.
        </p>
        <div className="flex gap-4 justify-center flex-wrap">
          <Link href="/contact">
            <Button variant="outline">Suggest a Category</Button>
          </Link>
          <Link href="/quiz/new">
            <Button className="gap-2">
              <Star className="w-4 h-4" />
              Try Popular Quiz
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
