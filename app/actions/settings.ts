"use server"

import { z } from "zod"

// Define the settings schema for validation
const settingsSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email format"),
  notifications: z.boolean(),
  theme: z.enum(["light", "dark", "system"]),
  language: z.string(),
  timezone: z.string(),
  relationshipPreferences: z.object({
    defaultDifficulty: z.string(),
    defaultQuestionCount: z.string(),
    defaultTimeLimit: z.string(),
    autoSubmitAnswers: z.boolean(),
  }),
})

export type UserSettings = z.infer<typeof settingsSchema>

// Simulate database storage (replace with actual database calls)
let userSettingsStore: UserSettings = {
  name: "",
  email: "",
  notifications: true,
  theme: "light",
  language: "en",
  timezone: "UTC",
  relationshipPreferences: {
    defaultDifficulty: "medium",
    defaultQuestionCount: "10",
    defaultTimeLimit: "60",
    autoSubmitAnswers: false,
  },
}

export async function saveUserSettings(formData: FormData) {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 1000))

  try {
    const rawData = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      notifications: formData.get("notifications") === "on",
      theme: formData.get("theme") as string,
      language: formData.get("language") as string,
      timezone: formData.get("timezone") as string,
      relationshipPreferences: {
        defaultDifficulty: formData.get("defaultDifficulty") as string,
        defaultQuestionCount: formData.get("defaultQuestionCount") as string,
        defaultTimeLimit: formData.get("defaultTimeLimit") as string,
        autoSubmitAnswers: formData.get("autoSubmitAnswers") === "on",
      },
    }

    // Validate the data
    const validatedData = settingsSchema.parse(rawData)

    // Save to "database" (replace with actual database call)
    userSettingsStore = validatedData

    return {
      success: true,
      message: "Settings saved successfully!",
      data: validatedData,
    }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        success: false,
        message: "Validation failed",
        errors: error.errors,
      }
    }

    return {
      success: false,
      message: "Failed to save settings. Please try again.",
    }
  }
}

export async function getUserSettings(): Promise<UserSettings> {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 500))

  // Return from "database" (replace with actual database call)
  return userSettingsStore
}
