import { z } from "zod"

const envSchema = z.object({
  NODE_ENV: z.enum(["development", "production", "test"]).default("development"),
  NEXTAUTH_URL: z.string().url().optional(), // Optional for local dev, required for Vercel deployments
  NEXTAUTH_SECRET: z.string().min(32), // Minimum length for a strong secret
})

export type Env = z.infer<typeof envSchema>

export function validateEnv(): { success: boolean; message?: string } {
  try {
    // Attempt to parse and validate environment variables
    const parsedEnv = envSchema.parse(process.env)

    // Check for NEXTAUTH_URL specifically in Vercel environments
    if (process.env.VERCEL_ENV && !parsedEnv.NEXTAUTH_URL) {
      console.warn(
        "Warning: NEXTAUTH_URL is not set in Vercel environment. This may cause issues with NextAuth.js callbacks.",
      )
    }

    console.log("✅ Environment variables validated successfully.")
    return { success: true, message: "Environment variables are valid." }
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      const issues = error.errors.map((err) => `${err.path.join(".")}: ${err.message}`)
      console.error("Environment variable validation failed:", issues)
      return { success: false, message: `Environment validation failed: ${issues.join(", ")}` }
    }
    console.error("An unexpected error occurred during environment validation:", error)
    return { success: false, message: "An unexpected error occurred during environment validation." }
  }
}
