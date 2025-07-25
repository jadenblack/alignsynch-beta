import { z } from "zod"

const envSchema = z.object({
  NODE_ENV: z.enum(["development", "production", "test"]).default("development"),
  NEXTAUTH_URL: z.string().url("NEXTAUTH_URL must be a valid URL").min(1, "NEXTAUTH_URL is required"),
  NEXTAUTH_SECRET: z.string().min(32, "NEXTAUTH_SECRET must be at least 32 characters"),
})

export type Env = z.infer<typeof envSchema>

export function validateEnv(): { success: boolean; message?: string; errors?: string[] } {
  const result = envSchema.safeParse(process.env)

  if (!result.success) {
    const errors = result.error.issues.map((issue) => `${issue.path.join(".")}: ${issue.message}`)
    console.error("❌ Invalid environment variables:", errors)
    return { success: false, message: `Environment validation failed: ${errors.join(", ")}`, errors }
  }
  console.log("✅ Environment variables validated successfully.")
  return { success: true, message: "Environment variables are valid." }
}
