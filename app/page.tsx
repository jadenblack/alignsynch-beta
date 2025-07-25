import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { RocketIcon, UsersIcon, ZapIcon } from "lucide-react"
import Link from "next/link"

export default function Home() {
  return (
    <div className="flex flex-col min-h-[100dvh]">
      <main className="flex-1">
        <section className="w-full py-12 sm:py-24 md:py-32 lg:py-40 xl:py-48 bg-gradient-to-r from-blue-500 to-green-500 text-white">
          <div className="container px-4 md:px-6 text-center">
            <div className="max-w-3xl mx-auto">
              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
                AlignSynch Beta
              </h1>
              <p className="mt-4 text-lg md:text-xl">
                Deepen your connection and grow together. Your journey to better alignment starts here.
              </p>
              <div className="mt-8 flex justify-center gap-4">
                <Link href="/auth/signin">
                  <Button variant="secondary" size="lg">
                    Get Started
                  </Button>
                </Link>
                <Link href="/dashboard">
                  <Button
                    variant="outline"
                    size="lg"
                    className="text-white border-white hover:bg-white hover:text-blue-500 bg-transparent"
                  >
                    Learn More
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 bg-background">
          <div className="container px-4 md:px-6">
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              <Card className="flex flex-col items-center text-center p-6">
                <RocketIcon className="h-12 w-12 text-primary mb-4" />
                <CardHeader>
                  <CardTitle>Rapid Development</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Leverage cutting-edge tools for quick iteration and deployment.
                  </p>
                </CardContent>
              </Card>
              <Card className="flex flex-col items-center text-center p-6">
                <UsersIcon className="h-12 w-12 text-primary mb-4" />
                <CardHeader>
                  <CardTitle>Collaborative Features</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">Foster teamwork with integrated collaboration tools.</p>
                </CardContent>
              </Card>
              <Card className="flex flex-col items-center text-center p-6">
                <ZapIcon className="h-12 w-12 text-primary mb-4" />
                <CardHeader>
                  <CardTitle>Performance Optimized</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">Experience lightning-fast performance with optimized code.</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6 text-center">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Ready to get started?</h2>
            <p className="mt-4 max-w-2xl mx-auto text-muted-foreground md:text-xl">
              Join AlignSynch Beta today and start your journey to better alignment.
            </p>
            <div className="mt-8">
              <Link href="/auth/signin">
                <Button size="lg">Sign Up Now</Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
