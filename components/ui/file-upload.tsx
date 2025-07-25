"use client"

import { useState, useCallback } from "react"
import { useDropzone } from "react-dropzone"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
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
  allowedTypes = ["image/jpeg", "image/png", "image/gif", "application/pdf"],
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
        setError(
          `Invalid file type. Allowed types: ${allowedTypes.map((type) => type.split("/")[1] || type).join(", ")}`,
        )
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
          currentProgress = Math.min(currentProgress + 10, 90)
          setProgress(currentProgress)
          if (currentProgress >= 90) clearInterval(interval)
        }, 100)

        const response = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        })

        clearInterval(interval)

        if (!response.ok) {
          const errorData = await response.json()
          throw new Error(errorData.error || "Failed to upload file.")
        }

        const data = await response.json()
        setUploadedFile({ name: file.name, url: data.url, type: file.type })
        setProgress(100)
        onUploadSuccess?.(data.url, data.pathname)
      } catch (err: any) {
        setError(err.message)
        onUploadError?.(err.message)
        setProgress(0)
      } finally {
        setUploading(false)
      }
    },
    [maxSize, allowedTypes, onUploadSuccess, onUploadError],
  )

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

  const getFileIcon = (fileType: string) => {
    if (fileType.startsWith("image/")) {
      return <ImageIcon className="h-12 w-12 text-primary" />
    } else if (fileType === "application/pdf") {
      return <FileText className="h-12 w-12 text-red-500" />
    }
    return <FileText className="h-12 w-12 text-gray-500" />
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Upload File</CardTitle>
      </CardHeader>
      <CardContent>
        <div
          {...getRootProps()}
          className={`flex flex-col items-center justify-center p-6 border-2 border-dashed rounded-lg cursor-pointer transition-colors duration-200
            ${isDragActive ? "border-primary bg-primary/10" : "border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800"}
          `}
        >
          <input {...getInputProps()} />
          <UploadCloud className="h-16 w-16 text-gray-400 dark:text-gray-500 mb-4" />
          {isDragActive ? (
            <p className="text-lg text-primary">Drop the files here ...</p>
          ) : (
            <p className="text-center text-gray-600 dark:text-gray-400">
              Drag 'n' drop a file here, or click to select one.
              <br />
              <span className="text-sm text-gray-500 dark:text-gray-600">
                Max size: {maxSize / (1024 * 1024)}MB. Allowed:{" "}
                {allowedTypes.map((type) => type.split("/")[1] || type).join(", ")}.
              </span>
            </p>
          )}
        </div>

        {uploading && (
          <div className="mt-4">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Uploading...</p>
            <Progress value={progress} className="w-full" />
          </div>
        )}

        {error && (
          <div className="mt-4 flex items-center text-red-500 text-sm">
            <XCircle className="h-5 w-5 mr-2" />
            <span>{error}</span>
          </div>
        )}

        {uploadedFile && (
          <div className="mt-4 p-3 border rounded-lg flex items-center justify-between bg-green-50 dark:bg-green-900/20">
            <div className="flex items-center">
              {getFileIcon(uploadedFile.type)}
              <span className="ml-3 text-sm font-medium text-gray-800 dark:text-gray-200 truncate">
                {uploadedFile.name}
              </span>
            </div>
            <a
              href={uploadedFile.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline text-sm"
            >
              View
            </a>
          </div>
        )}

        <div className="mt-6 text-center">
          <Button onClick={() => setUploadedFile(null)} disabled={!uploadedFile && !error}>
            Clear Upload
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
