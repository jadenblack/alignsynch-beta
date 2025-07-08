import Link from "next/link"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { GithubIcon } from "lucide-react"

export default function NotFound() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900">
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-40 bg-[#f6f8fa] dark:bg-gray-800/20">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 items-center">
              <div className="flex flex-col justify-center space-y-4 text-center">
                <div className="space-y-2">
                  <h1 className="text-8xl font-bold tracking-tighter sm:text-9xl xl:text-9xl/none bg-clip-text text-transparent bg-gradient-to-r from-gray-400 to-gray-600">
                    404
                  </h1>
                  <div className="inline-block bg-white dark:bg-gray-950 rounded-lg px-4 py-2 shadow-sm">
                    <p className="text-xl text-gray-600 md:text-2xl dark:text-gray-400">
                      This is not the web page you are looking for.
                    </p>
                  </div>
                </div>
                <div className="w-full max-w-2xl mx-auto flex justify-center">
                  <img
                    src="/placeholder.svg?width=400&height=400"
                    width="400"
                    height="400"
                    alt="404 Illustration"
                    className="aspect-square"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 border-t">
          <div className="container grid items-center justify-center gap-4 px-4 text-center md:px-6">
            <div className="space-y-3">
              <p className="mx-auto max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                Find code, projects, and people on AlignSynch.
              </p>
            </div>
            <div className="mx-auto w-full max-w-sm space-y-2">
              <form className="flex space-x-2">
                <Input type="search" placeholder="Search..." className="max-w-lg flex-1" />
                <Button type="submit">Search</Button>
              </form>
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400 mt-4">
              <Link href="/contact" className="hover:underline">
                Contact Support
              </Link>
              <span className="mx-2">-</span>
              <Link href="/status" className="hover:underline">
                Status
              </Link>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t bg-white dark:bg-gray-950">
        <div className="flex items-center gap-2">
          <GithubIcon className="h-6 w-6" />
          <p className="text-xs text-gray-500 dark:text-gray-400">&copy; 2025 AlignSynch Inc. All rights reserved.</p>
        </div>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link href="#" className="text-xs hover:underline underline-offset-4" prefetch={false}>
            Product
          </Link>
          <Link href="#" className="text-xs hover:underline underline-offset-4" prefetch={false}>
            Platform
          </Link>
          <Link href="#" className="text-xs hover:underline underline-offset-4" prefetch={false}>
            Support
          </Link>
          <Link href="#" className="text-xs hover:underline underline-offset-4" prefetch={false}>
            Company
          </Link>
        </nav>
      </footer>
    </div>
  )
}
