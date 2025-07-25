import { put, del, list } from "@vercel/blob"
import { customAlphabet } from "nanoid"

const nanoid = customAlphabet("abcdefghijklmnopqrstuvwxyz0123456789", 10)

export async function uploadFile(file: File, userId: string): Promise<{ url: string; pathname: string }> {
  if (!file) {
    throw new Error("No file provided for upload.")
  }

  const fileExtension = file.name.split(".").pop()
  const filename = `${userId}/${nanoid()}.${fileExtension}`

  try {
    const blob = await put(filename, file, {
      access: "public",
      addRandomSuffix: false, // We're adding our own nanoid suffix
    })
    return { url: blob.url, pathname: blob.pathname }
  } catch (error) {
    console.error("Error uploading file to Vercel Blob:", error)
    throw new Error("Failed to upload file to blob storage.")
  }
}

export async function deleteFile(pathname: string): Promise<void> {
  try {
    await del(pathname)
  } catch (error) {
    console.error("Error deleting file from Vercel Blob:", error)
    throw new Error("Failed to delete file from blob storage.")
  }
}

export async function listFiles(prefix?: string): Promise<any[]> {
  try {
    const { blobs } = await list({ prefix })
    return blobs
  } catch (error) {
    console.error("Error listing files from Vercel Blob:", error)
    throw new Error("Failed to list files from blob storage.")
  }
}

// Example of uploading a buffer (e.g., from image processing)
export async function uploadBuffer(
  buffer: Buffer,
  filename: string,
  contentType: string,
  userId: string,
): Promise<{ url: string; pathname: string }> {
  const fileExtension = filename.split(".").pop()
  const uniqueFilename = `${userId}/${nanoid()}.${fileExtension}`

  try {
    const blob = await put(uniqueFilename, buffer, {
      access: "public",
      addRandomSuffix: false,
      contentType: contentType,
    })
    return { url: blob.url, pathname: blob.pathname }
  } catch (error) {
    console.error("Error uploading buffer to Vercel Blob:", error)
    throw new Error("Failed to upload buffer to blob storage.")
  }
}
