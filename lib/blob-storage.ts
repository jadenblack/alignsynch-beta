import { put, del, list, head } from "@vercel/blob"
import { customAlphabet } from "nanoid"

const nanoid = customAlphabet("abcdefghijklmnopqrstuvwxyz0123456789", 10)

export interface BlobFile {
  url: string
  pathname: string
  size: number
  uploadedAt: Date
  contentType?: string
}

export class BlobStorageService {
  async uploadFile(file: File, pathname: string): Promise<BlobFile> {
    try {
      const fileExtension = pathname.split(".").pop()
      const newFilename = `${nanoid()}.${fileExtension}`
      const blob = await put(newFilename, file, {
        access: "public",
      })

      return {
        url: blob.url,
        pathname: blob.pathname,
        size: file.size,
        uploadedAt: new Date(),
        contentType: file.type,
      }
    } catch (error) {
      console.error("Failed to upload file:", error)
      throw new Error("File upload failed")
    }
  }

  async uploadBuffer(buffer: Buffer, pathname: string, contentType: string): Promise<BlobFile> {
    try {
      const blob = await put(pathname, buffer, {
        access: "public",
        contentType,
        addRandomSuffix: true,
      })

      return {
        url: blob.url,
        pathname: blob.pathname,
        size: buffer.length,
        uploadedAt: new Date(),
        contentType,
      }
    } catch (error) {
      console.error("Failed to upload buffer:", error)
      throw new Error("Buffer upload failed")
    }
  }

  async deleteFile(url: string): Promise<void> {
    try {
      await del(url)
    } catch (error) {
      console.error("Failed to delete file:", error)
      throw new Error("File deletion failed")
    }
  }

  async listFiles(prefix?: string): Promise<BlobFile[]> {
    try {
      const { blobs } = await list({ prefix })

      return blobs.map((blob) => ({
        url: blob.url,
        pathname: blob.pathname,
        size: blob.size,
        uploadedAt: blob.uploadedAt,
        contentType: blob.contentType,
      }))
    } catch (error) {
      console.error("Failed to list files:", error)
      throw new Error("File listing failed")
    }
  }

  async getFileInfo(url: string): Promise<BlobFile | null> {
    try {
      const info = await head(url)

      return {
        url: info.url,
        pathname: info.pathname,
        size: info.size,
        uploadedAt: info.uploadedAt,
        contentType: info.contentType,
      }
    } catch (error) {
      console.error("Failed to get file info:", error)
      return null
    }
  }
}

export const blobStorage = new BlobStorageService()
