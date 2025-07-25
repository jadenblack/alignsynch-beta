import { z } from "zod"

const envSchema = z.object({
  NODE_ENV: z.enum(["development", "production", "test"]).default("development"),
  NEXTAUTH_URL: z.string().url("NEXTAUTH_URL must be a valid URL").optional(),
  NEXTAUTH_SECRET: z.string().min(1, "NEXTAUTH_SECRET must be set").optional(),
})

export type Env = z.infer<typeof envSchema>

export function validateEnv() {
  try {
    const parsedEnv = envSchema.parse(process.env)
    return { success: true, data: parsedEnv }
  } catch (error) {
    if (error instanceof z.ZodError) {
      const missingVars = error.errors.map((err) => `${err.path.join(".")}: ${err.message}`).join("\n")
      console.error(`Environment validation failed:\n${missingVars}`)
      return { success: false, error: `Environment validation failed: ${missingVars}`, data: process.env as Env }
    }
    console.error("Unknown error during environment validation:", error)
    return { success: false, error: "Unknown error during environment validation", data: process.env as Env }
  }
}
