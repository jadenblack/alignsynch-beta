"use server"

import { revalidatePath } from "next/cache"

export interface UserSettings {
  // Profile Settings
  displayName: string
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

// Simulate database storage (replace with actual database calls)
let userSettingsStore: UserSettings = {
  displayName: "",
  email: "",
  bio: "",
  defaultDifficulty: "medium",
  defaultQuestionCount: 10,
  defaultTimeLimit: 60,
  autoSubmitAnswers: false,
  emailNotifications: true,
  pushNotifications: false,
  weeklyDigest: true,
  profileVisibility: "public",
  shareProgress: true,
  allowDataCollection: false,
}

export async function saveUserSettings(formData: FormData) {
  try {
    // Extract form data
    const displayName = formData.get("displayName") as string
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
    if (!displayName.trim()) {
      return { success: false, message: "Display name is required" }
    }

    if (!email.trim()) {
      return { success: false, message: "Email is required" }
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return { success: false, message: "Please enter a valid email address" }
    }

    // Simulate database save with delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Update the store (replace with actual database save)
    userSettingsStore = {
      displayName,
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

    // Revalidate the settings page
    revalidatePath("/settings")

    return { success: true, message: "Settings saved successfully!" }
  } catch (error) {
    console.error("Error saving settings:", error)
    return { success: false, message: "Failed to save settings. Please try again." }
  }
}

export async function getUserSettings(): Promise<UserSettings> {
  // Simulate database fetch with delay
  await new Promise((resolve) => setTimeout(resolve, 500))

  // Return the stored settings (replace with actual database fetch)
  return userSettingsStore
}
