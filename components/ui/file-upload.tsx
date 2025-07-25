"use client"

import { useState, useCallback } from "react"
import { useDropzone } from "react-dropzone"
import { Button } from "./button"
import { Progress } from "./progress"
import { Card, CardContent } from "./card"
import { UploadCloud, FileText, ImageIcon, XCircle } from "lucide-react"

export function FileUpload() {
  const [files, setFiles] = useState<File[]>([])
  const [uploadProgress, setUploadProgress] = useState<number>(0)
  const [isUploading, setIsUploading] = useState<boolean>(false)
  const [uploadError, setUploadError] = useState<string | null>(null)
  const [uploadedUrls, setUploadedUrls] = useState<string[]>([])

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFiles((prevFiles) => [...prevFiles, ...acceptedFiles])
    setUploadError(null)
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: true,
    accept: {
      "image/jpeg": [".jpeg", ".jpg"],
      "image/png": [".png"],
      "application/pdf": [".pdf"],
    },
    maxSize: 10 * 1024 * 1024, // 10MB
  })

  const handleUpload = async () => {
    if (files.length === 0) {
      setUploadError("Please select files to upload.")
      return
    }

    setIsUploading(true)
    setUploadProgress(0)
    setUploadError(null)
    const newUploadedUrls: string[] = []

    for (let i = 0; i < files.length; i++) {
      const file = files[i]
      const formData = new FormData()
      formData.append("file", file)

      try {
        const response = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        })

        if (!response.ok) {
          const errorData = await response.json()
          throw new Error(errorData.error || "Upload failed")
        }

        const data = await response.json()
        newUploadedUrls.push(data.url)
        setUploadProgress(Math.round(((i + 1) / files.length) * 100))
      } catch (error: any) {
        setUploadError(error.message)
        setIsUploading(false)
        return
      }
    }

    setUploadedUrls((prevUrls) => [...prevUrls, ...newUploadedUrls])
    setFiles([]) // Clear files after successful upload
    setIsUploading(false)
  }

  const removeFile = (index: number) => {
    setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index))
  }

  const getFileIcon = (fileType: string) => {
    if (fileType.startsWith("image/")) {
      return <ImageIcon className="h-6 w-6 text-gray-500 dark:text-gray-400" />
    } else if (fileType === "application/pdf") {
      return <FileText className="h-6 w-6 text-red-500 dark:text-red-400" />
    }
    return <FileText className="h-6 w-6 text-gray-500 dark:text-gray-400" />
  }

  return (
    <div className="space-y-4">
      <div
        {...getRootProps()}
        className={`flex flex-col items-center justify-center p-6 border-2 border-dashed rounded-lg cursor-pointer transition-colors ${
          isDragActive
            ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
            : "border-gray-300 bg-gray-50 hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
        }`}
      >
        <input {...getInputProps()} />
        <UploadCloud className="h-12 w-12 text-gray-400 dark:text-gray-500" />
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-300 text-center">
          {isDragActive ? "Drop the files here ..." : "Drag & drop files here, or click to select files"}
        </p>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Max 10MB per file. JPG, PNG, PDF only.</p>
      </div>

      {files.length > 0 && (
        <Card className="p-4">
          <CardContent className="p-0">
            <h3 className="text-lg font-semibold mb-2">Selected Files:</h3>
            <ul className="space-y-2">
              {files.map((file, index) => (
                <li
                  key={file.name + index}
                  className="flex items-center justify-between p-2 border rounded-md bg-gray-50 dark:bg-gray-700"
                >
                  <div className="flex items-center gap-2">
                    {getFileIcon(file.type)}
                    <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
                      {file.name} ({(file.size / 1024 / 1024).toFixed(2)} MB)
                    </span>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeFile(index)}
                    className="text-gray-500 hover:text-red-500 dark:text-gray-400 dark:hover:text-red-400"
                  >
                    <XCircle className="h-5 w-5" />
                  </Button>
                </li>
              ))}
            </ul>
            <Button onClick={handleUpload} disabled={isUploading || files.length === 0} className="mt-4 w-full">
              {isUploading ? `Uploading (${uploadProgress}%)` : "Upload Files"}
            </Button>
            {isUploading && <Progress value={uploadProgress} className="mt-2" />}
            {uploadError && <p className="text-red-500 text-sm mt-2">{uploadError}</p>}
          </CardContent>
        </Card>
      )}

      {uploadedUrls.length > 0 && (
        <Card className="p-4">
          <CardContent className="p-0">
            <h3 className="text-lg font-semibold mb-2">Uploaded Files:</h3>
            <ul className="space-y-2">
              {uploadedUrls.map((url, index) => (
                <li
                  key={url + index}
                  className="flex items-center justify-between p-2 border rounded-md bg-green-50 dark:bg-green-900/20"
                >
                  <a
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-medium text-green-700 hover:underline dark:text-green-300"
                  >
                    {url.split("/").pop()}
                  </a>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
