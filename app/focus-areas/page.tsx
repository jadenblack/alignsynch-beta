import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { focusAreas } from "@/lib/focus-areas-data"
import { ArrowRight, Clock, HelpCircle } from "lucide-react"

export default function FocusAreasPage() {
  return (
    <div className="min-h-screen bg-muted/30">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Focus Areas</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Choose an area of your relationship to explore. Each session provides guided questions to help you and your
            partner connect and align.
          </p>
        </div>

        {/* Focus Areas Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {focusAreas.map((area) => (
            <Card key={area.id} className="flex flex-col hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center gap-4 mb-3">
                  <div
                    className={`w-12 h-12 rounded-lg flex items-center justify-center bg-gradient-to-br ${area.color}`}
                  >
                    <area.icon className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle className="text-xl">{area.title}</CardTitle>
                </div>
                <CardDescription>{area.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow flex flex-col justify-end">
                <div className="flex justify-between items-center text-sm text-muted-foreground mb-4">
                  <div className="flex items-center gap-1">
                    <HelpCircle className="w-4 h-4" />
                    <span>{area.questions} questions</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>~{area.avgTime}</span>
                  </div>
                </div>
                <Link href={`/session/new?area=${area.id}`}>
                  <Button className="w-full">
                    Start Session
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
