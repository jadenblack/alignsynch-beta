"use server"

import { z } from "zod"

// Define the settings schema
const settingsSchema = z.object({
  // Profile settings
  displayName: z.string().min(1, "Display name is required"),
  email: z.string().email("Invalid email address"),
  bio: z.string().optional(),

  // Appearance settings
  theme: z.enum(["light", "dark", "system"]).default("light"),
  language: z.string().default("en"),

  // Notification settings
  emailNotifications: z.boolean().default(true),
  pushNotifications: z.boolean().default(false),
  weeklyDigest: z.boolean().default(true),

  // Privacy settings
  profileVisibility: z.enum(["public", "private", "friends"]).default("public"),
  dataSharing: z.boolean().default(false),

  // Relationship settings
  defaultDifficulty: z.enum(["easy", "medium", "hard"]).default("medium"),
  defaultQuestionCount: z.number().min(5).max(50).default(10),
  defaultTimeLimit: z.number().min(30).max(300).default(60),
  autoSubmitAnswers: z.boolean().default(false),
})

export type UserSettings = z.infer<typeof settingsSchema>

// Simulate database storage (replace with actual database calls)
let userSettingsStore: UserSettings = {
  displayName: "John Doe",
  email: "john@example.com",
  bio: "Passionate about building better relationships",
  theme: "light",
  language: "en",
  emailNotifications: true,
  pushNotifications: false,
  weeklyDigest: true,
  profileVisibility: "public",
  dataSharing: false,
  defaultDifficulty: "medium",
  defaultQuestionCount: 10,
  defaultTimeLimit: 60,
  autoSubmitAnswers: false,
}

export async function getUserSettings(): Promise<UserSettings> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500))

  return userSettingsStore
}

export async function saveUserSettings(formData: FormData) {
  try {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Extract form data
    const rawData = {
      displayName: formData.get("displayName"),
      email: formData.get("email"),
      bio: formData.get("bio"),
      theme: formData.get("theme"),
      language: formData.get("language"),
      emailNotifications: formData.get("emailNotifications") === "on",
      pushNotifications: formData.get("pushNotifications") === "on",
      weeklyDigest: formData.get("weeklyDigest") === "on",
      profileVisibility: formData.get("profileVisibility"),
      dataSharing: formData.get("dataSharing") === "on",
      defaultDifficulty: formData.get("defaultDifficulty"),
      defaultQuestionCount: Number.parseInt(formData.get("defaultQuestionCount") as string) || 10,
      defaultTimeLimit: Number.parseInt(formData.get("defaultTimeLimit") as string) || 60,
      autoSubmitAnswers: formData.get("autoSubmitAnswers") === "on",
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
