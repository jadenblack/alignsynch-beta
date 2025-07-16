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

export interface SettingsResponse {
  success: boolean
  message: string
  data?: UserSettings
}

// Simulate database storage (replace with real database calls)
let userSettingsStore: UserSettings = {
  firstName: "",
  lastName: "",
  email: "",
  bio: "",
  defaultDifficulty: "medium",
  defaultQuestionCount: 10,
  defaultTimeLimit: 60,
  autoSubmitAnswers: false,
  emailNotifications: true,
  pushNotifications: true,
  weeklyDigest: false,
  profileVisibility: "friends",
  shareProgress: true,
  allowDataCollection: true,
}

export async function saveUserSettings(formData: FormData): Promise<SettingsResponse> {
  try {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Extract form data
    const firstName = formData.get("firstName") as string
    const lastName = formData.get("lastName") as string
    const email = formData.get("email") as string
    const bio = formData.get("bio") as string
    const defaultDifficulty = formData.get("defaultDifficulty") as "easy" | "medium" | "hard"
    const defaultQuestionCount = Number.parseInt(formData.get("defaultQuestionCount") as string)
    const defaultTimeLimit = Number.parseInt(formData.get("defaultTimeLimit") as string)
    const autoSubmitAnswers = formData.get("autoSubmitAnswers") === "on"
    const emailNotifications = formData.get("emailNotifications") === "on"
    const pushNotifications = formData.get("pushNotifications") === "on"
    const weeklyDigest = formData.get("weeklyDigest") === "on"
    const profileVisibility = formData.get("profileVisibility") as "public" | "friends" | "private"
    const shareProgress = formData.get("shareProgress") === "on"
    const allowDataCollection = formData.get("allowDataCollection") === "on"

    // Validation
    if (!firstName || !lastName || !email) {
      return {
        success: false,
        message: "Please fill in all required fields (First Name, Last Name, Email)",
      }
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return {
        success: false,
        message: "Please enter a valid email address",
      }
    }

    // Update settings (in real app, this would be a database call)
    userSettingsStore = {
      firstName,
      lastName,
      email,
      bio,
      defaultDifficulty,
      defaultQuestionCount,
      defaultTimeLimit,
      autoSubmitAnswers,
      emailNotifications,
      pushNotifications,
      weeklyDigest,
      profileVisibility,
      shareProgress,
      allowDataCollection,
    }

    // Revalidate the settings page to show updated data
    revalidatePath("/settings")

    return {
      success: true,
      message: "Settings saved successfully!",
      data: userSettingsStore,
    }
  } catch (error) {
    console.error("Error saving settings:", error)
    return {
      success: false,
      message: "Failed to save settings. Please try again.",
    }
  }
}

export async function getUserSettings(): Promise<SettingsResponse> {
  try {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 500))

    return {
      success: true,
      message: "Settings loaded successfully",
      data: userSettingsStore,
    }
  } catch (error) {
    console.error("Error loading settings:", error)
    return {
      success: false,
      message: "Failed to load settings. Please try again.",
    }
  }
}
