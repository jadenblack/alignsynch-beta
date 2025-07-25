import { uploadFileToBlob } from "@/lib/blob-storage"
import { NextResponse } from "next/server"

export async function POST(request: Request) {
  const { searchParams } = new URL(request.url)
  const filename = searchParams.get("filename")
  const contentType = searchParams.get("contentType")

  if (!filename || !contentType) {
    return NextResponse.json({ error: "Filename and Content-Type are required." }, { status: 400 })
  }

  try {
    const blob = await uploadFileToBlob(filename, request.body as ReadableStream, contentType)
    return NextResponse.json(blob)
  } catch (error) {
    console.error("Error uploading file:", error)
    return NextResponse.json({ error: "Failed to upload file." }, { status: 500 })
  }
}
