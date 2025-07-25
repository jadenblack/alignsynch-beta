import { NextResponse } from "next/server"
import { uploadFile } from "@/lib/blob-storage"

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

    const allowedTypes = ["image/jpeg", "image/png", "image/gif", "application/pdf"]
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { error: "Invalid file type. Only images (JPEG, PNG, GIF) and PDFs are allowed." },
        { status: 400 },
      )
    }

    const { url, pathname } = await uploadFile(file.name, file)

    return NextResponse.json({ url, pathname }, { status: 200 })
  } catch (error) {
    console.error("Error uploading file:", error)
    return NextResponse.json({ error: "Failed to upload file." }, { status: 500 })
  }
}
