"use client"

import { useState } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Zap, Clock, Target, Brain, Settings, Play, ArrowLeft, Info } from "lucide-react"

const categories = [
  { id: "javascript", name: "JavaScript", icon: "🟨" },
  { id: "python", name: "Python", icon: "🐍" },
  { id: "typescript", name: "TypeScript", icon: "📘" },
  { id: "react", name: "React", icon: "⚛️" },
  { id: "nodejs", name: "Node.js", icon: "🟢" },
  { id: "java", name: "Java", icon: "☕" },
  { id: "csharp", name: "C#", icon: "🔷" },
  { id: "go", name: "Go", icon: "🐹" },
  { id: "rust", name: "Rust", icon: "🦀" },
  { id: "sql", name: "SQL", icon: "🗄️" },
]

const difficulties = [
  { id: "beginner", name: "Beginner", description: "Basic concepts and syntax", color: "text-green-600" },
  { id: "intermediate", name: "Intermediate", description: "Advanced features and patterns", color: "text-yellow-600" },
  { id: "advanced", name: "Advanced", description: "Complex algorithms and optimization", color: "text-red-600" },
  { id: "mixed", name: "Mixed", description: "Adaptive difficulty based on performance", color: "text-blue-600" },
]

export default function NewQuizPage() {
  const searchParams = useSearchParams()
  const preselectedCategory = searchParams.get("category")

  const [selectedCategory, setSelectedCategory] = useState(preselectedCategory || "")
  const [difficulty, setDifficulty] = useState("mixed")
  const [questionCount, setQuestionCount] = useState([10])
  const [timeLimit, setTimeLimit] = useState([30])
  const [enableHints, setEnableHints] = useState(true)
  const [enableExplanations, setEnableExplanations] = useState(true)
  const [focusAreas, setFocusAreas] = useState<string[]>([])

  const selectedCategoryData = categories.find((cat) => cat.id === selectedCategory)
  const selectedDifficultyData = difficulties.find((diff) => diff.id === difficulty)

  const canStartQuiz = selectedCategory && difficulty

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <Link href="/categories">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold">Create New Quiz</h1>
          <p className="text-muted-foreground">Customize your AI-generated coding quiz experience</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Configuration Panel */}
        <div className="lg:col-span-2 space-y-6">
          {/* Category Selection */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5" />
                Programming Language
              </CardTitle>
              <CardDescription>Choose the programming language or technology for your quiz</CardDescription>
            </CardHeader>
            <CardContent>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a programming language" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category.id} value={category.id}>
                      <div className="flex items-center gap-2">
                        <span>{category.icon}</span>
                        <span>{category.name}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </CardContent>
          </Card>

          {/* Difficulty Selection */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="h-5 w-5" />
                Difficulty Level
              </CardTitle>
              <CardDescription>Set the complexity level for your quiz questions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {difficulties.map((diff) => (
                  <div
                    key={diff.id}
                    className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                      difficulty === diff.id ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"
                    }`}
                    onClick={() => setDifficulty(diff.id)}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h3 className={`font-semibold ${diff.color}`}>{diff.name}</h3>
                      {difficulty === diff.id && <div className="w-2 h-2 rounded-full bg-primary"></div>}
                    </div>
                    <p className="text-sm text-muted-foreground">{diff.description}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quiz Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5" />
                Quiz Settings
              </CardTitle>
              <CardDescription>Customize the quiz format and assistance options</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Question Count */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label htmlFor="question-count">Number of Questions</Label>
                  <Badge variant="outline">{questionCount[0]} questions</Badge>
                </div>
                <Slider
                  id="question-count"
                  min={5}
                  max={50}
                  step={5}
                  value={questionCount}
                  onValueChange={setQuestionCount}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>5 min</span>
                  <span>50 max</span>
                </div>
              </div>

              <Separator />

              {/* Time Limit */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label htmlFor="time-limit">Time per Question (seconds)</Label>
                  <Badge variant="outline" className="gap-1">
                    <Clock className="h-3 w-3" />
                    {timeLimit[0]}s
                  </Badge>
                </div>
                <Slider
                  id="time-limit"
                  min={15}
                  max={120}
                  step={15}
                  value={timeLimit}
                  onValueChange={setTimeLimit}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>15s</span>
                  <span>2min</span>
                </div>
              </div>

              <Separator />

              {/* Assistance Options */}
              <div className="space-y-4">
                <h4 className="font-medium">Assistance Options</h4>

                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label htmlFor="hints">Enable Hints</Label>
                    <p className="text-xs text-muted-foreground">Get helpful hints when you're stuck</p>
                  </div>
                  <Switch id="hints" checked={enableHints} onCheckedChange={setEnableHints} />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label htmlFor="explanations">Detailed Explanations</Label>
                    <p className="text-xs text-muted-foreground">See explanations after each question</p>
                  </div>
                  <Switch id="explanations" checked={enableExplanations} onCheckedChange={setEnableExplanations} />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Summary Panel */}
        <div className="space-y-6">
          {/* Quiz Preview */}
          <Card className="sticky top-4">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5" />
                Quiz Preview
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {selectedCategoryData && (
                <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                  <div className="text-2xl">{selectedCategoryData.icon}</div>
                  <div>
                    <h3 className="font-semibold">{selectedCategoryData.name}</h3>
                    <p className="text-sm text-muted-foreground">Programming Language</p>
                  </div>
                </div>
              )}

              {selectedDifficultyData && (
                <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                  <div>
                    <h4 className="font-medium">Difficulty</h4>
                    <p className={`text-sm ${selectedDifficultyData.color}`}>{selectedDifficultyData.name}</p>
                  </div>
                </div>
              )}

              <Separator />

              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Questions:</span>
                  <span className="font-medium">{questionCount[0]}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Time per question:</span>
                  <span className="font-medium">{timeLimit[0]}s</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Estimated time:</span>
                  <span className="font-medium">{Math.ceil((questionCount[0] * timeLimit[0]) / 60)} min</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Hints:</span>
                  <span className="font-medium">{enableHints ? "Enabled" : "Disabled"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Explanations:</span>
                  <span className="font-medium">{enableExplanations ? "Enabled" : "Disabled"}</span>
                </div>
              </div>

              <Separator />

              <div className="space-y-3">
                <Link href={canStartQuiz ? "/quiz/play" : "#"}>
                  <Button className="w-full gap-2" disabled={!canStartQuiz} size="lg">
                    <Play className="h-4 w-4" />
                    Start Quiz
                  </Button>
                </Link>

                {!canStartQuiz && (
                  <div className="flex items-start gap-2 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <Info className="h-4 w-4 text-yellow-600 mt-0.5 shrink-0" />
                    <p className="text-sm text-yellow-800">
                      Please select a programming language and difficulty level to start your quiz.
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Quick Start Options */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Quick Start</CardTitle>
              <CardDescription>Popular quiz configurations</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button
                variant="outline"
                className="w-full justify-start gap-2 bg-transparent"
                onClick={() => {
                  setSelectedCategory("javascript")
                  setDifficulty("beginner")
                  setQuestionCount([10])
                  setTimeLimit([30])
                }}
              >
                <span>🟨</span>
                JavaScript Basics
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start gap-2 bg-transparent"
                onClick={() => {
                  setSelectedCategory("python")
                  setDifficulty("intermediate")
                  setQuestionCount([15])
                  setTimeLimit([45])
                }}
              >
                <span>🐍</span>
                Python Challenge
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start gap-2 bg-transparent"
                onClick={() => {
                  setSelectedCategory("react")
                  setDifficulty("advanced")
                  setQuestionCount([20])
                  setTimeLimit([60])
                }}
              >
                <span>⚛️</span>
                React Expert
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
