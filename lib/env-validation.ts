import { z } from "zod"

const envSchema = z.object({
  NODE_ENV: z.enum(["development", "production", "test"]).default("development"),
  NEXTAUTH_URL: z.string().url("NEXTAUTH_URL must be a valid URL"),
  NEXTAUTH_SECRET: z.string().min(32, "NEXTAUTH_SECRET must be at least 32 characters long"),
  BLOB_READ_WRITE_TOKEN: z.string().min(1, "BLOB_READ_WRITE_TOKEN is required for Vercel Blob storage"),
  // Add other environment variables here as needed
  // VERCEL_GIT_COMMIT_SHA: z.string().optional(),
  // VERCEL_GIT_COMMIT_REF: z.string().optional(),
  // VERCEL_GIT_COMMIT_TIMESTAMP: z.string().optional(),
  // VERCEL_BUILD_ID: z.string().optional(),
  // VERCEL_REGION: z.string().optional(),
  // VERCEL_ORG_ID: z.string().optional(),
  // VERCEL_PROJECT_ID: z.string().optional(),
  // VERCEL_DEPLOYMENT_ID: z.string().optional(),
})

// Validate environment variables
export function validateEnv() {
  try {
    const parsedEnv = envSchema.parse(process.env)
    return { success: true, data: parsedEnv }
  } catch (error: any) {
    console.error("Environment variable validation failed:", error.errors)
    return { success: false, errors: error.errors }
  }
}

// Export the inferred type for convenience
export type Env = z.infer<typeof envSchema>
