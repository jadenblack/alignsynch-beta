import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"

export default function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-64px)] py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-5xl font-extrabold tracking-tight text-gray-900 dark:text-gray-50 sm:text-6xl lg:text-7xl leading-tight">
          Welcome to <span className="text-blue-600 dark:text-blue-400">AlignSynch Beta</span>
        </h1>
        <p className="mt-6 text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Your comprehensive platform for streamlined operations and enhanced collaboration. Get ready to experience a
          new level of efficiency.
        </p>
        <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
          <Link href="/dashboard" passHref>
            <Button className="px-8 py-3 text-lg font-semibold rounded-md shadow-lg hover:shadow-xl transition-all duration-300 bg-blue-600 hover:bg-blue-700 text-white dark:bg-blue-500 dark:hover:bg-blue-600">
              Go to Dashboard
            </Button>
          </Link>
          <Link href="/auth/signin" passHref>
            <Button
              variant="outline"
              className="px-8 py-3 text-lg font-semibold rounded-md shadow-lg hover:shadow-xl transition-all duration-300 border-blue-600 text-blue-600 hover:bg-blue-50 dark:border-blue-400 dark:text-blue-400 dark:hover:bg-gray-700 bg-transparent"
            >
              Sign In
            </Button>
          </Link>
        </div>
      </div>

      <div className="mt-20 w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <Card className="bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-shadow duration-300">
          <CardHeader>
            <CardTitle className="text-blue-600 dark:text-blue-400">Intuitive Dashboard</CardTitle>
            <CardDescription>Access all your key metrics and tools in one place.</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 dark:text-gray-300">
              A clean and customizable interface designed for maximum productivity. Monitor progress, manage tasks, and
              gain insights effortlessly.
            </p>
          </CardContent>
        </Card>

        <Card className="bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-shadow duration-300">
          <CardHeader>
            <CardTitle className="text-blue-600 dark:text-blue-400">Seamless Collaboration</CardTitle>
            <CardDescription>Work together efficiently with integrated tools.</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 dark:text-gray-300">
              Share documents, communicate in real-time, and track team progress to achieve your goals faster.
            </p>
          </CardContent>
        </Card>

        <Card className="bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-shadow duration-300">
          <CardHeader>
            <CardTitle className="text-blue-600 dark:text-blue-400">Robust Security</CardTitle>
            <CardDescription>Your data is protected with industry-leading measures.</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 dark:text-gray-300">
              We prioritize the security of your information with advanced encryption and access controls.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
