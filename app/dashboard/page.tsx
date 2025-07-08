"use client"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { mockRelationshipData } from "@/lib/relationship-data"
import { Heart, Target, MessageCircle, Calendar, Check, Zap, ArrowRight, Clock } from "lucide-react"

export default function DashboardPage() {
  const { partner, connectionScore, alignmentHistory, upcomingCheckIn, sharedGoals, strengths, growthAreas } =
    mockRelationshipData

  return (
    <div className="min-h-screen bg-muted/30">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">Relationship Dashboard</h1>
            <p className="text-muted-foreground">Your shared space for connection and growth with {partner.name}.</p>
          </div>
          <Link href="/session/new">
            <Button className="mt-4 md:mt-0 gap-2">
              <Zap className="w-4 h-4" />
              Start New Session
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Connection Score */}
            <Card className="bg-gradient-to-br from-primary/90 to-primary text-primary-foreground">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Heart />
                  Connection Score
                </CardTitle>
                <CardDescription className="text-primary-foreground/80">
                  A snapshot of your overall alignment and connection.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-baseline gap-4">
                  <div className="text-6xl font-bold">{connectionScore}</div>
                  <div className="text-2xl font-medium">/ 100</div>
                </div>
                <Progress value={connectionScore} className="mt-4 h-3 [&>div]:bg-white" />
              </CardContent>
            </Card>

            {/* Upcoming Check-in */}
            {upcomingCheckIn && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="text-primary" />
                    Upcoming Check-in
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">{upcomingCheckIn.focusArea}</p>
                    <p className="text-sm text-muted-foreground">
                      Scheduled for {new Date(upcomingCheckIn.date).toLocaleDateString("en-US", { weekday: "long" })}
                    </p>
                  </div>
                  <Link href={`/session/new?area=${upcomingCheckIn.focusArea.toLowerCase().replace(" ", "-")}`}>
                    <Button variant="outline">Start Now</Button>
                  </Link>
                </CardContent>
              </Card>
            )}

            {/* Shared Goals */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target />
                  Shared Goals
                </CardTitle>
                <CardDescription>Your collective aspirations and dreams.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {sharedGoals.map((goal) => (
                  <div key={goal.title} className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">{goal.title}</p>
                      <p className="text-sm text-muted-foreground">Target: {goal.targetDate}</p>
                    </div>
                    <Badge variant={goal.status === "completed" ? "default" : "outline"}>
                      {goal.status === "completed" ? (
                        <Check className="w-3 h-3 mr-1" />
                      ) : (
                        <Clock className="w-3 h-3 mr-1" />
                      )}
                      {goal.status}
                    </Badge>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Partner Card */}
            <Card>
              <CardContent className="p-6 flex items-center gap-4">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={partner.avatar || "/placeholder.svg"} />
                  <AvatarFallback>{partner.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm text-muted-foreground">Your Partner</p>
                  <p className="font-semibold text-lg">{partner.name}</p>
                </div>
              </CardContent>
            </Card>

            {/* Strengths & Growth */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Our Dynamics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                  <h4 className="font-medium mb-2 text-green-600">Strengths</h4>
                  <div className="flex flex-wrap gap-2">
                    {strengths.map((strength) => (
                      <Badge key={strength} variant="secondary" className="bg-green-100 text-green-800">
                        {strength}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="font-medium mb-2 text-amber-600">Growth Areas</h4>
                  <div className="flex flex-wrap gap-2">
                    {growthAreas.map((area) => (
                      <Badge key={area} variant="secondary" className="bg-amber-100 text-amber-800">
                        {area}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Alignment History */}
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <MessageCircle />
                    Recent Sessions
                  </CardTitle>
                  <Link href="/our-journey">
                    <Button variant="ghost" size="sm" className="gap-1">
                      View All
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                {alignmentHistory.slice(0, 3).map((session) => (
                  <div key={session.date} className="flex items-center justify-between text-sm">
                    <div>
                      <p className="font-medium">{session.focusArea}</p>
                      <p className="text-xs text-muted-foreground">{new Date(session.date).toLocaleDateString()}</p>
                    </div>
                    <div className="font-semibold">{session.score}%</div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
