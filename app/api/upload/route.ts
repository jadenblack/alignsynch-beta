import { NextResponse } from "next/server"
import { uploadFileToBlob } from "@/lib/blob-storage"

export async function POST(request: Request) {
  try {
    const formData = await request.formData()
    const file = formData.get("file") as File

    if (!file) {
      return NextResponse.json({ error: "No file uploaded." }, { status: 400 })
    }

    if (file.size > 10 * 1024 * 1024) {
      // 10MB limit
      return NextResponse.json({ error: "File size exceeds 10MB limit." }, { status: 400 })
    }

    const allowedTypes = ["image/jpeg", "image/png", "application/pdf"]
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json({ error: "Invalid file type. Only JPG, PNG, and PDF are allowed." }, { status: 400 })
    }

    const filename = `${Date.now()}-${file.name}`
    const fileUrl = await uploadFileToBlob(filename, file)

    return NextResponse.json({ url: fileUrl, filename: file.name }, { status: 200 })
  } catch (error) {
    console.error("API Upload Error:", error)
    return NextResponse.json({ error: "Failed to upload file." }, { status: 500 })
  }
}
