import { z } from "zod"

const envSchema = z.object({
  NODE_ENV: z.enum(["development", "production", "test"]).default("development"),
  NEXTAUTH_URL: z.string().url().optional(),
  NEXTAUTH_SECRET: z.string().min(1).optional(),
})

export function validateEnv() {
  try {
    const env = envSchema.parse(process.env)
    console.log("✅ Environment validation passed")
    return env
  } catch (error) {
    console.error("❌ Environment validation failed:", error)
    if (process.env.NODE_ENV === "production") {
      throw new Error("Invalid environment configuration")
    }
    return process.env
  }
}

export const env = validateEnv()
