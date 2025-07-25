import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FileUpload } from "@/components/ui/file-upload"
import Link from "next/link"

export default function HomePage() {
  return (
    <main className="flex flex-col items-center justify-center min-h-[calc(100vh-64px-64px)] p-4 md:p-8 bg-gray-50">
      <section className="text-center mb-12">
        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4">Welcome to AlignSynch Beta</h1>
        <p className="text-lg md:text-xl text-gray-700 max-w-2xl mx-auto mb-8">
          Your comprehensive platform for seamless project alignment and synchronization.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild className="px-8 py-3 text-lg">
            <Link href="/dashboard">Go to Dashboard</Link>
          </Button>
          <Button asChild variant="outline" className="px-8 py-3 text-lg bg-transparent">
            <Link href="/auth/signin">Sign In</Link>
          </Button>
        </div>
      </section>

      <section className="w-full max-w-4xl mb-12">
        <Card className="p-6">
          <CardHeader>
            <CardTitle className="text-center text-2xl font-semibold mb-4">Upload Your Project Files</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-center text-gray-600 mb-6">
              Easily upload documents, images, and other project assets to your secure AlignSynch storage.
            </p>
            <FileUpload />
          </CardContent>
        </Card>
      </section>

      <section className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-3 gap-8">
        <Card className="p-6 text-center">
          <CardHeader>
            <CardTitle className="text-xl font-semibold mb-2">Project Management</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">Organize tasks, track progress, and manage resources efficiently.</p>
          </CardContent>
        </Card>
        <Card className="p-6 text-center">
          <CardHeader>
            <CardTitle className="text-xl font-semibold mb-2">Team Collaboration</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">Facilitate communication and collaboration among team members.</p>
          </CardContent>
        </Card>
        <Card className="p-6 text-center">
          <CardHeader>
            <CardTitle className="text-xl font-semibold mb-2">Data Insights</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">Gain valuable insights from your project data with analytics.</p>
          </CardContent>
        </Card>
      </section>
    </main>
  )
}
