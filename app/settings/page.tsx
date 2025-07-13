"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2, User, Heart, Bell, Shield, Save } from "lucide-react"
import { saveUserSettings, getUserSettings, type UserSettings } from "@/app/actions/settings"

export default function SettingsPage() {
  const [settings, setSettings] = useState<UserSettings | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null)

  // Load settings on component mount
  useEffect(() => {
    async function loadSettings() {
      try {
        const userSettings = await getUserSettings()
        setSettings(userSettings)
      } catch (error) {
        setMessage({ type: "error", text: "Failed to load settings" })
      } finally {
        setLoading(false)
      }
    }
    loadSettings()
  }, [])

  // Auto-dismiss messages after 5 seconds
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => setMessage(null), 5000)
      return () => clearTimeout(timer)
    }
  }, [message])

  const handleSubmit = async (formData: FormData) => {
    setSaving(true)
    try {
      const result = await saveUserSettings(formData)
      setMessage({
        type: result.success ? "success" : "error",
        text: result.message,
      })

      if (result.success && settings) {
        // Update local state with new values
        const updatedSettings = {
          ...settings,
          displayName: formData.get("displayName") as string,
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
        setSettings(updatedSettings)
      }
    } catch (error) {
      setMessage({ type: "error", text: "An unexpected error occurred" })
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="flex items-center gap-2">
            <Loader2 className="h-6 w-6 animate-spin text-primary" />
            <span className="text-lg">Loading settings...</span>
          </div>
        </div>
      </div>
    )
  }

  if (!settings) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Alert>
          <AlertDescription>Failed to load settings. Please refresh the page.</AlertDescription>
        </Alert>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Settings</h1>
        <p className="text-muted-foreground">Manage your account settings and preferences</p>
      </div>

      {message && (
        <Alert
          className={`mb-6 ${message.type === "success" ? "border-green-200 bg-green-50" : "border-red-200 bg-red-50"}`}
        >
          <AlertDescription className={message.type === "success" ? "text-green-800" : "text-red-800"}>
            {message.text}
          </AlertDescription>
        </Alert>
      )}

      <form action={handleSubmit}>
        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="profile" className="flex items-center gap-2">
              <User className="h-4 w-4" />
              Profile
            </TabsTrigger>
            <TabsTrigger value="relationship" className="flex items-center gap-2">
              <Heart className="h-4 w-4" />
              Relationship
            </TabsTrigger>
            <TabsTrigger value="notifications" className="flex items-center gap-2">
              <Bell className="h-4 w-4" />
              Notifications
            </TabsTrigger>
            <TabsTrigger value="privacy" className="flex items-center gap-2">
              <Shield className="h-4 w-4" />
              Privacy
            </TabsTrigger>
          </TabsList>

          <TabsContent value="profile">
            <Card>
              <CardHeader>
                <CardTitle>Profile Information</CardTitle>
                <CardDescription>Update your personal information and profile details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="displayName">Display Name *</Label>
                  <Input
                    id="displayName"
                    name="displayName"
                    defaultValue={settings.displayName}
                    placeholder="Enter your display name"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email Address *</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    defaultValue={settings.email}
                    placeholder="Enter your email address"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea
                    id="bio"
                    name="bio"
                    defaultValue={settings.bio}
                    placeholder="Tell us about yourself and your relationship goals..."
                    rows={4}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="relationship">
            <Card>
              <CardHeader>
                <CardTitle>Relationship Preferences</CardTitle>
                <CardDescription>Set your default relationship session settings and preferences</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="defaultDifficulty">Default Difficulty</Label>
                    <Select name="defaultDifficulty" defaultValue={settings.defaultDifficulty}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="easy">Easy</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="hard">Hard</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="defaultQuestionCount">Default Question Count</Label>
                    <Select name="defaultQuestionCount" defaultValue={settings.defaultQuestionCount.toString()}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="5">5 Questions</SelectItem>
                        <SelectItem value="10">10 Questions</SelectItem>
                        <SelectItem value="15">15 Questions</SelectItem>
                        <SelectItem value="20">20 Questions</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="defaultTimeLimit">Default Time Limit</Label>
                    <Select name="defaultTimeLimit" defaultValue={settings.defaultTimeLimit.toString()}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="30">30 seconds</SelectItem>
                        <SelectItem value="60">60 seconds</SelectItem>
                        <SelectItem value="90">90 seconds</SelectItem>
                        <SelectItem value="120">2 minutes</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="autoSubmitAnswers">Auto-submit Answers</Label>
                    <p className="text-sm text-muted-foreground">Automatically submit when time runs out</p>
                  </div>
                  <Switch id="autoSubmitAnswers" name="autoSubmitAnswers" defaultChecked={settings.autoSubmitAnswers} />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="notifications">
            <Card>
              <CardHeader>
                <CardTitle>Notification Settings</CardTitle>
                <CardDescription>Choose how you want to be notified about updates and activities</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="emailNotifications">Email Notifications</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive email updates about your relationship progress
                    </p>
                  </div>
                  <Switch
                    id="emailNotifications"
                    name="emailNotifications"
                    defaultChecked={settings.emailNotifications}
                  />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="pushNotifications">Push Notifications</Label>
                    <p className="text-sm text-muted-foreground">Get push notifications for session reminders</p>
                  </div>
                  <Switch id="pushNotifications" name="pushNotifications" defaultChecked={settings.pushNotifications} />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="weeklyDigest">Weekly Digest</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive a weekly summary of your relationship insights
                    </p>
                  </div>
                  <Switch id="weeklyDigest" name="weeklyDigest" defaultChecked={settings.weeklyDigest} />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="privacy">
            <Card>
              <CardHeader>
                <CardTitle>Privacy Settings</CardTitle>
                <CardDescription>Control your privacy and data sharing preferences</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="profileVisibility">Profile Visibility</Label>
                  <Select name="profileVisibility" defaultValue={settings.profileVisibility}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="public">Public - Anyone can see your profile</SelectItem>
                      <SelectItem value="friends">Friends - Only friends can see your profile</SelectItem>
                      <SelectItem value="private">Private - Only you can see your profile</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="shareProgress">Share Progress</Label>
                    <p className="text-sm text-muted-foreground">
                      Allow others to see your relationship progress and achievements
                    </p>
                  </div>
                  <Switch id="shareProgress" name="shareProgress" defaultChecked={settings.shareProgress} />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="allowDataCollection">Allow Data Collection</Label>
                    <p className="text-sm text-muted-foreground">
                      Help improve AlignSynch by sharing anonymous usage data
                    </p>
                  </div>
                  <Switch
                    id="allowDataCollection"
                    name="allowDataCollection"
                    defaultChecked={settings.allowDataCollection}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="flex justify-end pt-6">
          <Button type="submit" disabled={saving} className="gap-2">
            {saving ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="h-4 w-4" />
                Save Settings
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  )
}
