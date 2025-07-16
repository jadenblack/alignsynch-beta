"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2, User, Bell, Shield, Heart } from "lucide-react"
import { saveUserSettings, getUserSettings, type UserSettings } from "@/app/actions/settings"

export default function SettingsPage() {
  const [settings, setSettings] = useState<UserSettings | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null)

  // Load settings on component mount
  useEffect(() => {
    async function loadSettings() {
      const result = await getUserSettings()
      if (result.success && result.data) {
        setSettings(result.data)
      }
      setLoading(false)
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
    const result = await saveUserSettings(formData)

    if (result.success) {
      setMessage({ type: "success", text: result.message })
      if (result.data) {
        setSettings(result.data)
      }
    } else {
      setMessage({ type: "error", text: result.message })
    }
    setSaving(false)
  }

  const handleInputChange = (field: string, value: any) => {
    if (!settings) return

    const fieldPath = field.split(".")
    const newSettings = { ...settings }

    if (fieldPath.length === 1) {
      ;(newSettings as any)[fieldPath[0]] = value
    } else if (fieldPath.length === 2) {
      ;(newSettings as any)[fieldPath[0]][fieldPath[1]] = value
    }

    setSettings(newSettings)
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center min-h-[400px]">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
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
        <h1 className="text-3xl font-bold text-foreground mb-2">Settings</h1>
        <p className="text-muted-foreground">Manage your account settings and preferences</p>
      </div>

      {message && (
        <Alert
          className={`mb-6 ${message.type === "success" ? "border-primary bg-primary/5" : "border-destructive bg-destructive/5"}`}
        >
          <AlertDescription className={message.type === "success" ? "text-primary" : "text-destructive"}>
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
            <TabsTrigger value="relationships" className="flex items-center gap-2">
              <Heart className="h-4 w-4" />
              Relationships
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
                <CardDescription>Update your personal information and account details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      name="name"
                      value={settings.name}
                      onChange={(e) => handleInputChange("name", e.target.value)}
                      placeholder="Enter your full name"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={settings.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      placeholder="Enter your email address"
                      required
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="relationships">
            <Card>
              <CardHeader>
                <CardTitle>Relationship Preferences</CardTitle>
                <CardDescription>Set your default relationship assessment settings and preferences</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="defaultDifficulty">Default Difficulty</Label>
                    <Select
                      name="defaultDifficulty"
                      value={settings.relationshipPreferences.defaultDifficulty}
                      onValueChange={(value) => handleInputChange("relationshipPreferences.defaultDifficulty", value)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Easy">Easy</SelectItem>
                        <SelectItem value="Medium">Medium</SelectItem>
                        <SelectItem value="Hard">Hard</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="defaultQuestionCount">Default Question Count</Label>
                    <Select
                      name="defaultQuestionCount"
                      value={settings.relationshipPreferences.defaultQuestionCount.toString()}
                      onValueChange={(value) =>
                        handleInputChange("relationshipPreferences.defaultQuestionCount", Number.parseInt(value))
                      }
                    >
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
                    <Select
                      name="defaultTimeLimit"
                      value={settings.relationshipPreferences.defaultTimeLimit.toString()}
                      onValueChange={(value) =>
                        handleInputChange("relationshipPreferences.defaultTimeLimit", Number.parseInt(value))
                      }
                    >
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
                  <Switch
                    id="autoSubmitAnswers"
                    name="autoSubmitAnswers"
                    checked={settings.relationshipPreferences.autoSubmitAnswers}
                    onCheckedChange={(checked) =>
                      handleInputChange("relationshipPreferences.autoSubmitAnswers", checked)
                    }
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="notifications">
            <Card>
              <CardHeader>
                <CardTitle>Notification Preferences</CardTitle>
                <CardDescription>Choose how you want to be notified about updates and activities</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="emailNotifications">Email Notifications</Label>
                    <p className="text-sm text-muted-foreground">Receive notifications via email</p>
                  </div>
                  <Switch
                    id="emailNotifications"
                    name="emailNotifications"
                    checked={settings.notifications.email}
                    onCheckedChange={(checked) => handleInputChange("notifications.email", checked)}
                  />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="pushNotifications">Push Notifications</Label>
                    <p className="text-sm text-muted-foreground">Receive push notifications in your browser</p>
                  </div>
                  <Switch
                    id="pushNotifications"
                    name="pushNotifications"
                    checked={settings.notifications.push}
                    onCheckedChange={(checked) => handleInputChange("notifications.push", checked)}
                  />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="weeklyNotifications">Weekly Summary</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive a weekly summary of your relationship progress
                    </p>
                  </div>
                  <Switch
                    id="weeklyNotifications"
                    name="weeklyNotifications"
                    checked={settings.notifications.weekly}
                    onCheckedChange={(checked) => handleInputChange("notifications.weekly", checked)}
                  />
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
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="profileVisible">Public Profile</Label>
                    <p className="text-sm text-muted-foreground">Make your profile visible to other users</p>
                  </div>
                  <Switch
                    id="profileVisible"
                    name="profileVisible"
                    checked={settings.privacy.profileVisible}
                    onCheckedChange={(checked) => handleInputChange("privacy.profileVisible", checked)}
                  />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="shareProgress">Share Progress</Label>
                    <p className="text-sm text-muted-foreground">
                      Allow others to see your relationship progress and achievements
                    </p>
                  </div>
                  <Switch
                    id="shareProgress"
                    name="shareProgress"
                    checked={settings.privacy.shareProgress}
                    onCheckedChange={(checked) => handleInputChange("privacy.shareProgress", checked)}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="flex justify-end pt-6">
          <Button type="submit" disabled={saving} className="min-w-[120px]">
            {saving ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              "Save Settings"
            )}
          </Button>
        </div>
      </form>
    </div>
  )
}
