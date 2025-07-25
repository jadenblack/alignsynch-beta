import { z } from "zod"

const envSchema = z.object({
  NODE_ENV: z.enum(["development", "production", "test"]).default("development"),
  NEXTAUTH_URL: z.string().url("NEXTAUTH_URL must be a valid URL").min(1, "NEXTAUTH_URL is required"),
  NEXTAUTH_SECRET: z.string().min(32, "NEXTAUTH_SECRET must be at least 32 characters"),
  BLOB_READ_WRITE_TOKEN: z.string().min(1, "BLOB_READ_WRITE_TOKEN is required for Vercel Blob"),
})

export type Env = z.infer<typeof envSchema>

export function validateEnv() {
  try {
    envSchema.parse(process.env)
    console.log("Environment variables validated successfully.")
    return true
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error("Environment variable validation failed:", error.errors)
      throw new Error(
        "Missing or invalid environment variables. Please check your .env.local or Vercel project settings.",
      )
    }
    console.error("Unknown error during environment validation:", error)
    throw new Error("An unexpected error occurred during environment validation.")
  }
}
