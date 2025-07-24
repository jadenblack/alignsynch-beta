import { z } from "zod"

const envSchema = z.object({
  NODE_ENV: z.enum(["development", "production", "test"]).default("development"),
  NEXTAUTH_URL: z.string().url().optional(),
  NEXTAUTH_SECRET: z.string().min(1).optional(),
})

export function validateEnv() {
  try {
    const env = envSchema.parse(process.env)
    return { success: true, data: env }
  } catch (error) {
    console.warn("Environment validation failed:", error)
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
      data: {
        NODE_ENV: process.env.NODE_ENV || "development",
        NEXTAUTH_URL: process.env.NEXTAUTH_URL || "",
        NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET || "",
      },
    }
  }
}
