import type React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FileUpload } from "@/components/ui/file-upload"
import { Progress } from "@/components/ui/progress"
import { CloudUpload, FileText } from "lucide-react"

export default function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-64px)] bg-secondary-default p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle className="text-center text-primary-default">Welcome to AlignSynch Beta</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <p className="text-center text-lg text-gray-700">
            Your all-in-one platform for seamless team alignment and project synchronization. Get started by exploring
            our features or uploading your project files.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FeatureCard
              icon={<CloudUpload className="h-6 w-6 text-primary-default" />}
              title="Effortless File Uploads"
              description="Securely upload and manage your project documents with our integrated Vercel Blob storage."
            >
              <FileUpload />
            </FeatureCard>
            <FeatureCard
              icon={<FileText className="h-6 w-6 text-primary-default" />}
              title="Comprehensive Documentation"
              description="Access detailed guides and resources to maximize your team's productivity."
            >
              <Button variant="outline" className="w-full bg-transparent">
                Explore Docs
              </Button>
            </FeatureCard>
          </div>

          <div className="text-center">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Your Progress</h3>
            <Progress value={75} className="w-full" />
            <p className="text-sm text-gray-600 mt-1">75% of setup complete. Keep going!</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

interface FeatureCardProps {
  icon: React.ReactNode
  title: string
  description: string
  children: React.ReactNode
}

function FeatureCard({ icon, title, description, children }: FeatureCardProps) {
  return (
    <Card className="flex flex-col items-center p-6 text-center">
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-semibold text-gray-800 mb-2">{title}</h3>
      <p className="text-gray-600 mb-4">{description}</p>
      {children}
    </Card>
  )
}
