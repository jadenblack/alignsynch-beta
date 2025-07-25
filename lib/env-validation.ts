import { z } from "zod"

const envSchema = z.object({
  NODE_ENV: z.enum(["development", "production", "test"]).default("development"),
  NEXTAUTH_URL: z.string().url("NEXTAUTH_URL must be a valid URL"),
  NEXTAUTH_SECRET: z.string().min(32, "NEXTAUTH_SECRET must be at least 32 characters long"),
  BLOB_READ_WRITE_TOKEN: z.string().min(1, "BLOB_READ_WRITE_TOKEN is required for Vercel Blob storage"),
})

export type Env = z.infer<typeof envSchema>

export const env = envSchema.parse(process.env)

// Call validation on server start (e.g., in a global server file or API route)
// For Next.js, this might be implicitly handled by how you access process.env
// but explicit validation can be useful.
if (typeof window === "undefined") {
  // Only run on the server side
  try {
    envSchema.parse(process.env)
    console.log("Environment variables validated successfully.")
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error("Environment variable validation failed:", error.errors)
      throw new Error(
        "Missing or invalid environment variables. Please check your .env.local file or Vercel project settings.",
      )
    }
    console.error("An unexpected error occurred during environment validation:", error)
    throw error
  }
}
