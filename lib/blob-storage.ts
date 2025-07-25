import { put, del, list } from "@vercel/blob"

export async function uploadFileToBlob(filename: string, file: File): Promise<string> {
  try {
    const blob = await put(filename, file, {
      access: "public",
      addRandomSuffix: true,
    })
    return blob.url
  } catch (error) {
    console.error("Error uploading file to Vercel Blob:", error)
    throw new Error("Failed to upload file to blob storage.")
  }
}

export async function deleteFileFromBlob(url: string): Promise<void> {
  try {
    await del(url)
  } catch (error) {
    console.error("Error deleting file from Vercel Blob:", error)
    throw new Error("Failed to delete file from blob storage.")
  }
}

export async function listFilesInBlob(): Promise<any[]> {
  try {
    const { blobs } = await list()
    return blobs
  } catch (error) {
    console.error("Error listing files from Vercel Blob:", error)
    throw new Error("Failed to list files from blob storage.")
  }
}
