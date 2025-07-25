import { z } from "zod"

const envSchema = z.object({
  NODE_ENV: z.enum(["development", "production", "test"]).default("development"),
  NEXTAUTH_URL: z.string().url("NEXTAUTH_URL must be a valid URL").min(1, "NEXTAUTH_URL is required"),
  NEXTAUTH_SECRET: z.string().min(1, "NEXTAUTH_SECRET is required"),
})

export type Env = z.infer<typeof envSchema>

export function validateEnv(): { success: boolean; errors?: string[] } {
  const result = envSchema.safeParse(process.env)

  if (!result.success) {
    const errors = result.error.issues.map((issue) => `${issue.path.join(".")}: ${issue.message}`)
    console.error("❌ Invalid environment variables:", errors)
    // In a production environment, you might want to throw an error to stop the build
    // For development, we can just log and continue, but it's good to be strict.
    if (process.env.NODE_ENV === "production") {
      throw new Error("Invalid environment variables. Please check your .env.local or Vercel settings.")
    }
    return { success: false, errors }
  }
  console.log("✅ Environment variables validated successfully.")
  return { success: true }
}

// Export the validated environment variables for type safety if needed
// export const env: Env = envSchema.parse(process.env);
