import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

export default function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-64px)] bg-gray-50 dark:bg-gray-900 p-4">
      <div className="max-w-4xl w-full space-y-8 text-center">
        <h1 className="text-5xl font-extrabold tracking-tight text-gray-900 dark:text-gray-50 sm:text-6xl md:text-7xl">
          Welcome to <span className="text-primary">AlignSynch Beta</span>
        </h1>
        <p className="mt-4 text-xl text-gray-600 dark:text-gray-400 leading-relaxed">
          Your comprehensive platform for relationship alignment and communication. Discover tools to foster deeper
          connections and stronger partnerships.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8">
          <Link href="/auth/signin" passHref>
            <Button size="lg" className="w-full sm:w-auto">
              Get Started
            </Button>
          </Link>
          <Link href="/dashboard" passHref>
            <Button size="lg" variant="outline" className="w-full sm:w-auto bg-transparent">
              View Dashboard
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          <Card className="flex flex-col items-center p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-primary">Feature 1</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-700 dark:text-gray-300">
              <p>
                Explore our innovative tools designed to enhance communication and understanding in your relationships.
              </p>
              <Progress value={75} className="mt-4" />
              <Badge className="mt-4 bg-primary text-primary-foreground">New</Badge>
            </CardContent>
          </Card>

          <Card className="flex flex-col items-center p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-primary">Feature 2</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-700 dark:text-gray-300">
              <p>Gain insights into your relationship dynamics with advanced analytics and personalized feedback.</p>
              <Progress value={90} className="mt-4" />
              <Badge className="mt-4 bg-secondary text-secondary-foreground">Popular</Badge>
            </CardContent>
          </Card>

          <Card className="flex flex-col items-center p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-primary">Feature 3</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-700 dark:text-gray-300">
              <p>Collaborate with partners and coaches to set goals and track progress towards stronger bonds.</p>
              <Progress value={60} className="mt-4" />
              <Badge className="mt-4 bg-accent text-accent-foreground">Beta</Badge>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
