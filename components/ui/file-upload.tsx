"use client"

import { useState, useCallback } from "react"
import { useDropzone } from "react-dropzone"
import { Progress } from "@/components/ui/progress"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { UploadCloud, FileText, ImageIcon, XCircle } from "lucide-react"

interface FileUploadProps {
  onUploadSuccess?: (url: string, pathname: string) => void
  onUploadError?: (error: string) => void
  maxSize?: number // in bytes, default 10MB
  allowedTypes?: string[] // e.g., ['image/jpeg', 'application/pdf']
}

export function FileUpload({
  onUploadSuccess,
  onUploadError,
  maxSize = 10 * 1024 * 1024, // 10MB
  allowedTypes = ["image/jpeg", "image/png", "application/pdf"],
}: FileUploadProps) {
  const [uploading, setUploading] = useState(false)
  const [progress, setProgress] = useState(0)
  const [error, setError] = useState<string | null>(null)
  const [uploadedFile, setUploadedFile] = useState<{ name: string; url: string; type: string } | null>(null)

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      if (acceptedFiles.length === 0) {
        setError("No file selected or file type not allowed.")
        return
      }

      const file = acceptedFiles[0]

      if (file.size > maxSize) {
        setError(`File size exceeds ${maxSize / (1024 * 1024)}MB limit.`)
        return
      }

      if (!allowedTypes.includes(file.type)) {
        setError(`Invalid file type. Allowed types: ${allowedTypes.map((t) => t.split("/")[1]).join(", ")}.`)
        return
      }

      setUploading(true)
      setProgress(0)
      setError(null)
      setUploadedFile(null)

      const formData = new FormData()
      formData.append("file", file)

      try {
        // Simulate progress for demonstration
        let currentProgress = 0
        const interval = setInterval(() => {
          currentProgress += 10
          if (currentProgress <= 90) {
            setProgress(currentProgress)
          } else {
            clearInterval(interval)
          }
        }, 100)

        const response = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        })

        clearInterval(interval) // Stop simulation

        if (!response.ok) {
          const errorData = await response.text()
          throw new Error(errorData || "Upload failed")
        }

        const data = await response.json()
        setUploadedFile({ name: file.name, url: data.url, type: file.type })
        setProgress(100)
        onUploadSuccess?.(data.url, data.pathname)
      } catch (err: any) {
        setError(err.message || "An unknown error occurred during upload.")
        onUploadError?.(err.message || "An unknown error occurred during upload.")
        setProgress(0)
      } finally {
        setUploading(false)
      }
    },
    [maxSize, allowedTypes, onUploadSuccess, onUploadError],
  )

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop, multiple: false })

  const getFileIcon = (fileType: string) => {
    if (fileType.startsWith("image/")) {
      return <ImageIcon className="h-12 w-12 text-muted-foreground" />
    } else if (fileType === "application/pdf") {
      return <FileText className="h-12 w-12 text-muted-foreground" />
    }
    return <FileText className="h-12 w-12 text-muted-foreground" />
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Upload File</CardTitle>
        <CardDescription>Drag and drop your file here, or click to select.</CardDescription>
      </CardHeader>
      <CardContent>
        <div
          {...getRootProps()}
          className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-muted-foreground rounded-lg cursor-pointer hover:border-primary transition-colors"
        >
          <input {...getInputProps()} />
          {isDragActive ? (
            <p className="text-primary">Drop the files here ...</p>
          ) : (
            <>
              <UploadCloud className="h-12 w-12 text-muted-foreground mb-4" />
              <p className="text-muted-foreground text-center">Drag 'n' drop a file here, or click to select one</p>
              <p className="text-xs text-muted-foreground mt-2">
                Max size: {maxSize / (1024 * 1024)}MB. Allowed: {allowedTypes.map((t) => t.split("/")[1]).join(", ")}
              </p>
            </>
          )}
        </div>

        {uploading && (
          <div className="mt-4">
            <p className="text-sm text-muted-foreground mb-2">Uploading...</p>
            <Progress value={progress} className="w-full" />
          </div>
        )}

        {error && (
          <div className="mt-4 text-destructive flex items-center gap-2">
            <XCircle className="h-5 w-5" />
            <p className="text-sm">{error}</p>
          </div>
        )}

        {uploadedFile && !uploading && !error && (
          <div className="mt-4 flex items-center gap-4 p-3 border rounded-md bg-accent/10">
            {getFileIcon(uploadedFile.type)}
            <div className="flex-1">
              <p className="text-sm font-medium truncate">{uploadedFile.name}</p>
              <a
                href={uploadedFile.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-primary hover:underline"
              >
                View File
              </a>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
