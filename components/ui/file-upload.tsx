"use client"

import { cn } from "@/lib/utils"

import { useState, useCallback } from "react"
import { useDropzone } from "react-dropzone"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { UploadCloud, FileText, ImageIcon, XCircle } from "lucide-react"

interface FileUploadProps {
  onFileUploadSuccess?: (url: string, pathname: string) => void
  onFileUploadError?: (error: string) => void
  maxSize?: number // in bytes, default 10MB
  allowedTypes?: string[] // e.g., ['image/jpeg', 'application/pdf']
}

export function FileUpload({
  onFileUploadSuccess,
  onFileUploadError,
  maxSize = 10 * 1024 * 1024, // Default 10MB
  allowedTypes = ["image/jpeg", "image/png", "application/pdf"],
}: FileUploadProps) {
  const [file, setFile] = useState<File | null>(null)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [uploadedFileUrl, setUploadedFileUrl] = useState<string | null>(null)

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      setError(null)
      setUploadedFileUrl(null)
      setUploadProgress(0)

      if (acceptedFiles.length === 0) {
        setError("No file selected or file type not allowed.")
        onFileUploadError?.("No file selected or file type not allowed.")
        return
      }

      const selectedFile = acceptedFiles[0]

      if (selectedFile.size > maxSize) {
        setError(`File size exceeds ${maxSize / (1024 * 1024)}MB limit.`)
        onFileUploadError?.(`File size exceeds ${maxSize / (1024 * 1024)}MB limit.`)
        return
      }

      if (!allowedTypes.includes(selectedFile.type)) {
        setError(`File type '${selectedFile.type}' not allowed. Allowed types: ${allowedTypes.join(", ")}.`)
        onFileUploadError?.(`File type '${selectedFile.type}' not allowed.`)
        return
      }

      setFile(selectedFile)
    },
    [maxSize, allowedTypes, onFileUploadError],
  )

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    maxFiles: 1,
    accept: allowedTypes.reduce((acc, type) => ({ ...acc, [type]: [] }), {}),
    maxSize: maxSize,
  })

  const handleUpload = async () => {
    if (!file) {
      setError("Please select a file first.")
      onFileUploadError?.("No file selected for upload.")
      return
    }

    setUploading(true)
    setError(null)
    setUploadProgress(0)

    const formData = new FormData()
    formData.append("file", file)

    try {
      // Simulate upload progress (replace with actual progress tracking if your API supports it)
      let currentProgress = 0
      const interval = setInterval(() => {
        currentProgress += 10
        if (currentProgress <= 100) {
          setUploadProgress(currentProgress)
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
        const errorData = await response.json()
        throw new Error(errorData.error || "File upload failed.")
      }

      const data = await response.json()
      setUploadedFileUrl(data.url)
      setUploadProgress(100)
      onFileUploadSuccess?.(data.url, data.pathname)
    } catch (err: any) {
      setError(err.message)
      onFileUploadError?.(err.message)
      setUploadProgress(0)
    } finally {
      setUploading(false)
      setFile(null) // Clear file after upload attempt
    }
  }

  const getFileIcon = (fileType: string) => {
    if (fileType.startsWith("image/")) {
      return <ImageIcon className="h-12 w-12 text-gray-400" />
    }
    if (fileType === "application/pdf") {
      return <FileText className="h-12 w-12 text-red-500" />
    }
    return <FileText className="h-12 w-12 text-gray-400" />
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Upload File</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div
          {...getRootProps()}
          className={cn(
            "flex flex-col items-center justify-center p-6 border-2 border-dashed rounded-lg cursor-pointer",
            isDragActive ? "border-primary-default bg-primary-default/10" : "border-gray-300 bg-gray-50",
          )}
        >
          <input {...getInputProps()} />
          <UploadCloud className="h-12 w-12 text-gray-400 mb-3" />
          {isDragActive ? (
            <p className="text-gray-600">Drop the files here ...</p>
          ) : (
            <p className="text-gray-600 text-center">
              Drag 'n' drop a file here, or click to select a file
              <br />
              <span className="text-sm text-gray-500">
                (Max {maxSize / (1024 * 1024)}MB, {allowedTypes.map((t) => t.split("/")[1] || t).join(", ")})
              </span>
            </p>
          )}
        </div>

        {file && (
          <div className="flex items-center justify-between p-3 border rounded-md bg-gray-50">
            <div className="flex items-center gap-3">
              {getFileIcon(file.type)}
              <div>
                <p className="text-sm font-medium text-gray-800">{file.name}</p>
                <p className="text-xs text-gray-500">{(file.size / 1024).toFixed(2)} KB</p>
              </div>
            </div>
            <Button variant="ghost" size="icon" onClick={() => setFile(null)} disabled={uploading}>
              <XCircle className="h-5 w-5 text-red-500" />
            </Button>
          </div>
        )}

        {uploading && (
          <div className="space-y-2">
            <Progress value={uploadProgress} className="w-full" />
            <p className="text-sm text-gray-500 text-center">Uploading... {uploadProgress}%</p>
          </div>
        )}

        {error && <p className="text-sm text-red-500 text-center">{error}</p>}

        {uploadedFileUrl && (
          <p className="text-sm text-green-600 text-center">
            File uploaded successfully!{" "}
            <a href={uploadedFileUrl} target="_blank" rel="noopener noreferrer" className="underline">
              View File
            </a>
          </p>
        )}

        <Button onClick={handleUpload} className="w-full" disabled={!file || uploading}>
          {uploading ? "Uploading..." : "Upload"}
        </Button>
      </CardContent>
    </Card>
  )
}
