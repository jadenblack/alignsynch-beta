import { NextResponse } from "next/server"
import { uploadFile } from "@/lib/blob-storage"
import { auth } from "@/lib/auth"

export const config = {
  api: {
    bodyParser: false, // Disable Next.js body parser for file uploads
  },
}

export async function POST(request: Request) {
  const session = await auth()

  if (!session || !session.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const formData = await request.formData()
  const file = formData.get("file") as File | null

  if (!file) {
    return NextResponse.json({ error: "No file uploaded" }, { status: 400 })
  }

  // Basic file validation
  const MAX_FILE_SIZE = 10 * 1024 * 1024 // 10MB
  const ALLOWED_FILE_TYPES = ["image/jpeg", "image/png", "application/pdf"]

  if (file.size > MAX_FILE_SIZE) {
    return NextResponse.json({ error: "File size exceeds 10MB limit" }, { status: 413 })
  }

  if (!ALLOWED_FILE_TYPES.includes(file.type)) {
    return NextResponse.json({ error: "Unsupported file type" }, { status: 415 })
  }

  try {
    const uploadedBlob = await uploadFile(file.name, file, { access: "public" })
    return NextResponse.json({ success: true, url: uploadedBlob.url, pathname: uploadedBlob.pathname })
  } catch (error) {
    console.error("Error uploading file:", error)
    return NextResponse.json({ error: "Failed to upload file" }, { status: 500 })
  }
}
