"use server"

import { revalidatePath } from "next/cache"

export interface UserSettings {
  id?: string
  name: string
  email: string
  relationshipPreferences: {
    defaultDifficulty: string
    defaultQuestionCount: number
    defaultTimeLimit: number
    autoSubmitAnswers: boolean
  }
  notifications: {
    email: boolean
    push: boolean
    weekly: boolean
  }
  privacy: {
    profileVisible: boolean
    shareProgress: boolean
  }
}

// Simulate database storage (replace with real database calls)
let userSettingsStore: UserSettings = {
  id: "1",
  name: "",
  email: "",
  relationshipPreferences: {
    defaultDifficulty: "Medium",
    defaultQuestionCount: 10,
    defaultTimeLimit: 60,
    autoSubmitAnswers: false,
  },
  notifications: {
    email: true,
    push: false,
    weekly: true,
  },
  privacy: {
    profileVisible: true,
    shareProgress: false,
  },
}

export async function saveUserSettings(formData: FormData) {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 1000))

  try {
    const name = formData.get("name") as string
    const email = formData.get("email") as string
    const defaultDifficulty = formData.get("defaultDifficulty") as string
    const defaultQuestionCount = Number.parseInt(formData.get("defaultQuestionCount") as string)
    const defaultTimeLimit = Number.parseInt(formData.get("defaultTimeLimit") as string)
    const autoSubmitAnswers = formData.get("autoSubmitAnswers") === "on"
    const emailNotifications = formData.get("emailNotifications") === "on"
    const pushNotifications = formData.get("pushNotifications") === "on"
    const weeklyNotifications = formData.get("weeklyNotifications") === "on"
    const profileVisible = formData.get("profileVisible") === "on"
    const shareProgress = formData.get("shareProgress") === "on"

    // Validation
    if (!name || !email) {
      return {
        success: false,
        message: "Name and email are required fields.",
      }
    }

    if (!email.includes("@")) {
      return {
        success: false,
        message: "Please enter a valid email address.",
      }
    }

    // Update the store (replace with database update)
    userSettingsStore = {
      ...userSettingsStore,
      name,
      email,
      relationshipPreferences: {
        defaultDifficulty,
        defaultQuestionCount,
        defaultTimeLimit,
        autoSubmitAnswers,
      },
      notifications: {
        email: emailNotifications,
        push: pushNotifications,
        weekly: weeklyNotifications,
      },
      privacy: {
        profileVisible,
        shareProgress,
      },
    }

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

export async function getUserSettings() {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 500))

  try {
    // Return the stored settings (replace with database query)
    return {
      success: true,
      data: userSettingsStore,
    }
  } catch (error) {
    console.error("Error fetching settings:", error)
    return {
      success: false,
      message: "Failed to load settings.",
      data: null,
    }
  }
}
