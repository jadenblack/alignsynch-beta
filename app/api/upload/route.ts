import { NextResponse } from "next/server"
import { uploadFile } from "@/lib/blob-storage"
import { auth } from "@/lib/auth"

export async function POST(request: Request) {
  const session = await auth()

  if (!session || !session.user || !session.user.id) {
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
    const { url, pathname } = await uploadFile(file, session.user.id)
    return NextResponse.json({ url, pathname }, { status: 200 })
  } catch (error) {
    console.error("File upload failed:", error)
    return NextResponse.json({ error: "Failed to upload file", details: (error as Error).message }, { status: 500 })
  }
}
