"use client"

import type React from "react"
import { useState, useCallback } from "react"
import { useSession } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Card, CardContent } from "@/components/ui/card"
import { UploadCloud, FileText, ImageIcon, XCircle } from "lucide-react"

export function FileUpload() {
  const { data: session } = useSession()
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [uploadStatus, setUploadStatus] = useState<"idle" | "uploading" | "success" | "error">("idle")
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [uploadedUrl, setUploadedUrl] = useState<string | null>(null)

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0]
      validateAndSetFile(file)
    }
  }

  const handleDrop = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    if (event.dataTransfer.files && event.dataTransfer.files[0]) {
      const file = event.dataTransfer.files[0]
      validateAndSetFile(file)
    }
  }, [])

  const validateAndSetFile = (file: File) => {
    const MAX_FILE_SIZE = 10 * 1024 * 1024 // 10MB
    const ALLOWED_FILE_TYPES = ["image/jpeg", "image/png", "application/pdf"]

    if (file.size > MAX_FILE_SIZE) {
      setErrorMessage("File size exceeds 10MB limit.")
      setSelectedFile(null)
      return
    }

    if (!ALLOWED_FILE_TYPES.includes(file.type)) {
      setErrorMessage("Unsupported file type. Only JPG, PNG, and PDF are allowed.")
      setSelectedFile(null)
      return
    }

    setSelectedFile(file)
    setUploadStatus("idle")
    setErrorMessage(null)
    setUploadProgress(0)
    setUploadedUrl(null)
  }

  const handleUpload = async () => {
    if (!selectedFile) {
      setErrorMessage("Please select a file first.")
      return
    }
    if (!session) {
      setErrorMessage("You must be logged in to upload files.")
      return
    }

    setUploadStatus("uploading")
    setUploadProgress(0)
    setErrorMessage(null)

    const formData = new FormData()
    formData.append("file", selectedFile)

    try {
      const xhr = new XMLHttpRequest()
      xhr.open("POST", "/api/upload", true)

      xhr.upload.onprogress = (event) => {
        if (event.lengthComputable) {
          const percentCompleted = Math.round((event.loaded * 100) / event.total)
          setUploadProgress(percentCompleted)
        }
      }

      xhr.onload = () => {
        if (xhr.status === 200) {
          const response = JSON.parse(xhr.responseText)
          setUploadStatus("success")
          setUploadedUrl(response.url)
          console.log("File uploaded successfully:", response.url)
        } else {
          const errorResponse = JSON.parse(xhr.responseText)
          setUploadStatus("error")
          setErrorMessage(errorResponse.error || "Upload failed.")
          console.error("Upload failed:", errorResponse.error)
        }
      }

      xhr.onerror = () => {
        setUploadStatus("error")
        setErrorMessage("Network error or server unreachable.")
        console.error("XHR error during upload.")
      }

      xhr.send(formData)
    } catch (error) {
      setUploadStatus("error")
      setErrorMessage("An unexpected error occurred during upload.")
      console.error("Unexpected error:", error)
    }
  }

  const getFileIcon = (fileType: string) => {
    if (fileType.startsWith("image/")) {
      return <ImageIcon className="h-8 w-8 text-gray-500" />
    }
    if (fileType === "application/pdf") {
      return <FileText className="h-8 w-8 text-red-500" />
    }
    return <FileText className="h-8 w-8 text-gray-500" />
  }

  return (
    <Card className="w-full max-w-lg mx-auto p-6 border-2 border-dashed border-gray-300 bg-gray-50">
      <CardContent className="flex flex-col items-center justify-center p-0">
        <div
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
          className="flex flex-col items-center justify-center w-full p-8 text-center cursor-pointer"
        >
          <UploadCloud className="h-12 w-12 text-gray-400 mb-4" />
          <p className="text-gray-600 mb-2">Drag & drop your file here, or</p>
          <input
            id="file-upload"
            type="file"
            className="hidden"
            onChange={handleFileChange}
            accept="image/jpeg,image/png,application/pdf"
          />
          <label htmlFor="file-upload" className="cursor-pointer">
            <Button variant="outline" type="button">
              Browse Files
            </Button>
          </label>
        </div>

        {selectedFile && (
          <div className="w-full p-4 border-t border-gray-200 bg-white flex items-center justify-between">
            <div className="flex items-center gap-3">
              {getFileIcon(selectedFile.type)}
              <div>
                <p className="text-sm font-medium text-gray-800">{selectedFile.name}</p>
                <p className="text-xs text-gray-500">{(selectedFile.size / 1024 / 1024).toFixed(2)} MB</p>
              </div>
            </div>
            <Button variant="ghost" size="icon" onClick={() => setSelectedFile(null)}>
              <XCircle className="h-5 w-5 text-gray-500" />
            </Button>
          </div>
        )}

        {uploadStatus === "uploading" && (
          <div className="w-full p-4 border-t border-gray-200">
            <Progress value={uploadProgress} className="w-full" />
            <p className="text-center text-sm text-gray-600 mt-2">{uploadProgress}% Uploaded</p>
          </div>
        )}

        {errorMessage && (
          <div className="w-full p-4 border-t border-gray-200 text-center text-red-600 text-sm">{errorMessage}</div>
        )}

        {uploadedUrl && uploadStatus === "success" && (
          <div className="w-full p-4 border-t border-gray-200 text-center text-green-600 text-sm">
            File uploaded successfully!{" "}
            <a href={uploadedUrl} target="_blank" rel="noopener noreferrer" className="underline">
              View File
            </a>
          </div>
        )}

        <div className="w-full p-4 border-t border-gray-200">
          <Button onClick={handleUpload} disabled={!selectedFile || uploadStatus === "uploading"} className="w-full">
            {uploadStatus === "uploading" ? "Uploading..." : "Upload File"}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
