import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { FileUpload } from "@/components/ui/file-upload"

export default function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-64px-64px)] py-12 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-md w-full space-y-8 text-center">
        <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white sm:text-5xl md:text-6xl">
          Welcome to AlignSynch Beta
        </h1>
        <p className="mt-3 text-xl text-gray-600 dark:text-gray-300">
          Your comprehensive platform for project management and collaboration.
        </p>
        <div className="mt-5 max-w-md mx-auto flex justify-center gap-4">
          <Button asChild size="lg">
            <Link href="/dashboard">Go to Dashboard</Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link href="/auth/signin">Sign In</Link>
          </Button>
        </div>

        <Card className="mt-10 p-6 shadow-lg">
          <CardHeader>
            <CardTitle>Upload Files</CardTitle>
            <CardDescription>Drag and drop your files here or click to upload.</CardDescription>
          </CardHeader>
          <CardContent>
            <FileUpload />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
