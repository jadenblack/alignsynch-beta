import { put } from "@vercel/blob"
import { NextResponse } from "next/server"
import { auth } from "@/lib/auth"

export const config = {
  api: {
    bodyParser: false, // Disable Next.js's body parser for file uploads
  },
}

export async function POST(request: Request): Promise<NextResponse> {
  const session = await auth()

  if (!session || !session.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { searchParams } = new URL(request.url)
  const filename = searchParams.get("filename")

  if (!filename) {
    return NextResponse.json({ error: "Filename is required" }, { status: 400 })
  }

  try {
    const blob = await put(filename, request.body as ReadableStream, {
      access: "public",
      // You can add more options here, e.g., contentType, addRandomSuffix
      // contentType: request.headers.get('content-type') || undefined,
    })

    return NextResponse.json(blob)
  } catch (error) {
    console.error("Error uploading file:", error)
    return NextResponse.json({ error: "Failed to upload file" }, { status: 500 })
  }
}
