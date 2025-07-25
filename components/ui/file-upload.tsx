"use client"

import { useState, useCallback, useRef } from "react"
import { useDropzone } from "react-dropzone"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Card, CardContent } from "@/components/ui/card"
import { CloudUpload, FileText, XCircle, CircleCheck } from "lucide-react"
import { cn } from "@/lib/utils"

interface FileUploadProps {
  onUploadSuccess?: (url: string, pathname: string) => void
  onUploadError?: (error: string) => void
  maxFileSizeMb?: number
  acceptedFileTypes?: string[]
}

export function FileUpload({
  onUploadSuccess,
  onUploadError,
  maxFileSizeMb = 10, // Default max file size to 10MB
  acceptedFileTypes = ["image/*", "application/pdf"], // Default accepted types
}: FileUploadProps) {
  const [files, setFiles] = useState<File[]>([])
  const [uploadProgress, setUploadProgress] = useState<number>(0)
  const [uploadStatus, setUploadStatus] = useState<"idle" | "uploading" | "success" | "error">("idle")
  const abortControllerRef = useRef<AbortController | null>(null)

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFiles(acceptedFiles)
    setUploadStatus("idle")
    setUploadProgress(0)
  }, [])

  const { getRootProps, getInputProps, isDragActive, fileRejections } = useDropzone({
    onDrop,
    maxFiles: 1,
    maxSize: maxFileSizeMb * 1024 * 1024, // Convert MB to bytes
    accept: acceptedFileTypes.reduce((acc, type) => ({ ...acc, [type]: [] }), {}),
  })

  const handleUpload = async () => {
    if (files.length === 0) {
      onUploadError?.("No file selected for upload.")
      return
    }

    const file = files[0]
    setUploadStatus("uploading")
    setUploadProgress(0)
    abortControllerRef.current = new AbortController()
    const signal = abortControllerRef.current.signal

    try {
      const response = await fetch(`/api/upload?filename=${encodeURIComponent(file.name)}`, {
        method: "POST",
        body: file,
        signal,
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "File upload failed")
      }

      const data = await response.json()
      setUploadProgress(100)
      setUploadStatus("success")
      onUploadSuccess?.(data.url, data.pathname)
    } catch (error: any) {
      if (error.name === "AbortError") {
        console.log("Upload aborted")
        setUploadStatus("idle") // Reset status if aborted
      } else {
        console.error("Upload error:", error)
        setUploadStatus("error")
        onUploadError?.(error.message || "An unknown error occurred during upload.")
      }
    } finally {
      abortControllerRef.current = null
    }
  }

  const handleCancelUpload = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort()
    }
    setFiles([])
    setUploadStatus("idle")
    setUploadProgress(0)
  }

  const displayFileName = files.length > 0 ? files[0].name : "No file selected"

  return (
    <Card className="w-full p-4">
      <CardContent className="flex flex-col items-center justify-center space-y-4">
        <div
          {...getRootProps()}
          className={cn(
            "flex flex-col items-center justify-center w-full p-6 border-2 border-dashed rounded-lg cursor-pointer",
            isDragActive ? "border-primary-default bg-primary-default/10" : "border-gray-300 bg-gray-50",
            fileRejections.length > 0 && "border-destructive-default bg-destructive-default/10",
          )}
        >
          <input {...getInputProps()} />
          <CloudUpload className="h-12 w-12 text-gray-400 mb-3" />
          {isDragActive ? (
            <p className="text-gray-600">Drop the files here ...</p>
          ) : (
            <p className="text-gray-600 text-center">
              Drag 'n' drop a file here, or <span className="text-primary-default font-medium">click to select</span>
            </p>
          )}
          <p className="text-sm text-gray-500 mt-1">
            (Max {maxFileSizeMb}MB, accepted: {acceptedFileTypes.map((type) => type.split("/")[1] || type).join(", ")})
          </p>
        </div>

        {fileRejections.length > 0 && (
          <div className="text-destructive-default text-sm text-center">
            {fileRejections[0].errors.map((e, index) => (
              <p key={index}>{e.message}</p>
            ))}
          </div>
        )}

        {files.length > 0 && (
          <div className="w-full space-y-2">
            <div className="flex items-center justify-between text-sm text-gray-700">
              <span className="flex items-center gap-2">
                <FileText className="h-4 w-4" /> {displayFileName}
              </span>
              {uploadStatus === "success" && <CircleCheck className="h-5 w-5 text-green-500" />}
              {uploadStatus === "error" && <XCircle className="h-5 w-5 text-destructive-default" />}
            </div>
            {uploadStatus === "uploading" && <Progress value={uploadProgress} className="w-full" />}
          </div>
        )}

        <div className="flex gap-2 w-full">
          <Button
            onClick={handleUpload}
            disabled={files.length === 0 || uploadStatus === "uploading"}
            className="flex-1"
          >
            {uploadStatus === "uploading" ? "Uploading..." : "Upload File"}
          </Button>
          {(uploadStatus === "uploading" || files.length > 0) && (
            <Button variant="outline" onClick={handleCancelUpload} disabled={uploadStatus === "success"}>
              Cancel
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
