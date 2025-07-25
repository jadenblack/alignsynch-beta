import { put, del, list } from "@vercel/blob"

export async function uploadFileToBlob(file: File): Promise<{ url: string; pathname: string }> {
  const blob = await put(file.name, file, {
    access: "public",
  })
  return { url: blob.url, pathname: blob.pathname }
}

export async function deleteFileFromBlob(url: string): Promise<void> {
  await del(url)
}

export async function listFilesFromBlob(prefix?: string): Promise<any[]> {
  const { blobs } = await list({ prefix })
  return blobs
}

export async function uploadBufferToBlob(
  filename: string,
  buffer: Buffer,
  contentType: string,
): Promise<{ url: string; pathname: string }> {
  const blob = await put(filename, buffer, {
    access: "public",
    contentType: contentType,
  })
  return { url: blob.url, pathname: blob.pathname }
}
