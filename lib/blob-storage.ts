import { put, del, list } from "@vercel/blob"
import { customAlphabet } from "nanoid"

const nanoid = customAlphabet("abcdefghijklmnopqrstuvwxyz0123456789", 10)

export async function uploadFileToBlob(filename: string, file: File | Buffer, contentType: string) {
  const fileExtension = filename.split(".").pop()
  const newFilename = `${nanoid()}.${fileExtension}`
  const blob = await put(newFilename, file, {
    access: "public",
    contentType,
  })
  return blob
}

export async function deleteFileFromBlob(url: string) {
  await del(url)
}

export async function listFilesFromBlob(prefix?: string) {
  const { blobs } = await list({ prefix })
  return blobs
}
