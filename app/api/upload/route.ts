import { uploadFile } from "@/lib/blob-storage"
import { NextResponse } from "next/server"
import { authOptions } from "@/lib/auth"
import { getServerSession } from "next-auth"

export async function POST(request: Request) {
  const session = await getServerSession(authOptions)

  if (!session || !session.user?.email) {
    return new NextResponse("Unauthorized", { status: 401 })
  }

  const formData = await request.formData()
  const file = formData.get("file") as File | null

  if (!file) {
    return new NextResponse("No file uploaded", { status: 400 })
  }

  // Basic file validation
  const MAX_FILE_SIZE = 10 * 1024 * 1024 // 10MB
  const ALLOWED_FILE_TYPES = ["image/jpeg", "image/png", "application/pdf"]

  if (file.size > MAX_FILE_SIZE) {
    return new NextResponse("File size exceeds 10MB limit", { status: 400 })
  }

  if (!ALLOWED_FILE_TYPES.includes(file.type)) {
    return new NextResponse("Invalid file type. Only JPG, PNG, and PDF are allowed.", { status: 400 })
  }

  try {
    const { url, pathname } = await uploadFile(file, session.user.email)
    return NextResponse.json({ url, pathname })
  } catch (error) {
    console.error("Error uploading file:", error)
    return new NextResponse("Failed to upload file", { status: 500 })
  }
}
