"use server"

import { revalidatePath } from "next/cache"

export interface UserSettings {
  // Profile Settings
  firstName: string
  lastName: string
  email: string
  bio: string

  // Relationship Preferences
  defaultDifficulty: "easy" | "medium" | "hard"
  defaultQuestionCount: number
  defaultTimeLimit: number
  autoSubmitAnswers: boolean

  // Notification Settings
  emailNotifications: boolean
  pushNotifications: boolean
  weeklyDigest: boolean

  // Privacy Settings
  profileVisibility: "public" | "friends" | "private"
  shareProgress: boolean
  allowDataCollection: boolean
}

// Simulate database operations
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

export async function saveUserSettings(formData: FormData): Promise<{
  success: boolean
  message: string
  data?: UserSettings
}> {
  try {
    // Simulate network delay
    await delay(1000)

    // Extract and validate form data
    const settings: UserSettings = {
      firstName: formData.get("firstName") as string,
      lastName: formData.get("lastName") as string,
      email: formData.get("email") as string,
      bio: formData.get("bio") as string,
      defaultDifficulty: formData.get("defaultDifficulty") as "easy" | "medium" | "hard",
      defaultQuestionCount: Number.parseInt(formData.get("defaultQuestionCount") as string),
      defaultTimeLimit: Number.parseInt(formData.get("defaultTimeLimit") as string),
      autoSubmitAnswers: formData.get("autoSubmitAnswers") === "on",
      emailNotifications: formData.get("emailNotifications") === "on",
      pushNotifications: formData.get("pushNotifications") === "on",
      weeklyDigest: formData.get("weeklyDigest") === "on",
      profileVisibility: formData.get("profileVisibility") as "public" | "friends" | "private",
      shareProgress: formData.get("shareProgress") === "on",
      allowDataCollection: formData.get("allowDataCollection") === "on",
    }

    // Basic validation
    if (!settings.firstName || !settings.lastName || !settings.email) {
      return {
        success: false,
        message: "Please fill in all required fields (First Name, Last Name, Email)",
      }
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(settings.email)) {
      return {
        success: false,
        message: "Please enter a valid email address",
      }
    }

    // Simulate saving to database
    console.log("Saving user settings:", settings)

    // Revalidate the settings page to show updated data
    revalidatePath("/settings")

    return {
      success: true,
      message: "Settings saved successfully!",
      data: settings,
    }
  } catch (error) {
    console.error("Error saving settings:", error)
    return {
      success: false,
      message: "Failed to save settings. Please try again.",
    }
  }
}

export async function getUserSettings(): Promise<{
  success: boolean
  data?: UserSettings
  message?: string
}> {
  try {
    // Simulate network delay
    await delay(500)

    // Simulate fetching from database
    const mockSettings: UserSettings = {
      firstName: "John",
      lastName: "Doe",
      email: "john.doe@example.com",
      bio: "Passionate about building stronger relationships through better communication.",
      defaultDifficulty: "medium",
      defaultQuestionCount: 10,
      defaultTimeLimit: 60,
      autoSubmitAnswers: false,
      emailNotifications: true,
      pushNotifications: false,
      weeklyDigest: true,
      profileVisibility: "friends",
      shareProgress: true,
      allowDataCollection: false,
    }

    return {
      success: true,
      data: mockSettings,
    }
  } catch (error) {
    console.error("Error fetching settings:", error)
    return {
      success: false,
      message: "Failed to load settings",
    }
  }
}
