"use client"

import { useSession } from "next-auth/react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FileUpload } from "@/components/ui/file-upload"
import { useState } from "react"
import { deleteFile } from "@/lib/blob-storage"
import { useEffect } from "react"
import { XCircle, FileText, ImageIcon } from "lucide-react"

interface BlobFile {
  url: string
  pathname: string
  size: number
  uploadedAt: string
  contentType: string
}

export default function DashboardPage() {
  const { data: session, status } = useSession()
  const [uploadedFiles, setUploadedFiles] = useState<BlobFile[]>([])
  const [loadingFiles, setLoadingFiles] = useState(true)
  const [fileError, setFileError] = useState<string | null>(null)

  const fetchFiles = async () => {
    setLoadingFiles(true)
    setFileError(null)
    try {
      // In a real app, you'd filter by user ID or a specific prefix
      const response = await fetch("/api/blob-list") // Assuming you create this API route
      if (!response.ok) {
        throw new Error("Failed to fetch files")
      }
      const data = await response.json()
      setUploadedFiles(data.files)
    } catch (error: any) {
      setFileError(error.message)
    } finally {
      setLoadingFiles(false)
    }
  }

  useEffect(() => {
    if (status === "authenticated") {
      fetchFiles()
    }
  }, [status])

  const handleUploadSuccess = (url: string, pathname: string) => {
    console.log("File uploaded successfully:", url, pathname)
    fetchFiles() // Refresh the list of files
  }

  const handleUploadError = (error: string) => {
    console.error("File upload error:", error)
    setFileError(error)
  }

  const handleDeleteFile = async (pathname: string) => {
    try {
      await deleteFile(pathname)
      setUploadedFiles((prev) => prev.filter((file) => file.pathname !== pathname))
    } catch (error) {
      console.error("Error deleting file:", error)
      setFileError("Failed to delete file.")
    }
  }

  const getFileIcon = (fileType: string) => {
    if (fileType.startsWith("image/")) {
      return <ImageIcon className="h-8 w-8 text-muted-foreground" />
    } else if (fileType === "application/pdf") {
      return <FileText className="h-8 w-8 text-muted-foreground" />
    }
    return <FileText className="h-8 w-8 text-muted-foreground" />
  }

  if (status === "loading") {
    return <div className="flex justify-center items-center min-h-screen">Loading session...</div>
  }

  if (!session) {
    return <div className="flex justify-center items-center min-h-screen">Please sign in to view the dashboard.</div>
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Welcome, {session.user?.name || session.user?.email}!</h1>
      <p className="text-muted-foreground mb-8">Your role: {session.user?.role}</p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Your Stats</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Total sessions: 15</p>
            <p>Average score: 85%</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <ul>
              <li>Completed "Communication Skills" quiz</li>
              <li>Started "Conflict Resolution" session</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>File Upload</CardTitle>
          </CardHeader>
          <CardContent>
            <FileUpload onUploadSuccess={handleUploadSuccess} onUploadError={handleUploadError} />
            {fileError && <p className="text-destructive text-sm mt-2">{fileError}</p>}
          </CardContent>
        </Card>

        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>Your Uploaded Files</CardTitle>
          </CardHeader>
          <CardContent>
            {loadingFiles ? (
              <p>Loading files...</p>
            ) : uploadedFiles.length === 0 ? (
              <p className="text-muted-foreground">No files uploaded yet.</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {uploadedFiles.map((file) => (
                  <Card key={file.pathname} className="relative p-4 flex flex-col items-center text-center">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute top-2 right-2 text-destructive hover:bg-destructive/10"
                      onClick={() => handleDeleteFile(file.pathname)}
                    >
                      <XCircle className="h-5 w-5" />
                    </Button>
                    {getFileIcon(file.contentType)}
                    <p className="text-sm font-medium mt-2 truncate w-full">{file.pathname.split("/").pop()}</p>
                    <p className="text-xs text-muted-foreground">{`${(file.size / 1024).toFixed(2)} KB`}</p>
                    <a
                      href={file.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary text-sm mt-2 hover:underline"
                    >
                      View
                    </a>
                  </Card>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
