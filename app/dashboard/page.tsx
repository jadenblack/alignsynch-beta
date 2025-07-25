import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { FileUpload } from "@/components/ui/file-upload"
import { auth } from "@/lib/auth"
import { hasPermission } from "@/lib/auth"
import { redirect } from "next/navigation"

export default async function DashboardPage() {
  const session = await auth()

  if (!session || !session.user) {
    redirect("/auth/signin")
  }

  const userRole = (session.user as any).role || "user" // Default to 'user' if role is not set

  // Example data for the dashboard
  const projects = [
    { id: 1, name: "Project Alpha", status: "In Progress", progress: 75, type: "Web App" },
    { id: 2, name: "Project Beta", status: "Completed", progress: 100, type: "Mobile App" },
    { id: 3, name: "Project Gamma", status: "On Hold", progress: 30, type: "API Service" },
    { id: 4, name: "Project Delta", status: "In Progress", progress: 60, type: "Data Analysis" },
  ]

  const tasks = [
    { id: 1, name: "Complete dashboard UI", status: "Pending", priority: "High" },
    { id: 2, name: "Implement authentication", status: "Completed", priority: "High" },
    { id: 3, name: "Integrate blob storage", status: "In Progress", priority: "Medium" },
    { id: 4, name: "Write unit tests", status: "Pending", priority: "Low" },
  ]

  return (
    <div className="container mx-auto py-8 px-4 md:px-6">
      <h1 className="text-3xl font-bold mb-6">Welcome, {session.user.name || session.user.email}!</h1>
      <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
        Your role: <Badge>{userRole}</Badge>
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Total Projects</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">{projects.length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Tasks Completed</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">{tasks.filter((t) => t.status === "Completed").length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Overall Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <Progress value={70} className="w-full" />
            <p className="text-sm text-gray-500 mt-2">70% of all tasks completed</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Projects</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              {projects.map((project) => (
                <li key={project.id} className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">{project.name}</p>
                    <p className="text-sm text-gray-500">{project.type}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant={project.status === "Completed" ? "default" : "secondary"}>{project.status}</Badge>
                    <Progress value={project.progress} className="w-24" />
                  </div>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>My Tasks</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              {tasks.map((task) => (
                <li key={task.id} className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">{task.name}</p>
                    <p className="text-sm text-gray-500">Priority: {task.priority}</p>
                  </div>
                  <Badge variant={task.status === "Completed" ? "default" : "outline"}>{task.status}</Badge>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>

      {hasPermission(userRole, "content:manage") && (
        <div className="mt-8">
          <Card>
            <CardHeader>
              <CardTitle>Upload New Content</CardTitle>
            </CardHeader>
            <CardContent>
              <FileUpload
                onFileUploadSuccess={(url, pathname) => console.log("File uploaded:", url, pathname)}
                onFileUploadError={(error) => console.error("Upload error:", error)}
              />
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
