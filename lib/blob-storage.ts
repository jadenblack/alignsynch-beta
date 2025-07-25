import { put, del, list } from "@vercel/blob"
import { customAlphabet } from "nanoid"

const nanoid = customAlphabet("0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz", 10)

export async function uploadFile(
  filename: string,
  file: File | Buffer,
  options?: { access?: "public" | "private"; contentType?: string },
) {
  const { access = "public", contentType } = options || {}
  const fileExtension = filename.split(".").pop()
  const uniqueFilename = `${nanoid()}.${fileExtension}`

  const blob = await put(uniqueFilename, file, {
    access,
    contentType: contentType || (file instanceof File ? file.type : undefined),
  })
  return blob
}

export async function deleteFile(url: string) {
  await del(url)
}

export async function listFiles(prefix?: string) {
  const { blobs } = await list({ prefix })
  return blobs
}

export async function uploadBuffer(
  filename: string,
  buffer: Buffer,
  options?: { access?: "public" | "private"; contentType?: string },
) {
  const { access = "public", contentType = "application/octet-stream" } = options || {}
  const fileExtension = filename.split(".").pop()
  const uniqueFilename = `${nanoid()}.${fileExtension}`

  const blob = await put(uniqueFilename, buffer, {
    access,
    contentType,
  })
  return blob
}
