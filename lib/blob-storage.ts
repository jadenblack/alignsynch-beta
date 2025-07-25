import { put, del, list, head } from "@vercel/blob"
import { customAlphabet } from "nanoid"

const nanoid = customAlphabet("0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz", 7) // 7-character random string

export async function uploadFile(file: File, userId: string): Promise<{ url: string; pathname: string }> {
  const fileExtension = file.name.split(".").pop()
  const filename = `${userId}/${nanoid()}.${fileExtension}`

  const blob = await put(filename, file, {
    access: "public",
  })

  return { url: blob.url, pathname: blob.pathname }
}

export async function deleteFile(pathname: string): Promise<void> {
  await del(pathname)
}

export async function listFiles(prefix?: string): Promise<any[]> {
  const { blobs } = await list({ prefix })
  return blobs
}

export async function getFileMetadata(pathname: string): Promise<any | null> {
  try {
    const blob = await head(pathname)
    return blob
  } catch (error) {
    console.error("Error getting blob metadata:", error)
    return null
  }
}
