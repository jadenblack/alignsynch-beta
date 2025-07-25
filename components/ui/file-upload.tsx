"use client"

import type React from "react"
import { useState, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface FileUploadProps {
  onUploadSuccess?: (url: string) => void
  onUploadError?: (error: string) => void
  allowedFileTypes?: string[]
  maxFileSizeMB?: number
}

export function FileUpload({
  onUploadSuccess,
  onUploadError,
  allowedFileTypes = ["image/*", "application/pdf"],
  maxFileSizeMB = 10,
}: FileUploadProps) {
  const [file, setFile] = useState<File | null>(null)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [isUploading, setIsUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)

  const handleFileChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setError(null)
      setUploadProgress(0)
      setPreviewUrl(null)
      if (event.target.files && event.target.files[0]) {
        const selectedFile = event.target.files[0]

        // Validate file type
        const isFileTypeAllowed = allowedFileTypes.some((type) => {
          if (type.endsWith("/*")) {
            return selectedFile.type.startsWith(type.slice(0, -1))
          }
          return selectedFile.type === type
        })

        if (!isFileTypeAllowed) {
          setError(`Invalid file type. Allowed types: ${allowedFileTypes.join(", ")}`)
          setFile(null)
          return
        }

        // Validate file size
        if (selectedFile.size > maxFileSizeMB * 1024 * 1024) {
          setError(`File size exceeds ${maxFileSizeMB}MB limit.`)
          setFile(null)
          return
        }

        setFile(selectedFile)
        if (selectedFile.type.startsWith("image/")) {
          setPreviewUrl(URL.createObjectURL(selectedFile))
        }
      } else {
        setFile(null)
      }
    },
    [allowedFileTypes, maxFileSizeMB],
  )

  const handleUpload = useCallback(async () => {
    if (!file) {
      setError("Please select a file to upload.")
      return
    }

    setIsUploading(true)
    setError(null)
    setUploadProgress(0)

    try {
      const response = await fetch(
        `/api/upload?filename=${encodeURIComponent(file.name)}&contentType=${encodeURIComponent(file.type)}`,
        {
          method: "POST",
          body: file,
          // For progress tracking, you'd typically use XMLHttpRequest or a library that supports it
          // Fetch API doesn't directly support upload progress events
        },
      )

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Failed to upload file.")
      }

      const result = await response.json()
      setUploadProgress(100)
      onUploadSuccess?.(result.url)
      setFile(null) // Clear file after successful upload
      setPreviewUrl(null)
    } catch (err: any) {
      setError(err.message || "An unknown error occurred during upload.")
      onUploadError?.(err.message || "An unknown error occurred.")
      setUploadProgress(0)
    } finally {
      setIsUploading(false)
    }
  }, [file, onUploadSuccess, onUploadError])

  const handleDragOver = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    event.stopPropagation()
    event.dataTransfer.dropEffect = "copy"
  }, [])

  const handleDrop = useCallback(
    (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault()
      event.stopPropagation()
      setError(null)
      setUploadProgress(0)
      setPreviewUrl(null)

      if (event.dataTransfer.files && event.dataTransfer.files[0]) {
        const droppedFile = event.dataTransfer.files[0]

        // Validate file type
        const isFileTypeAllowed = allowedFileTypes.some((type) => {
          if (type.endsWith("/*")) {
            return droppedFile.type.startsWith(type.slice(0, -1))
          }
          return droppedFile.type === type
        })

        if (!isFileTypeAllowed) {
          setError(`Invalid file type. Allowed types: ${allowedFileTypes.join(", ")}`)
          setFile(null)
          return
        }

        // Validate file size
        if (droppedFile.size > maxFileSizeMB * 1024 * 1024) {
          setError(`File size exceeds ${maxFileSizeMB}MB limit.`)
          setFile(null)
          return
        }

        setFile(droppedFile)
        if (droppedFile.type.startsWith("image/")) {
          setPreviewUrl(URL.createObjectURL(droppedFile))
        }
      }
    },
    [allowedFileTypes, maxFileSizeMB],
  )

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Upload File</CardTitle>
        <CardDescription>Drag & drop your file or click to select.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div
          className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          onClick={() => document.getElementById("file-input")?.click()}
        >
          {previewUrl ? (
            <img
              src={previewUrl || "/placeholder.svg"}
              alt="File preview"
              className="max-h-full max-w-full object-contain"
            />
          ) : (
            <>
              <svg
                className="w-10 h-10 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M7 16a4 4 0 01-.88-7.903A5 5 0 0115.9 6L16 6a3 3 0 013 3v10a2 2 0 01-2 2H7a2 2 0 01-2-2V7a2 2 0 012-2h.01M12 16l-3-3m0 0l-3 3m3-3V4"
                ></path>
              </svg>
              <p className="mt-2 text-sm text-gray-500 dark:text-gray-300">
                <span className="font-semibold">Click to upload</span> or drag and drop
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Max {maxFileSizeMB}MB (
                {allowedFileTypes
                  .map((type) => type.replace("image/*", "Images").replace("application/pdf", "PDF"))
                  .join(", ")}
                )
              </p>
            </>
          )}
          <Input
            id="file-input"
            type="file"
            className="hidden"
            onChange={handleFileChange}
            accept={allowedFileTypes.join(",")}
          />
        </div>

        {file && (
          <div className="flex items-center justify-between text-sm text-gray-700 dark:text-gray-200">
            <span>Selected: {file.name}</span>
            <span>{(file.size / (1024 * 1024)).toFixed(2)} MB</span>
          </div>
        )}

        {isUploading && (
          <div className="space-y-2">
            <Label htmlFor="upload-progress">Uploading...</Label>
            <Progress value={uploadProgress} id="upload-progress" className="w-full" />
          </div>
        )}

        {error && <p className="text-sm text-red-500 dark:text-red-400">{error}</p>}

        <Button onClick={handleUpload} disabled={!file || isUploading} className="w-full">
          {isUploading ? "Uploading..." : "Upload"}
        </Button>
      </CardContent>
    </Card>
  )
}
